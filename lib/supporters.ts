/** Names, disciplines and original photographs from the current official site.
 * Retrieved 2026-09-18. No portraits have been generated or retouched.
 * Keep these original files: monochrome/color is a reversible CSS effect only.
 */
export const supportersSource =
  'https://www.opportunity-players.com/fr/accueil';
const imageOrigin =
  'https://www.opportunity-players.com/images/front/home/soutien/';

const sourceEntries = [
  ['Abou Guilmi', 'Futsal', 'GUILMI.jpg', 511, 680],
  ['Arthur Theate', 'Football', 'THEATE.png', 374, 460],
  ['Boris Paque', 'Pickleball', 'PAQUE.jpg', 444, 663],
  ['Charline Humblet', 'Volleyball', 'HUMBLET.png', 200, 200],
  ['Charlotte Englebert', 'Hockey sur gazon', 'ENGLEBERT.png', 200, 200],
  ['Jef Lettens', 'Handball', 'LETTENS.png', 200, 200],
  ['Jens Torfs', 'Rugby', 'TORFS.png', 411, 616],
  ['John john Dohmen', 'Hockey sur gazon', 'DOHMEN.jpg', 356, 534],
  ['Kevin Tumba', 'Basketball', 'TUMBA.png', 222, 300],
  ['Marjorie Carpréaux', 'Basketball', 'CARPREAUX.png', 200, 200],
  ['Nacer Chadli', 'Football', 'CHADLI.png', 230, 206],
  ['Noémie Gelders', 'Football', 'GELDERS.png', 224, 224],
  ['Romain Bruwier', 'Basketball', 'BRUWIER.png', 230, 230],
] as const;

export const supporters = sourceEntries.map(
  ([name, sport, file, width, height]) => {
    const filename = `OP_AMBASSADEURS_${file}`;
    return {
      name,
      sport,
      width,
      height,
      src: `/supporters/${filename}`,
      sourceUrl: `${imageOrigin}${filename}`,
    };
  },
);
