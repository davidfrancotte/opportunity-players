import type { Category } from './model';
// Source: updated Opportunity_Players_Offres_Gratuit_Premium.xlsx, D2 on each sheet.
// Annual prices approved by the owner on 20 September 2026, paid in one installment.
// Tax status and renewal terms have not been specified.
export const monthlyPricesInCents: Record<Category, number> = {
  Sportif: 299,
  Professionnel: 999,
  Organisation: 1999,
};
export function monthlyPrice(category: Category) {
  return (
    (monthlyPricesInCents[category] / 100).toFixed(2).replace('.', ',') + ' €'
  );
}
export const annualPricesInCents: Record<Category, number> = {
  Sportif: 2999,
  Professionnel: 9999,
  Organisation: 19999,
};
export function annualPrice(category: Category) {
  return (annualPricesInCents[category] / 100).toFixed(2).replace('.', ',') + ' €';
}
export function annualSaving(category: Category) {
  return ((monthlyPricesInCents[category] * 12 - annualPricesInCents[category]) / 100)
    .toFixed(2).replace('.', ',') + ' €';
}
