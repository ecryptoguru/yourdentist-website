export const clinicInfo = {
  name: "YourDentist Laser Dental Clinic",
  tagline: "Your Smile, Our Passion",
  description: "Advanced laser dental care in Bhubaneswar",
  address:
    "Plot 190/2972, E Canal Rd, beside SHIBANI ENCLAVE, Bomikhal, Bhubaneswar, Odisha",
  mapUrl: "https://maps.app.goo.gl/V4AjCU2EzFhuXABy6",
  phone: "+91 7064719630",
  phoneLink: "tel:+917064719630",
  whatsapp:
    "https://wa.me/917064719630?text=Hi,%20I%20would%20like%20to%20book%20an%20appointment.",
  email: "yourdentist.clinic@gmail.com",
  hours: {
    tuesdayToSunday: {
      morning: "10:00 AM - 1:30 PM",
      evening: "5:00 PM - 8:30 PM",
    },
    monday: "Closed",
  },
  copyright: "Crustsoft Solutions Pvt Ltd",
};

export const doctor = {
  name: "Dr. Arpita Dash",
  title: "Dental Surgeon & Smile Specialist",
  experience: "10+",
  patients: "5000+",
  procedures: "10000+",
  image: "/images/gallery/Image-1.jpeg",
  bio: [
    "With over a decade of expertise in dentistry, I am committed to providing exceptional care and crafting confident, healthy smiles. Specialising in Root Canal Treatment, Orthodontic Treatment with Braces and Aligners, advanced restorative procedures, Crowns Bridges and Fixed prosthesis, Aesthetic Dentistry, including Smile Designing etc, I blend cutting-edge techniques with a personalised approach to meet each patient's unique needs.",
    "Whether it's restoring damaged teeth, or straightening your smile, we take pride in delivering results that enhance both function and aesthetics. My philosophy revolves around creating a comfortable environment where oral health thrives and patients leave with renewed confidence in their smiles.",
  ],
  philosophy:
    "Creating a comfortable environment where oral health thrives and patients leave with renewed confidence in their smiles.",
  specializations: [
    "Root Canal Treatment",
    "Orthodontic Treatment (Braces & Aligners)",
    "Crowns, Bridges & Fixed Prosthesis",
    "Aesthetic Dentistry",
    "Smile Designing",
  ],
};

export const services = [
  {
    id: 1,
    slug: "root-canal-treatment",
    priceRange: "₹3,000 – ₹8,000",
    title: "Root Canal Treatment",
    shortDescription:
      "Painless RCT with advanced techniques and modern equipment.",
    fullDescription:
      "Our Root Canal Treatment uses the latest technology to ensure a painless experience. We carefully remove infected pulp, clean the canal, and seal it to prevent further infection. With our advanced laser-assisted techniques, the procedure is faster and more comfortable than ever.",
    benefits: [
      "Painless procedure with modern anesthesia",
      "Saves your natural tooth",
      "Prevents spread of infection",
      "Quick recovery time",
    ],
    process: [
      "Examination and X-ray assessment",
      "Local anesthesia administration",
      "Removal of infected pulp",
      "Canal cleaning and shaping",
      "Filling and sealing the canal",
      "Crown placement (if needed)",
    ],
    icon: "Heart",
  },
  {
    id: 2,
    slug: "orthodontic-treatment",
    priceRange: "₹25,000 – ₹1,50,000",
    title: "Orthodontic Treatment",
    shortDescription:
      "Braces & clear aligners for all ages to achieve perfect alignment.",
    fullDescription:
      "We offer comprehensive orthodontic solutions including traditional braces and modern clear aligners. Our treatments are suitable for children, teenagers, and adults. We create personalised treatment plans to achieve optimal teeth alignment and a beautiful smile.",
    benefits: [
      "Corrects misaligned teeth and jaws",
      "Improves oral function",
      "Enhances smile aesthetics",
      "Prevents long-term dental issues",
    ],
    process: [
      "Initial consultation and assessment",
      "Digital scan and treatment planning",
      "Braces or aligner fitting",
      "Regular adjustment appointments",
      "Progress monitoring",
      "Retainer fitting after completion",
    ],
    icon: "AlignCenterHorizontal",
  },
  {
    id: 3,
    slug: "crown-and-bridge",
    priceRange: "₹5,000 – ₹15,000",
    title: "Crown and Bridge",
    shortDescription:
      "Fixed prosthesis solutions for missing or damaged teeth.",
    fullDescription:
      "Our crown and bridge services restore damaged teeth and replace missing ones with durable, natural-looking prosthetics. We use high-quality materials like ceramic and zirconia for long-lasting results that blend seamlessly with your natural teeth.",
    benefits: [
      "Restores chewing function",
      "Natural appearance",
      "Long-lasting durability",
      "Prevents teeth shifting",
    ],
    process: [
      "Tooth preparation and impression",
      "Temporary crown placement",
      "Custom crown fabrication",
      "Final fitting and adjustment",
      "Permanent cementation",
    ],
    icon: "CircleDot",
  },
  {
    id: 4,
    slug: "complete-removable-dentures",
    priceRange: "₹10,000 – ₹40,000",
    title: "Complete & Removable Dentures",
    shortDescription:
      "Full and partial denture solutions tailored to your needs.",
    fullDescription:
      "We provide custom-made full and partial dentures that restore your smile and chewing ability. Our dentures are designed for comfort and a natural look, using advanced materials that mimic the appearance of real gums and teeth.",
    benefits: [
      "Restores full smile appearance",
      "Improves speech and chewing",
      "Custom-fit for comfort",
      "Affordable tooth replacement option",
    ],
    process: [
      "Initial consultation and assessment",
      "Impression and measurements",
      "Wax model try-in",
      "Final denture fitting",
      "Adjustment and care instructions",
    ],
    icon: "Smile",
  },
  {
    id: 5,
    slug: "oral-prophylaxis",
    priceRange: "₹800 – ₹2,000",
    title: "Oral Prophylaxis",
    shortDescription:
      "Professional teeth cleaning to maintain optimal oral health.",
    fullDescription:
      "Regular professional cleaning is essential for maintaining healthy teeth and gums. Our oral prophylaxis service removes plaque, tartar, and stains that regular brushing cannot eliminate, helping prevent gum disease and cavities.",
    benefits: [
      "Removes plaque and tartar buildup",
      "Prevents gum disease",
      "Freshens breath",
      "Early detection of dental issues",
    ],
    process: [
      "Oral examination",
      "Plaque and tartar removal (scaling)",
      "Teeth polishing",
      "Fluoride treatment (if needed)",
      "Oral hygiene instructions",
    ],
    icon: "Sparkles",
  },
  {
    id: 6,
    slug: "teeth-whitening",
    priceRange: "₹5,000 – ₹12,000",
    title: "Teeth Whitening",
    shortDescription:
      "Professional bleaching treatments for a brighter, whiter smile.",
    fullDescription:
      "Achieve a dazzling smile with our professional teeth whitening treatments. We use safe, effective whitening agents that can lighten your teeth by several shades in a single session, giving you immediate, noticeable results.",
    benefits: [
      "Dramatically whiter teeth",
      "Quick results",
      "Safe and controlled procedure",
      "Long-lasting with proper care",
    ],
    process: [
      "Shade assessment",
      "Gum protection application",
      "Whitening gel application",
      "Laser/light activation",
      "Rinse and final assessment",
    ],
    icon: "Sun",
  },
  {
    id: 7,
    slug: "dental-restoration",
    priceRange: "₹1,000 – ₹5,000",
    title: "Dental Restoration",
    shortDescription: "Fillings, inlays, and onlays to repair damaged teeth.",
    fullDescription:
      "We restore damaged teeth using tooth-colored fillings, inlays, and onlays. Our restorations are both functional and aesthetic, ensuring your teeth look natural while being fully protected from further damage.",
    benefits: [
      "Restores tooth function",
      "Natural tooth-colored materials",
      "Prevents further decay",
      "Durable and long-lasting",
    ],
    process: [
      "Cavity removal",
      "Tooth preparation",
      "Filling material placement",
      "Shaping and polishing",
      "Bite adjustment",
    ],
    icon: "Hammer",
  },
  {
    id: 8,
    slug: "aesthetic-dentistry",
    priceRange: "₹10,000 – ₹50,000",
    title: "Aesthetic Dentistry",
    shortDescription:
      "Smile makeover and cosmetic procedures for your dream smile.",
    fullDescription:
      "Transform your smile with our comprehensive aesthetic dentistry services. From veneers to smile designing, we combine art and science to create the perfect smile that complements your facial features and personality.",
    benefits: [
      "Complete smile transformation",
      "Boosts self-confidence",
      "Customised treatment plan",
      "Minimally invasive options available",
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure execution",
      "Final adjustments and polishing",
    ],
    icon: "Palette",
  },
  {
    id: 9,
    slug: "teeth-extraction",
    title: "Teeth Extraction",
    shortDescription: "Safe and painless tooth removal when necessary.",
    fullDescription:
      "When a tooth cannot be saved, we perform extractions with the utmost care and precision. Using modern anesthesia and gentle techniques, we ensure the procedure is as comfortable as possible with minimal recovery time.",
    benefits: [
      "Removes problematic teeth safely",
      "Prevents infection spread",
      "Painless procedure",
      "Quick healing with proper care",
    ],
    process: [
      "Examination and X-ray",
      "Anesthesia administration",
      "Gentle tooth removal",
      "Socket cleaning and suturing (if needed)",
      "Post-care instructions",
    ],
    icon: "Scissors",
  },
  {
    id: 10,
    slug: "laser-dentistry",
    priceRange: "₹2,000 – ₹10,000",
    title: "Laser Dentistry",
    shortDescription:
      "Advanced laser-assisted procedures for precision and comfort.",
    fullDescription:
      "Experience the future of dental care with our laser dentistry services. Lasers allow for more precise, less invasive procedures with reduced bleeding, swelling, and discomfort compared to traditional methods.",
    benefits: [
      "Minimally invasive",
      "Reduced bleeding and swelling",
      "Faster healing time",
      "More precise treatment",
    ],
    process: [
      "Treatment area assessment",
      "Laser parameter setting",
      "Laser procedure execution",
      "Post-treatment care",
    ],
    icon: "Zap",
  },
  {
    id: 11,
    slug: "dental-implants",
    priceRange: "₹25,000 – ₹50,000",
    title: "Dental Implants",
    shortDescription: "Permanent tooth replacement with natural look and feel.",
    fullDescription:
      "Dental implants are the gold standard for tooth replacement. Our implant procedures provide a permanent solution that looks, feels, and functions just like natural teeth, restoring your confidence and quality of life.",
    benefits: [
      "Permanent tooth replacement",
      "Prevents bone loss",
      "Natural look and feel",
      "No impact on adjacent teeth",
    ],
    process: [
      "Comprehensive assessment",
      "Implant placement surgery",
      "Healing period (osseointegration)",
      "Abutment placement",
      "Crown attachment",
    ],
    icon: "Anchor",
  },
  {
    id: 12,
    slug: "paediatric-dentistry",
    title: "Paediatric Dentistry",
    shortDescription:
      "Child-friendly dental care in a comfortable environment.",
    fullDescription:
      "We provide specialised dental care for children in a friendly, stress-free environment. Our team is trained to handle young patients with patience and care, making dental visits a positive experience for kids.",
    benefits: [
      "Child-friendly environment",
      "Early detection of dental issues",
      "Preventive care education",
      "Positive dental experience",
    ],
    process: [
      "Gentle examination",
      "Cleaning and fluoride application",
      "Cavity detection and treatment",
      "Oral hygiene education",
      "Follow-up scheduling",
    ],
    icon: "Baby",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Bikash Bhuyan",
    initials: "BB",
    photo: "/images/user-1.jpeg",
    rating: 5,
    text: "The best dental clinic in town.. I had a RCT done here and I am glad it went on so effortlessly. The best part is I had undergone this w/o any pain & off course w/o any fear of those fiery instruments.. Thanks Dr.Arpita. Moreover she is very well behaved and friendly doctor unlike other rude ones. So if you are suffering from any dental problem visit this clinic without a second thought..Very much satisfied!!",
  },
  {
    id: 2,
    name: "Pandu D",
    initials: "PD",
    photo: "/images/user-2.jpeg",
    rating: 5,
    text: "Dr.Arpita is an excellent dentist and a thorough professional, she is very cordial and explains things carefully. Am very happy with the care and patience shown with my dental check up, filling and root canal. she took the time to thoroughly explain the procedure and answer all of questions, which made me feel confident in the root canal treatment..she does her job perfectly without any pain for us.",
  },
  {
    id: 3,
    name: "Amarendra Pattnaik",
    initials: "AP",
    photo: "/images/user-3.jpeg",
    rating: 5,
    text: "I recently completed my braces orthodontic treatment with Dr. Arpita Dash, and I couldn't be more pleased with the results. Over the last 1.5 years, Dr. Dash has shown exceptional skill, professionalism, and care, making my journey to a better smile a truly pleasant one. She took the time to explain each step, easing any concerns I had and ensuring I felt confident in the process.",
  },
  {
    id: 4,
    name: "Arun Mohapatra",
    initials: "AM",
    photo: "/images/user-4.jpeg",
    rating: 5,
    text: "Entire Dental Treatment was excellent. Completely painless. Root canal Treatment and Crown was painless. Dr Arpita Dash explained the entire procedures very nicely and the Treatment was done painlessly. Thank you.",
  },
  {
    id: 5,
    name: "Sourav Hans",
    initials: "SH",
    photo: "/images/user-5.jpeg",
    rating: 5,
    text: "The best dental clinic in town..! You will get the right treatment here at a reasonable price..I had a RCT done here and i was glad it went on so effortlessly. Dr.Arpita dash will assist you throughout your treatment and i must tell you she is the most experienced doctor i have ever met..she will tell you the exact treatment that you would be needing..Moreover she is very well behaved and would not let you down..",
  },
  {
    id: 6,
    name: "Abhisek Sahoo",
    initials: "AS",
    photo: null,
    rating: 5,
    text: "This is not the first time, but I have had root canals done twice at Your Dentist and both the time it was made as smooth as possible. Initially I was scared but Dr Arpita's assurance and finesse at work helped me power through. She talked me through the entire procedure and made sure I am comfortable. I do not have any complains after the treatment as well.",
  },
];

export const galleryImages = [
  { id: 2, src: "/images/gallery/Image-2.jpeg", alt: "Treatment Room" },
  { id: 3, src: "/images/gallery/Image-3.jpeg", alt: "Dental Equipment" },
  { id: 4, src: "/images/gallery/Image-5.jpeg", alt: "Sterilization Area" },
  { id: 5, src: "/images/gallery/Image-6.jpeg", alt: "Patient Care" },
  { id: 6, src: "/images/gallery/Image-7.jpeg", alt: "Consultation Room" },
  { id: 7, src: "/images/gallery/Image-8.jpeg", alt: "Advanced Technology" },
  { id: 8, src: "/images/gallery/Image-9.jpeg", alt: "Smile Results" },
  { id: 9, src: "/images/gallery/Image-10.jpeg", alt: "Clinic Interior" },
  { id: 10, src: "/images/gallery/Image-11.jpeg", alt: "Waiting Area" },
  { id: 11, src: "/images/gallery/Image-12.jpeg", alt: "Dental Chair" },
  { id: 12, src: "/images/gallery/image-13.jpg", alt: "Office View" },
  { id: 13, src: "/images/gallery/image-14.jpg", alt: "Equipment Detail" },
  { id: 14, src: "/images/gallery/1.jpg", alt: "Clinic Overview" },
];

export const blogPosts = [
  {
    slug: "root-canal-myths",
    title: "Understanding Root Canal Treatment: Myths vs Facts",
    excerpt:
      "Many people fear root canal treatment due to common misconceptions. Let's separate fact from fiction and understand why modern RCT is virtually painless.",
    category: "Treatments",
    date: "2025-04-15",
    readTime: "5 min read",
    content: `Root canal treatment (RCT) is one of the most misunderstood dental procedures. Despite advances in dental technology that have made it virtually painless, many patients still delay treatment due to fear and misconceptions.

## Myth 1: Root Canal Treatment is Painful

**Fact:** Modern root canal treatment is no more uncomfortable than getting a routine filling. With advanced anesthesia techniques and precise instruments, most patients report minimal discomfort during the procedure.

## Myth 2: It's Better to Extract the Tooth

**Fact:** Saving your natural tooth is almost always the best option. Natural teeth allow for more efficient chewing, maintain the natural appearance of your smile, and protect other teeth from excessive wear.

## Myth 3: RCT Requires Multiple Visits

**Fact:** With modern technology, many root canal treatments can be completed in just one or two visits, depending on the complexity of the case.

## When Do You Need RCT?

- Severe toothache when chewing
- Prolonged sensitivity to hot or cold
- Discoloration of the tooth
- Swelling and tenderness in nearby gums

If you experience any of these symptoms, consult your dentist immediately. Early treatment can save your tooth and prevent further complications.`,
  },
  {
    slug: "signs-see-dentist",
    title: "5 Signs You Need to See a Dentist Immediately",
    excerpt:
      "Ignoring dental problems can lead to serious complications. Here are five warning signs that indicate you should schedule a dental appointment right away.",
    category: "Dental Health",
    date: "2025-04-10",
    readTime: "4 min read",
    content: `Your oral health is closely connected to your overall well-being. While regular check-ups are important, certain symptoms require immediate attention.

## 1. Persistent Toothache

A toothache that lasts more than a day or two is never normal. It could indicate decay, infection, or an abscess that needs prompt treatment.

## 2. Bleeding Gums

If your gums bleed when you brush or floss, it could be an early sign of gum disease. Don't ignore it - early intervention can prevent progression.

## 3. Sensitivity to Temperature

Sudden sensitivity to hot or cold foods might indicate enamel erosion, decay, or a cracked tooth.

## 4. Jaw Pain or Clicking

Jaw pain, clicking, or difficulty opening your mouth could indicate TMJ disorder or teeth grinding.

## 5. Bad Breath That Won't Go Away

Persistent bad breath despite good oral hygiene could signal gum disease, infection, or other health issues.

Don't wait until the pain becomes unbearable. Early detection and treatment are key to maintaining a healthy smile.`,
  },
  {
    slug: "braces-vs-aligners",
    title: "Braces vs Aligners: Which is Right for You?",
    excerpt:
      "Choosing between traditional braces and clear aligners can be confusing. We break down the pros and cons of each to help you make an informed decision.",
    category: "Treatments",
    date: "2025-04-05",
    readTime: "6 min read",
    content: `Orthodontic treatment has evolved significantly, offering patients more options than ever before. Understanding the differences between braces and aligners can help you choose the best solution for your needs.

## Traditional Braces

**Pros:**
- Effective for complex cases
- No risk of misplacing them
- Generally more affordable

**Cons:**
- Visible appearance
- Dietary restrictions
- Requires more maintenance

## Clear Aligners

**Pros:**
- Virtually invisible
- Removable for eating and cleaning
- More comfortable

**Cons:**
- Requires discipline to wear 20-22 hours/day
- May not suit complex cases
- Higher cost

## Making Your Decision

The best choice depends on your specific dental needs, lifestyle, and budget. Consult with your orthodontist to determine which option will give you the best results.`,
  },
  {
    slug: "oral-hygiene-home",
    title: "How to Maintain Oral Hygiene at Home",
    excerpt:
      "Professional cleanings are essential, but daily care at home is equally important. Follow these expert tips to keep your teeth and gums healthy between visits.",
    category: "Dental Health",
    date: "2025-03-28",
    readTime: "4 min read",
    content: `Maintaining good oral hygiene at home is the foundation of dental health. With the right techniques and habits, you can prevent most dental problems.

## Brushing Technique

- Brush twice daily for two minutes
- Use a soft-bristled brush
- Hold at a 45-degree angle to your gums
- Use gentle circular motions
- Don't forget your tongue!

## Flossing is Essential

Flossing removes plaque and food particles from between teeth where your brush can't reach. Do it at least once a day.

## Mouthwash Benefits

An antimicrobial mouthwash can help reduce bacteria and freshen breath. Choose one with fluoride for extra protection.

## Diet Matters

Limit sugary and acidic foods. Drink plenty of water and eat crunchy fruits and vegetables that naturally clean teeth.

## Replace Your Brush

Change your toothbrush every 3-4 months or when bristles fray.`,
  },
  {
    slug: "benefits-laser-dentistry",
    title: "The Benefits of Laser Dentistry",
    excerpt:
      "Laser technology is revolutionizing dental care. Discover how laser dentistry offers more precise, comfortable, and faster treatments.",
    category: "Treatments",
    date: "2025-03-20",
    readTime: "5 min read",
    content: `Laser dentistry represents the cutting edge of dental technology, offering patients a more comfortable and precise treatment experience.

## What is Laser Dentistry?

Dental lasers use concentrated light beams to treat various dental conditions. They can be used for procedures involving soft tissue (gums) and hard tissue (teeth and bone).

## Key Benefits

### Minimally Invasive
Lasers allow for more precise treatment, preserving more of the healthy tooth or gum tissue.

### Reduced Discomfort
Many laser procedures require less anesthesia and result in less post-operative pain.

### Faster Healing
The high-energy beam sterilizes the area and promotes blood clotting, leading to quicker recovery.

### Less Bleeding
Lasers naturally cauterize as they cut, significantly reducing bleeding during procedures.

## Common Laser Procedures

- Gum contouring
- Cavity treatment
- Teeth whitening
- Biopsies
- Periodontal therapy

Ask your dentist if laser treatment is right for your next procedure.`,
  },
  {
    slug: "dental-implants-guide",
    title: "Dental Implants: A Permanent Solution for Missing Teeth",
    excerpt:
      "Missing teeth can affect your confidence and oral health. Learn why dental implants are considered the gold standard for tooth replacement.",
    category: "Treatments",
    date: "2025-03-15",
    readTime: "6 min read",
    content: `Dental implants have transformed the way we replace missing teeth. Unlike traditional dentures or bridges, implants provide a permanent solution that looks and functions like natural teeth.

## What Are Dental Implants?

A dental implant consists of three parts:
1. **Implant post** - A titanium screw that fuses with your jawbone
2. **Abutment** - A connector that supports the crown
3. **Crown** - The visible tooth replacement

## Why Choose Implants?

### Permanent Solution
With proper care, dental implants can last a lifetime.

### Natural Function
Implants restore nearly 100% of your chewing ability.

### Bone Preservation
Implants stimulate the jawbone, preventing bone loss.

### No Impact on Adjacent Teeth
Unlike bridges, implants don't require altering neighboring teeth.

## The Process

The implant process typically takes 3-6 months, allowing time for the implant to fuse with your bone (osseointegration). While it requires patience, the results are well worth the wait.

## Are You a Candidate?

Most adults with good general health are candidates for dental implants. Your dentist will evaluate your bone density and overall oral health to determine suitability.`,
  },
  {
    slug: "pediatric-dentistry-first-visit",
    title: "Pediatric Dentistry: When Should Your Child First Visit a Dentist?",
    excerpt:
      "Early dental visits set the foundation for lifelong oral health. Find out when to schedule your child's first appointment and how to prepare them.",
    category: "Dental Health",
    date: "2025-03-10",
    readTime: "4 min read",
    content: `Many parents wonder when their child should have their first dental visit. The answer might surprise you - it's earlier than most people think!

## First Dental Visit: By Age 1

The American Dental Association recommends that children see a dentist by their first birthday or within six months of their first tooth erupting.

## Why So Early?

Early visits help:
- Identify potential issues before they become problems
- Familiarize your child with the dental environment
- Educate parents on proper oral care for infants
- Prevent baby bottle tooth decay

## Preparing Your Child

- Choose a pediatric dentist who specializes in children
- Schedule appointments in the morning when children are rested
- Use positive language - avoid words like "pain" or "hurt"
- Read children's books about dental visits
- Play "dentist" at home to familiarize them with the process

## What Happens at the First Visit?

The first visit is typically short and involves:
- A gentle examination of teeth and gums
- Checking jaw development
- Cleaning if needed
- Fluoride treatment
- Guidance on teething, thumb-sucking, and oral care

Starting early helps ensure your child develops a positive relationship with dental care that lasts a lifetime.`,
  },
  {
    slug: "teeth-whitening-guide",
    title: "Teeth Whitening: Professional vs At-Home Treatments",
    excerpt:
      "Want a brighter smile? We compare professional in-office whitening with at-home options so you can choose what's best for your needs and budget.",
    category: "Treatments",
    date: "2025-03-05",
    readTime: "5 min read",
    content: `A bright, white smile can boost your confidence and make a great first impression. But with so many whitening options available, how do you choose?

## Professional In-Office Whitening

**How it works:**
A high-concentration bleaching gel is applied to your teeth, often activated by a special light or laser.

**Results:**
- Teeth can become 3-8 shades lighter
- Results visible immediately
- Long-lasting with proper care

**Pros:**
- Fast results (1-2 hours)
- Supervised by a dentist
- Safe for gums and enamel
- Most effective option

## At-Home Whitening Options

### Whitening Toothpaste
Removes surface stains only. Good for maintenance, not dramatic results.

### Over-the-Counter Strips
Contains lower concentration of whitening agents. Results take weeks.

### Custom Take-Home Trays
Provided by your dentist with professional-grade gel. More effective than OTC options.

## Which Should You Choose?

**Choose professional whitening if:**
- You want immediate, dramatic results
- You have deep or stubborn stains
- You want the safest option

**Choose at-home if:**
- You're on a budget
- You prefer gradual whitening
- You only have mild staining

Consult your dentist to determine the best whitening option for your specific needs and dental health.`,
  },
];

export const serviceVideos: Record<string, string> = {
  "root-canal-treatment": "/videos/root canal.mp4",
  "orthodontic-treatment": "/videos/ORTHODONTIC TREATMENT.mp4",
  "crown-and-bridge": "/videos/CROWN AND BRIDGE.mp4",
  "complete-removable-dentures": "/videos/COMPLETE AND REMOVABLE DENTURES.mp4",
  "oral-prophylaxis": "/videos/ORAL PROPHYLAXIS.mp4",
  "teeth-whitening": "/videos/AESTHETIC DENTISTRY.mp4",
  "dental-restoration": "/videos/DENTAL RESTORATION.mp4",
  "aesthetic-dentistry": "/videos/AESTHETIC DENTISTRY.mp4",
  "teeth-extraction": "/videos/TEETH EXTRACTION.mp4",
  "laser-dentistry": "/videos/LASER DENTISTRY.mp4",
  "dental-implants": "/videos/DENTAL IMPLANTS.mp4",
  "paediatric-dentistry": "/videos/AESTHETIC DENTISTRY.mp4",
};

export const achievementPhotos = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/images/before-after/Achievement_${i + 1}.jpeg`,
  alt: `Achievement ${i + 1}`,
}));

export const certificatePhotos = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/images/achievements/To Text 12-26-2024 12.57_${i + 1}.jpg`,
  alt: `Certificate ${i + 1}`,
}));

export const talkVideos = [
  {
    id: 1,
    title: "Intro Video",
    src: "/videos/Intro Video.mp4",
    thumbnail: "Intro",
  },
  {
    id: 2,
    title: "Clinic Tour",
    src: "/videos/Video.mp4",
    thumbnail: "Clinic Tour",
  },
  {
    id: 3,
    title: "About Your Dentist",
    src: "/videos/intro video2.mp4",
    thumbnail: "About",
  },
];

export const faqItems = [
  {
    question: "Is root canal treatment painful?",
    answer:
      "Modern root canal treatment is virtually painless. We use advanced anesthesia techniques to ensure your comfort throughout the procedure. Most patients report feeling no more discomfort than a routine filling.",
  },
  {
    question: "How long do dental implants last?",
    answer:
      "With proper care and maintenance, dental implants can last a lifetime. Regular dental check-ups and good oral hygiene are essential for their longevity.",
  },
  {
    question: "At what age should my child first visit a dentist?",
    answer:
      "The American Dental Association recommends that children have their first dental visit by their first birthday or within six months after their first tooth erupts.",
  },
  {
    question: "How often should I get professional teeth cleaning?",
    answer:
      "We recommend professional cleaning every six months. However, some patients with gum disease may need more frequent visits as recommended by their dentist.",
  },
  {
    question: "Are clear aligners as effective as braces?",
    answer:
      "Clear aligners are highly effective for mild to moderate orthodontic issues. For complex cases, traditional braces may be more suitable. A consultation will help determine the best option for you.",
  },
  {
    question: "How long does teeth whitening last?",
    answer:
      "Professional teeth whitening results typically last 1-3 years, depending on your diet and oral hygiene habits. Avoiding staining foods and beverages can help maintain results longer.",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
