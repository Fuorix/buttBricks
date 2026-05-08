export interface Product {
  title: string;
  description: string;
  image: string;
  alt: string;
  tag: string | null;
  badge: {
    text: string;
    type: string;
  } | null;
  sku: string;
  slug: string;
  isFeatured: boolean;
  /* New fields for Product Detail Page */
  tagline: string;
  features: { icon: string; label: string; text: string }[];
  narrative: string[];
  specs: { label: string; detail: string; unit: string }[];
}

export const productData: Product[] = [
  {
    title: 'Fare Face Gutka',
    description: 'A classic structural choice for modern elevations. Known for its uniform texture and high compressive strength, perfect for load-bearing walls.',
    image: '/gutka-home.jpg',
    alt: 'Close-up texture of premium terracotta fare face gutka bricks with rich earthy red tones and clean sharp edges in industrial lighting',
    tag: 'PREMIUM',
    badge: { text: 'Premium', type: 'primary' },
    sku: 'BB-FFG-001',
    slug: 'fare-face-gutka',
    isFeatured: true,
    tagline: "The architect's choice for precision masonry.",
    features: [
      { icon: 'shield', label: 'Weather Resistant', text: 'Withstands extreme thermal shifts.' },
      { icon: 'eco', label: 'Eco-Friendly', text: '100% natural kiln-fired clay.' },
      { icon: 'fitness_center', label: 'High Strength', text: 'Structural grade compression.' }
    ],
    narrative: [
      "The Fare Face Gutka represents the pinnacle of our masonry tradition. Unlike standard bricks, the Gutka is specifically engineered for high-visibility architectural surfaces where the aesthetic texture of the material is as critical as its structural integrity.",
      "Each piece is fired at precisely 1,100°C in our heritage kilns, resulting in a rich, uniform terracotta hue that does not fade under UV exposure.",
      "Its slender profile allows architects to create modern, elongated bond patterns that emphasize the horizontal lines of a structure, a hallmark of industrial luxury design."
    ],
    specs: [
      { label: 'Dimensions', detail: '9" x 1.5" x 3"', unit: 'Nominal Size' },
      { label: 'Material Composition', detail: 'Refined Red Clay', unit: 'ASTM C67' },
      { label: 'Surface Finish', detail: 'Smooth-Faced', unit: 'Architectural' },
      { label: 'Compression Strength', detail: 'Over 3,500', unit: 'PSI' },
      { label: 'Dry Weight', detail: '1.4', unit: 'kg Per Unit' }
    ]
  },
  {
    title: 'Special Face Bricks',
    description: 'Classic structural face bricks with superior durability and timeless aesthetic appeal.',
    image: '/special-face-bricks-home.jpg',
    alt: 'Rustic red special face bricks showing natural kiln-fired variations',
    tag: null,
    badge: null,
    sku: 'BB-SFB-002',
    slug: 'special-fare-face-bricks',
    isFeatured: true,
    tagline: 'The foundation of traditional masonry.',
    features: [
      { icon: 'temp_preferences_custom', label: 'Thermal Mass', text: 'Natural insulation properties.' },
      { icon: 'history', label: 'Aged Texture', text: 'Natural variations in every batch.' },
      { icon: 'construction', label: 'Load Bearing', text: 'ASTM Grade structural support.' }
    ],
    narrative: [
      "Our Special Face Bricks are the core of the Butt Bricks legacy, established in 1979. These bricks offer the perfect balance between traditional aesthetics and modern engineering requirements.",
      "The natural firing process creates a unique color palette that provides warmth and character to any facade, making it a favorite for residential and commercial landmarks across Pakistan."
    ],
    specs: [
      { label: 'Dimensions', detail: '9" x 3" x 4.5"', unit: 'Standard Size' },
      { label: 'Water Absorption', detail: 'Less than 15%', unit: 'ASTM C67' },
      { label: 'Compression Strength', detail: '3,000', unit: 'PSI' }
    ]
  },
  {
    title: 'Special Tiles',
    description: 'Custom fired tiles designed for interior feature walls and luxury exterior finishes.',
    image: '/special-tiles-home.jpg',
    alt: 'Large format terracotta wall tiles with smooth surface',
    tag: null,
    badge: null,
    sku: 'BB-ST-003',
    slug: 'special-tiles',
    isFeatured: true,
    tagline: 'Lightweight aesthetic for modern interiors.',
    features: [
      { icon: 'palette', label: 'Rich Pigment', text: 'Deep terracotta mineral tones.' },
      { icon: 'layers', label: 'Slim Profile', text: 'Easy installation on existing walls.' },
      { icon: 'clean_hands', label: 'Low Maintenance', text: 'Dust and stain resistant surface.' }
    ],
    narrative: [
      "Special Tiles by Butt Bricks bring the earthy soul of clay into interior spaces. These tiles are designed for feature walls, fireplaces, and luxury accents where weight is a consideration.",
      "Despite their slim profile, they maintain the same thermal properties and color fastness as our full-sized structural products."
    ],
    specs: [
      { label: 'Dimensions', detail: '9" x 2" x 0.5"', unit: 'Tile Format' },
      { label: 'Application', detail: 'Adhesive Bound', unit: 'Wall Only' },
      { label: 'Finish', detail: 'Matte / Natural', unit: 'Unglazed' }
    ]
  },
  {
    title: 'Face Design',
    description: 'Bespoke geometric arrangements and textures for unique building character.',
    image: '/face-design-home.jpg',
    alt: 'Intricate brick patterns showing decorative masonry work',
    tag: null,
    badge: null,
    sku: 'BB-FD-004',
    slug: 'fare-face-design',
    isFeatured: true,
    tagline: 'Geometric arrangements for unique character.',
    features: [
      { icon: 'grid_view', label: 'Patterned', text: 'Custom molds for complex bonds.' },
      { icon: 'architecture', label: 'Precision', text: 'Millimeter-perfect dimensions.' },
      { icon: 'diamond', label: 'Premium Finish', text: 'Hand-inspected for surface quality.' }
    ],
    narrative: [
      "Face Design products are created for architects who wish to break the monotony of standard masonry. These pieces allow for shadows, depth, and intricate light play on building surfaces.",
      "Each design is developed in collaboration with structural engineers to ensure that decorative elements do not compromise the building's integrity."
    ],
    specs: [
      { label: 'Customization', detail: 'Available', unit: 'On Request' },
      { label: 'Texture', detail: 'Sand-struck / Smooth', unit: 'Bespoke' }
    ]
  },
  {
    title: 'Floor Design',
    description: 'Heavy-duty terracotta flooring solutions for courtyards and pathways.',
    image: '/floor-design-home.jpg',
    alt: 'Terracotta floor pavers arranged in a herringbone pattern',
    tag: null,
    badge: null,
    sku: 'BB-FLD-005',
    slug: 'floor-design',
    isFeatured: true,
    tagline: 'Heavy-duty solutions for courtyards.',
    features: [
      { icon: 'door_sliding', label: 'Slip Resistant', text: 'Natural grip even when wet.' },
      { icon: 'traffic', label: 'Pedestrian Grade', text: 'Handles high foot traffic areas.' },
      { icon: 'filter_vintage', label: 'Cool Surface', text: 'Remains cool under direct sunlight.' }
    ],
    narrative: [
      "Our Floor Design series transforms outdoor living spaces. Made from dense, high-fired clay, these pavers are designed to withstand the harsh weather conditions of Pakistan while providing a comfortable walking surface.",
      "The natural porosity of terracotta allows the floor to 'breathe,' making it significantly cooler than concrete or marble during the summer months."
    ],
    specs: [
      { label: 'Dimensions', detail: '6" x 6" / 9" x 9"', unit: 'Paver Size' },
      { label: 'Thickness', detail: '1.5"', unit: 'Heavy Duty' },
      { label: 'Abrasion Resistance', detail: 'High', unit: 'ASTM C902' }
    ]
  },
  {
    title: 'Khaprail Design',
    description: 'Traditional roofing tiles that provide natural insulation and heritage styling.',
    image: '/khaprail-design-home.jpg',
    alt: 'Traditional Pakistani khaprail roof tiles with weathered texture',
    tag: null,
    badge: null,
    sku: 'BB-KD-006',
    slug: 'khaprail-design',
    isFeatured: true,
    tagline: 'Traditional roofing for natural insulation.',
    features: [
      { icon: 'ac_unit', label: 'Thermal Barrier', text: 'Reduces indoor heat significantly.' },
      { icon: 'water_drop', label: 'Weather Proof', text: 'Interlocking design for drainage.' },
      { icon: 'castle', label: 'Heritage Look', text: 'Authentic Punjabi architecture style.' }
    ],
    narrative: [
      "Khaprail Design tiles are a tribute to the vernacular architecture of the subcontinent. They are the most effective natural cooling solution for roofs, creating a ventilated air gap that keeps interiors temperate.",
      "Butt Bricks Khaprail is synonymous with longevity, protecting heritage and modern homes alike for decades."
    ],
    specs: [
      { label: 'Style', detail: 'Tapered / Flat', unit: 'Traditional' },
      { label: 'Coverage', detail: '2.5 Tiles', unit: 'Per Sq. Ft.' },
      { label: 'Heat Reduction', detail: 'Up to 5°C', unit: 'Efficiency' }
    ]
  },
];