export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface CategoryMeta {
  intro: string;
  meta: string;
}

export const categoryMeta: Record<string, CategoryMeta> = {
  'Local Guide': {
    intro:
      'Looking for the best dental clinic in Bhubaneswar? These local guides help you choose the right dentist near Bomikhal, Saheed Nagar, KIIT, Patia, and Rasulgarh — with directions, timings, reviews, and transparent pricing from YourDentist Laser Dental Clinic.',
    meta: 'Local guides to choosing a dental clinic in Bhubaneswar — directions, timings, reviews, and pricing from YourDentist Laser Dental Clinic, Bomikhal.',
  },
  'Root Canal': {
    intro:
      'Painless root canal treatment in Bhubaneswar explained by Dr. Arpita Dash. Learn about RCT costs, single-sitting laser root canals, recovery timelines, and what to expect at every step of your treatment.',
    meta: 'Root canal treatment in Bhubaneswar — costs, single-sitting laser RCT, recovery timelines, and expert answers from Dr. Arpita Dash.',
  },
  Orthodontics: {
    intro:
      'Braces and clear aligners in Bhubaneswar — costs, treatment timelines, and care tips. Dr. Arpita Dash explains metal braces, ceramic braces, and invisible aligners for children, teens, and adults.',
    meta: 'Braces and clear aligners in Bhubaneswar — costs, timelines, and care tips for children, teens, and adults from Dr. Arpita Dash.',
  },
  'Dental Implants': {
    intro:
      'Dental implants in Bhubaneswar — full price guide, procedure steps, recovery timelines, and long-term care. Replace missing teeth with permanent, natural-looking implants at YourDentist Laser Dental Clinic.',
    meta: 'Dental implants in Bhubaneswar — price guide, procedure steps, recovery, and long-term care from YourDentist Laser Dental Clinic.',
  },
  'Cosmetic Dentistry': {
    intro:
      'Smile designing, veneers, teeth whitening, and aesthetic dentistry in Bhubaneswar. See costs, procedures, and real results from YourDentist Laser Dental Clinic.',
    meta: 'Cosmetic dentistry in Bhubaneswar — smile designing, veneers, whitening costs, procedures, and results from YourDentist.',
  },
  'Laser Dentistry': {
    intro:
      'Advanced laser dentistry in Bhubaneswar — painless root canals, gum treatment, frenectomy, and teeth whitening with faster healing and less discomfort.',
    meta: 'Laser dentistry in Bhubaneswar — painless root canals, gum treatment, and whitening with faster healing at YourDentist.',
  },
  'Oral Hygiene': {
    intro:
      'Dentist-approved oral hygiene guides — brushing, flossing, mouthwash, and daily habits that prevent cavities and gum disease. Practical prevention tips from Dr. Arpita Dash.',
    meta: 'Oral hygiene guides from a Bhubaneswar dentist — brushing, flossing, mouthwash, and daily habits that prevent cavities and gum disease.',
  },
  'Paediatric Dentistry': {
    intro:
      "Children's dental care in Bhubaneswar — first visits, fluoride, sealants, braces timing, and cavity prevention. Gentle, child-friendly guidance for parents from Dr. Arpita Dash.",
    meta: "Children's dental care in Bhubaneswar — first visits, fluoride, sealants, and cavity prevention guidance for parents.",
  },
  'General Dental Health': {
    intro:
      'Everyday dental health explained — toothache causes, gum disease, sensitivity, wisdom teeth, and the mouth-body connection. Trusted answers from a Bhubaneswar dental surgeon.',
    meta: 'General dental health answers from a Bhubaneswar dental surgeon — toothache, gum disease, sensitivity, wisdom teeth, and more.',
  },
};
