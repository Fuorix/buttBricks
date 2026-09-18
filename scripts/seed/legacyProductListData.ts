export interface ProductFeature {
  icon: string;
  label: string;
  text: string;
}

export interface SpecItem {
  spec: string;
  detail: string;
  unit: string;
}

export interface ProductDetail {
  slug: string;
  title: string;
  collection: string;
  description: string;
  features: ProductFeature[];
  images: string[];
  narrative: string[];
  specs: SpecItem[];
  relatedSlugs: string[];
}

export const productListData: ProductDetail[] = [
  {
    slug: 'fare-face-gutka',
    title: 'Fare Face Gutka',
    collection: 'Signature Collection',
    description: "The architect's choice for precision masonry. Crafted from aged red clay for a finish that matures gracefully with time.",
    features: [
      { icon: 'shield', label: 'Weather Resistant', text: 'Withstands extreme thermal shifts.' },
      { icon: 'eco', label: 'Eco-Friendly', text: '100% natural kiln-fired clay.' },
      { icon: 'fitness_center', label: 'High Strength', text: 'Structural grade compression.' }
    ],
    images: [
      '/fare-face-gutka/gutka01.jpg',
      '/fare-face-gutka/gutka02.jpg',
      '/fare-face-gutka/gutka03.jpg',
      '/fare-face-gutka/gutka04.jpg',
      '/fare-face-gutka/gutka05.jpg',
      '/fare-face-gutka/gutka06.jpg',
      '/fare-face-gutka/gutka07.jpg',
      '/fare-face-gutka/gutka08.jpg',
      '/fare-face-gutka/gutka09.jpg'
    ],
    narrative: [
      "The Fare Face Gutka represents the pinnacle of our masonry tradition. Unlike standard bricks, the Gutka is specifically engineered for high-visibility architectural surfaces where the aesthetic texture of the material is as critical as its structural integrity.",
      "Each piece is fired at precisely 1,100°C in our heritage kilns, resulting in a rich, uniform terracotta hue that does not fade under UV exposure. Its slender profile (9\" x 1.5\") allows architects to create modern, elongated bond patterns that emphasize the horizontal lines of a structure, a hallmark of industrial luxury design."
    ],
    specs: [
      { spec: 'Dimensions', detail: '9" x 1.5" x 3"', unit: 'Nominal Size' },
      { spec: 'Material Composition', detail: 'Refined Red Clay', unit: 'ASTM C67' },
      { spec: 'Surface Finish', detail: 'Smooth-Faced Architectural', unit: 'Grade SW' },
      { spec: 'Compression Strength', detail: 'Over 3,500 PSI', unit: 'Load Bearing' },
      { spec: 'Dry Weight', detail: '1.4 kg', unit: 'Per Unit' }
    ],
    relatedSlugs: [
      'special-fare-face-bricks',
      'fare-face-design',
      'special-tiles'
    ]
  },
  {
    slug: 'special-fare-face-bricks',
    title: 'Special Fare Face Bricks',
    collection: 'Premium Collections',
    description: 'Classic structural face bricks with superior durability and timeless aesthetic appeal for exposed masonry walls.',
    features: [
      { icon: 'architecture', label: 'Exposed Finish', text: 'Requires no plaster or paint.' },
      { icon: 'thermostat', label: 'Thermal Mass', text: 'Regulates interior temperatures.' },
      { icon: 'texture', label: 'Rich Texture', text: 'Natural kiln-fired variations.' }
    ],
    images: [
      '/special-fare-face-bricks/specialfacebricks01.jpg',
      '/special-fare-face-bricks/specialfacebricks02.jpg',
      '/special-fare-face-bricks/specialfacebricks03.jpg'
    ],
    narrative: [
      "Our Special Fare Face Bricks are designed to be seen. By selecting the finest topsoil and employing a slow-firing technique, we ensure every brick emerges with a pristine, unblemished face ready for structural display.",
      "These bricks eliminate the need for secondary exterior finishes, reducing long-term maintenance costs while providing a robust, character-rich facade that anchors a building in its environment."
    ],
    specs: [
      { spec: 'Dimensions', detail: '9" x 3" x 4.5"', unit: 'Nominal Size' },
      { spec: 'Material Composition', detail: 'High-Density Terracotta', unit: 'ASTM C216' },
      { spec: 'Surface Finish', detail: 'Textured / Wire-cut', unit: 'Grade SW' },
      { spec: 'Compression Strength', detail: 'Over 4,000 PSI', unit: 'Load Bearing' },
      { spec: 'Dry Weight', detail: '2.8 kg', unit: 'Per Unit' }
    ],
    relatedSlugs: [
      'fare-face-gutka',
      'fare-face-design',
      'special-tiles'
    ]
  },
  {
    slug: 'special-tiles',
    title: 'Special Tiles',
    collection: 'Architectural Tiles',
    description: 'Custom fired terracotta tiles designed for interior feature walls, elegant facades, and luxury exterior finishes.',
    features: [
      { icon: 'layers', label: 'Thin Profile', text: 'Maximizes interior floor space.' },
      { icon: 'format_paint', label: 'Versatile', text: 'Adheres to multiple substrates.' },
      { icon: 'water_drop', label: 'Low Absorption', text: 'Resists moisture penetration.' }
    ],
    images: [
      '/special-tiles/specialtiles01.jpg',
      '/special-tiles/specialtiles02.jpg',
      '/special-tiles/specialtiles03.jpg'
    ],
    narrative: [
      "When structural brickwork isn't viable, our Special Tiles offer the exact aesthetic of premium masonry in a lightweight cladding format. These are authentic slices of our highest-grade bricks, carrying the same thermal and acoustic properties.",
      "Ideal for retrofitting modern interiors, commercial lobbys, or specialized facade systems, these tiles provide a seamless brick finish without the heavy load-bearing requirements."
    ],
    specs: [
      { spec: 'Dimensions', detail: '9" x 2.25" x 0.5"', unit: 'Nominal Size' },
      { spec: 'Material Composition', detail: 'Extruded Clay', unit: 'ASTM C1088' },
      { spec: 'Surface Finish', detail: 'Smooth / Sanded', unit: 'Type TBA' },
      { spec: 'Water Absorption', detail: 'Under 6%', unit: 'Boiling Test' },
      { spec: 'Dry Weight', detail: '0.4 kg', unit: 'Per Unit' }
    ],
    relatedSlugs: [
      'floor-design',
      'khaprail-design',
      'fare-face-gutka'
    ]
  },
  {
    slug: 'fare-face-design',
    title: 'Fare Face Design',
    collection: 'Custom Designs',
    description: 'Bespoke geometric arrangements, bullnoses, and custom angles engineered for unique building character and architectural detailing.',
    features: [
      { icon: 'category', label: 'Custom Shapes', text: 'Arches, radials, and plinths.' },
      { icon: 'precision_manufacturing', label: 'Precision Cut', text: 'Exact angles for seamless joints.' },
      { icon: 'diamond', label: 'Architectural Detail', text: 'Enhances building silhouettes.' }
    ],
    images: [
      '/fare-face-design/face-design01.jpg',
      '/fare-face-design/face-design02.jpg',
      '/fare-face-design/face-design03.jpg'
    ],
    narrative: [
      "To elevate a standard brick wall into an architectural masterpiece requires specialized profiles. Our Fare Face Design series includes bullnoses, cant bricks, and radials designed to turn sharp corners into sweeping curves and flat walls into textured canvases.",
      "Produced in small, controlled batches, these specialized pieces match the exact hue and compression strength of our standard collections, ensuring a flawless integration into your broader masonry project."
    ],
    specs: [
      { spec: 'Dimensions', detail: 'Variable Configurations', unit: 'Custom Sizes' },
      { spec: 'Material Composition', detail: 'Molded Red Clay', unit: 'Specialty Grade' },
      { spec: 'Surface Finish', detail: 'Smooth Architectural', unit: 'Grade SW' },
      { spec: 'Compression Strength', detail: 'Over 3,500 PSI', unit: 'Load Bearing' },
      { spec: 'Radius Range', detail: 'Customizable', unit: 'Degrees' }
    ],
    relatedSlugs: [
      'special-fare-face-bricks',
      'fare-face-gutka',
      'floor-design'
    ]
  },
  {
    slug: 'floor-design',
    title: 'Floor Design',
    collection: 'Geometric Patterns',
    description: 'Heavy-duty terracotta flooring solutions providing highly durable, slip-resistant surfaces for courtyards and pathways.',
    features: [
      { icon: 'grid_on', label: 'High Traffic', text: 'Engineered for extreme wear.' },
      { icon: 'waves', label: 'Slip Resistant', text: 'Textured grip for safety.' },
      { icon: 'all_out', label: 'Modular', text: 'Supports herringbone and basketweave.' }
    ],
    images: [
      '/floor-design/floor-design01.jpg',
      '/floor-design/floor-design02.jpg',
      '/floor-design/floor-design03.jpg'
    ],
    narrative: [
      "Ground surfaces demand a different class of masonry. Our Floor Design pavers are fired at extended durations to maximize density, making them virtually impervious to pedestrian traffic and vehicular loads.",
      "The natural terracotta retains an earthy warmth while resisting oil spills and weathering. Available in various dimensions, they are perfect for intricate herringbone, running bond, or classic basketweave courtyard installations."
    ],
    specs: [
      { spec: 'Dimensions', detail: '8" x 4" x 2.25"', unit: 'Nominal Size' },
      { spec: 'Material Composition', detail: 'Vitrified Clay Paver', unit: 'ASTM C902' },
      { spec: 'Surface Finish', detail: 'Wire-cut / Beveled', unit: 'Class SX' },
      { spec: 'Slip Resistance', detail: 'Coefficient > 0.6', unit: 'Wet/Dry' },
      { spec: 'Dry Weight', detail: '2.1 kg', unit: 'Per Unit' }
    ],
    relatedSlugs: [
      'khaprail-design',
      'special-tiles',
      'special-fare-face-bricks'
    ]
  },
  {
    slug: 'khaprail-design',
    title: 'Khaprail Design',
    collection: 'Heritage Restorations',
    description: 'Traditional interlocking roofing tiles that provide natural thermal insulation and classic South Asian heritage styling.',
    features: [
      { icon: 'home', label: 'Heritage Roof', text: 'Authentic traditional aesthetic.' },
      { icon: 'air', label: 'Breathable', text: 'Prevents moisture buildup.' },
      { icon: 'wb_sunny', label: 'Thermal Shield', text: 'Reflects harsh solar radiation.' }
    ],
    images: [
      '/khaprail-design/khapraildesign01.jpg',
      '/khaprail-design/khapraildesign02.jpg',
      '/khaprail-design/khapraildesign03.jpg'
    ],
    narrative: [
      "Khaprail is the soul of vernacular architecture. Our Khaprail Design tiles are molded to interlock perfectly, creating a waterproof, breathable canopy that drastically reduces indoor temperatures during peak summer months.",
      "Beyond their functional thermal mass, the overlapping semi-cylindrical patterns cast deep, shifting shadows throughout the day, bringing roofs to life with a timeless, rustic elegance."
    ],
    specs: [
      { spec: 'Dimensions', detail: '10" x 6" x 0.5"', unit: 'Nominal Size' },
      { spec: 'Material Composition', detail: 'Porous Red Clay', unit: 'Roofing Grade' },
      { spec: 'Surface Finish', detail: 'Natural Matte Terracotta', unit: 'Unglazed' },
      { spec: 'Coverage', detail: '140 Tiles', unit: 'Per 100 Sq.Ft' },
      { spec: 'Dry Weight', detail: '0.9 kg', unit: 'Per Unit' }
    ],
    relatedSlugs: [
      'floor-design',
      'special-tiles',
      'fare-face-design'
    ]
  }
];