export const SHELTER_CATEGORIES = [
    'Perishable food',
    'Non-perishable food',
    'Hygiene products',
    'Clothing & footwear',
    'Bedding & linens',
    'First aid & medical supplies',
    'Cleaning & household supplies',
    'Beds available',
    'Seasonal gear',
    'Transportation & employment support'
  ] as const;
  
  export type ShelterCategory = (typeof SHELTER_CATEGORIES)[number];
  