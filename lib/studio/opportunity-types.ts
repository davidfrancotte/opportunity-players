import type {Category} from './model';

const shared = ['Coaching','Recrutement','Partenariat','Sponsoring','Essais groupés'] as const;
export const professionalOfferTypes = [...shared,'Soins de santé','Arbitre','Juridique','Agent','Média'];
export const organisationOfferTypes = [...shared,'Sport études','Équipe','Université'];
export const allOfferTypes = [...new Set([...professionalOfferTypes,...organisationOfferTypes])];
export function offerTypesFor(category: Category): string[] {
  return category === 'Professionnel' ? professionalOfferTypes : category === 'Organisation' ? organisationOfferTypes : [];
}
