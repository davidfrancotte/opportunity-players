// Reviewed app → web parity migration. Never modifies the mobile source.
// Web exceptions: shell, scoped theme, authentication editorial and two-pane messages.
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const source=path.resolve(root,'../opportunity-players-app/studio');
const check=process.argv.includes('--check');
if(!check&&!process.argv.includes('--apply'))throw new Error('Use --check for read-only parity verification. --apply is a reviewed migration: inspect source changes and preserve any new web adaptations first.');
const read=p=>fs.readFileSync(p,'utf8');
let count=0;
function write(file,code){
  const target=path.join(root,file);
  if(check)assert.equal(read(target),code,`App/web drift: ${file}`);
  else {fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,code);}
  count++;
}
const routes=['accueil','reseau','messages','opportunities','abonnement','inscription','verification','personnalisation','presentation','connexion','mot-de-passe-oublie','profil','parcours','medias','modifier-profil','parametres','jouer','organiser','match','agenda','notifications','outils','recherches','publications-programmees','talents','essais-groupes','equipes','calendrier-avance','statistiques','candidatures','recrutement','rendez-vous','dossier-sportif','disciplines','agent','documents','securite','parrainage','confidentialite','double-facteur','telecharger','invitation'];
function adapt(code){return code.replaceAll('@/lib/','@/lib/studio/').replaceAll('@/components/','@/components/studio/')
  .replaceAll('/images/','/studio-images/').replaceAll('\\/images\\/','\\/studio-images\\/')
  .replace(/(["'`])\/([^"'`\s]*)/g,(match,q,route)=>!route?`${q}/espace/connexion`:routes.includes(route.split(/[/?#]/)[0])?`${q}/espace/${route}`:match)
  .replaceAll('retour=/','retour=/espace/');}
function block(text,start,end){const a=text.indexOf(start),b=text.indexOf(end,a);assert.ok(a>=0&&b>a,start);return text.slice(a,b);}
function replace(text,from,to){assert.ok(text.includes(from),`Missing migration anchor: ${from.slice(0,100)}`);return text.replace(from,to);}
const auth=block(read(path.join(root,'components/studio/studio-ui.tsx')),'export function AuthLayout(','export function Guard(');
const components=['agenda-requests','agenda-screen','auth-screens','career-screens','connection-controls','demo-provider','directory-fields','event-navigation','extension-screens','growth-features','locale','media-upload','member-media','opportunity-publisher','play-screens','post-attachment','post-excerpt','profile-screens','social-screens','sport-portfolio','sport-profile-fields','studio-screen','studio-ui','subscription-screen','subscription-ui','trust-screens'];
for(const name of components){
  let code=adapt(read(path.join(source,`components/${name}.tsx`)));
  if(name==='studio-ui'){
    code=code.replace("from './brand-mark'","from '../brand-mark'");
    code=code.replace(block(code,'export function AuthLayout(','export function Guard('),auth);
  }
  if(name==='profile-screens')code=replace(code,'const pathname = usePathname().replace(/\\/$/, "") || "/espace/connexion";','const route = usePathname().replace(/\\/$/, "");\n  const pathname = route === "/espace" ? "/espace/accueil" : route;');
  if(name==='extension-screens')code=replace(code,'href={`/${route}`}','href={`/espace/${route}`}');
  if(name==='social-screens'){
    let messages=block(code,'export function MessagesPage()','export function OpportunitiesPage()');
    const original=messages;
    messages=replace(messages,'      {active && member ? (','      <div className={`web-messaging ${active && member ? "has-conversation" : ""}`}>\n      {active && member ? (');
    messages=replace(messages,'      ) : (\n        <>','      ) : (\n        <div className="web-chat-placeholder"><MessageCircle size={34}/><h2><T>Messages</T></h2><p><T>Choisissez un membre fictif pour ouvrir une conversation de démonstration.</T></p></div>\n      )}\n        <section className="web-conversations" aria-label={uiCopy("Messages")}>');
    messages=replace(messages,'        </>\n      )}\n      <Modal','        </section>\n      </div>\n      <Modal');
    messages=replace(messages,'key={c.memberId}','key={c.memberId}\n                    aria-pressed={social.activeChat === c.memberId}');
    code=code.replace(original,messages);
  }
  if(name==='growth-features'){
    code=code.replace(/^import .*from '@capacitor\/[^']+';\n/gm,'');
    const native=block(code,'      if(Capacitor.isNativePlatform()){','if(navigator.canShare');
    code=code.replace(native,'      ');
  }
  write(`components/studio/${name}.tsx`,code);
}
// Business models and offline dictionaries stay identical apart from web paths.
function copyTree(dir,out){for(const entry of fs.readdirSync(path.join(source,dir),{withFileTypes:true})){
  const input=`${dir}/${entry.name}`,output=`${out}/${entry.name}`;
  if(entry.isDirectory())copyTree(input,output);else write(output,adapt(read(path.join(source,input))));
}}
copyTree('lib','lib/studio');
for(const name of ['globals','mobile-app','social','subscription','events','trust','sport-profile','career','extensions','community','agenda','appearance']){
  const css=postcss.parse(read(path.join(source,`app/${name}.css`)));
  const scope='body:has(.studio-surface)';
  css.walkAtRules(rule=>{if(['import','theme','custom-variant'].includes(rule.name))rule.remove();});
  css.walkRules(rule=>{
    if(rule.parent.type==='atrule'&&rule.parent.name.includes('keyframes'))return;
    rule.selectors=rule.selectors.map(selector=>{
      if(selector===':root'||selector==='.dark')return scope;
      if(/^html(?=\W|$)/.test(selector))return selector.replace(/^html/,'html:has(.studio-surface)');
      if(/^body(?=\W|$)/.test(selector))return selector.replace(/^body/,scope);
      return `${scope} ${selector}`;
    });
  });
  write(`app/espace/studio-${name}.css`,`/* App rules scoped to the web workspace; desktop adaptations remain separate. */\n${css}`);
}
for(const entry of fs.readdirSync(path.join(source,'scripts')).filter(n=>n.endsWith('.test.mjs')&&n!=='appearance.test.mjs')){
  let code=adapt(read(path.join(source,'scripts',entry))).replaceAll('../lib/','../lib/studio/').replaceAll('../components/','../components/studio/');
  code=code.replaceAll("'components/","'components/studio/").replaceAll("'app/[screen]/page.tsx'","'app/espace/[section]/page.tsx'");
  write(`scripts/studio-${entry}`,code);
}
for(const [dir,out] of [['images','studio-images'],['videos','videos']]){
  for(const name of fs.readdirSync(path.join(source,'public',dir))){
    const input=path.join(source,'public',dir,name),output=path.join(root,'public',out,name);
    if(!fs.statSync(input).isFile())continue;
    if(check)assert.deepEqual(fs.readFileSync(output),fs.readFileSync(input),output);
    else {fs.mkdirSync(path.dirname(output),{recursive:true});fs.copyFileSync(input,output);}
  }
}
console.log(`${check?'Verified':'Aligned'} ${count} shared files; desktop exceptions retained.`);
