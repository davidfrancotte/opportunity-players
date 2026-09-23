// Selective asset/style sync only: preserves all desktop-specific components.
import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
const root=path.resolve(import.meta.dirname,'..');
const app=path.resolve(root,'../opportunity-players-app/studio');
for(const file of ['op-open-square-dark.png','op-open-square-light.png','app-icon.png','favicon.svg','og.png'])
  await fs.copyFile(path.join(app,'public',file),path.join(root,'public',file));
await fs.copyFile(path.join(app,'lib/locales/network.ts'),path.join(root,'lib/studio/network-translations.ts'));
const css=await fs.readFile(path.join(app,'app/community.css'),'utf8');
const start=css.indexOf('.network-count-cards');
if(start<0)throw Error('Network styles missing');
const tree=postcss.parse(css.slice(start));
tree.walkRules(rule=>{rule.selectors=rule.selectors.map(s=>`body:has(.studio-surface) ${s}`);});
const light=postcss.parse(await fs.readFile(path.join(app,'app/light.css'),'utf8'));
const lightRules=[];light.walkRules(rule=>{if(/\.network-(count|contact|directory)/.test(rule.selector)){
  const copy=rule.clone();copy.selector=copy.selector.replaceAll('html[data-theme="light"]','body:has(.studio-surface[data-theme="light"])');lightRules.push(copy.toString().replaceAll('--app-','--studio-'));
}});
await fs.writeFile(path.join(root,'app/espace/studio-network.css'),`/* Selectively generated from the current mobile app. */\n${tree}\n${lightRules.join('\n')}`);
console.log('Synced approved open-square assets, network styles and translation rows.');
