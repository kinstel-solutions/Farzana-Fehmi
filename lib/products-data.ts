
export interface Product {
    id: string;
    slug: string;
    name: string;
    collections: string[];
    price: string;
    priceNumeric: number;
    featured: boolean;
    mainImage: string | null;
    additionalImages: string[];
    description: string;
    material: string;
    occasion: string[];
    fit?: string;
    tags: string[];
}

export const products: Product[] = [
  {
    "slug": "rani-silk-suit",
    "id": "P001",
    "name": "Rani Silk Suit",
    "collections": [
      "Festive"
    ],
    "price": "$300",
    "priceNumeric": 300,
    "featured": true,
    "mainImage": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1305-Edit.jpg",
    "additionalImages": [
      "/Product-images/RaniSilkSuitSet(Festive)/DSCF1313-Edit.jpg",
      "/Product-images/RaniSilkSuitSet(Festive)/DSCF1324-Edit.jpg"
    ],
    "description": "An elegant suit set crafted in luxurious silk and adorned with intricate and colourful sequins, is ideal for any festive occasion.",
    "material": "silk",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Handcrafted",
      "Festive",
      "Limited"
    ]
  },
  {
    "slug": "emerald-green-kaamdaani-suit",
    "id": "P002",
    "name": "Emerald Green Kaamdaani suit",
    "collections": [
      "Party"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
    "mainImage": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1292-Edit.jpg",
    "additionalImages": [
      "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1283-Edit.jpg",
      "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1296-Edit.jpg",
      "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1302-Edit.jpg"
    ],
    "description": "This Luxurious georgette suit with heavy intricate zardozi work is perfectly suited for a grand occasion due to its rich colour and detailed craftsmanship.",
    "material": "Georgette and Shantoon",
    "occasion": [
      "Party"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted",
      "Limited"
    ]
  },
  {
    "slug": "magenta-orange-gota-patti-suit",
    "id": "P003",
    "name": "Magenta Orange Gota Patti Suit",
    "collections": [
      "Party"
    ],
    "price": "Price on Request",
    "priceNumeric": 0,
    "featured": true,
    "mainImage": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1344-Edit-Edit.jpg",
    "additionalImages": [
      "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1364-Edit.jpg"
    ],
    "description": "Inspired by rich heritage and craftmanship, this silk suit is adorned with floral motifs in gota patti and zardozi work, perfect for a grand occasion.",
    "material": "Pure Silk and crepe",
    "occasion": [
      "Party"
    ],
    "fit": "Made-to-order",
    "tags": [
      "Handcrafted",
      "Limited"
    ]
  },
  {
    "slug": "vintage-maroon-chanderi-suit-set",
    "id": "P004",
    "name": "Vintage Maroon Chanderi Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$180",
    "priceNumeric": 180,
    "featured": true,
    "mainImage": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset1.jpg",
    "additionalImages": [
      "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset2.jpg",
      "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset3.jpg"
    ],
    "description": "This Chanderi suit set, featuring a vintage frock style with geometrical patterns, is perfectly suited for any casual event with its relaxed style.",
    "material": "Chanderi Silk abd Shantoon",
    "occasion": [
      "Casual"
    ],
    "fit": "Large",
    "tags": []
  },
  {
    "slug": "dark-mauve-anarkali-suit",
    "id": "P005",
    "name": "Dark Mauve Anarkali suit",
    "collections": [
      "Festive"
    ],
    "price": "$230",
    "priceNumeric": 230,
    "featured": true,
    "mainImage": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1671-Edit.jpg",
    "additionalImages": [
      "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1678-Edit.jpg",
      "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1734-Edit.jpg",
      "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1842-Edit.jpg"
    ],
    "description": "This outfit is perfect for a light evening wear, featuring Anarkali style with delicate silk thread embroidery around neckline and sleeve band, paired with a crepe dupatta adorned with small booties.",
    "material": "Georgette and Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "small",
    "tags": [
      "Limited",
      "Handcrafted"
    ]
  },
  {
    "slug": "maharani-shalwar-suit-set",
    "id": "P006",
    "name": "Maharani Shalwar suit set",
    "collections": [
      "Festive"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
    "mainImage": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset1.jpg",
    "additionalImages": [
      "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset2.jpg",
      "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset3.jpg",
      "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset4.jpg"
    ],
    "description": "A vibrant crepe silk suit, featuring intricate zardozi hand embroidery on the front and sleeves, is sure to add a festive touch to any occasion.",
    "material": "Crepe silk",
    "occasion": [
      "Festive"
    ],
    "fit": "Medium",
    "tags": [
      "Limited",
      "Handcrafted",
      "Festive"
    ]
  },
  {
    "slug": "leheria-tissue-suit-set",
    "id": "P007",
    "name": "Leheria Tissue Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$190",
    "priceNumeric": 190,
    "featured": true,
    "mainImage": "/Product-images/LeheriyaTissueSuitSet(CasualWear)/34LeheriyaTissuesuitset1.jpg",
    "additionalImages": [
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1.jpg",
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2.jpg",
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3.jpg",
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4.jpg"
    ],
    "description": "This elegant off-white tissue suit, adorned with diagonal mettalic leheria pattern, transforms a simple design into a stunning ensemble, complemented by the understated elegance of a chiffon dupatta.",
    "material": "Tissue and Chiffon",
    "occasion": [
      "Casual"
    ],
    "fit": "Large",
    "tags": [
      "Limited",
      "Casual",
      "Handcrafted"
    ]
  },
  {
    "slug": "azure-blue-sequined-suit-set",
    "id": "P008",
    "name": "Azure Blue Sequined suit set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$185",
    "priceNumeric": 185,
    "featured": true,
    "mainImage": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset1.jpg",
    "additionalImages": [
      "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset2.jpg",
      "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset3.jpg",
      "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset4.jpg"
    ],
    "description": "This azure sequinned suit is perfect for daytime wear, elevated by Mughal floral embroidery around the neckline and sleeves, giving it a breezy feel.",
    "material": "Georgette and chiffon",
    "occasion": [
      "Casual"
    ],
    "fit": "Large",
    "tags": [
      "Casual",
      "Handcrafted",
      "Limited",
      "Comfort Wear"
    ]
  },
  {
    "slug": "apricot-and-salmon-pink-georgette-suit-set",
    "id": "P009",
    "name": "Apricot and Salmon Pink Georgette Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$185",
    "priceNumeric": 185,
    "featured": true,
    "mainImage": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset1.jpg",
    "additionalImages": [
      "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset2.jpg",
      "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset4.jpg",
      "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset5.jpg"
    ],
    "description": "Exquisite apricot and salmon pink sequined georgette suit, adorned with delicate embroidery on the front lower hemline, paired with chiffon dupatta makes it ideal for daytime events.",
    "material": "Georgette and chiffon",
    "occasion": [
      "Casual"
    ],
    "fit": "Large",
    "tags": [
      "Casual",
      "Handcrafted",
      "Limited",
      "Comfort Wear"
    ]
  },
  {
    "slug": "bottle-green-mirror-sequined-suit-set",
    "id": "P010",
    "name": "Bottle Green Mirror Sequined suit set",
    "collections": [
      "Festive"
    ],
    "price": "$150",
    "priceNumeric": 150,
    "featured": true,
    "mainImage": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset1.jpg",
    "additionalImages": [
      "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset2.jpg",
      "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset3.jpg",
      "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset4.jpg"
    ],
    "description": "Ideal for celebrations, this bottle green crepe ensemble with intricate floral resham and zari embroidery, paired with a gorgeous crepe dupatta featuring, mirror and banarsi border details.",
    "material": "Crepe silk",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Handcrafted",
      "Festive",
      "Comfort Wear"
    ]
  },
  {
    "slug": "dusty-rose-organza-suit-set",
    "id": "P011",
    "name": "Dusty Rose Organza suit set",
    "collections": [
      "Party"
    ],
    "price": "$170",
    "priceNumeric": 170,
    "featured": true,
    "mainImage": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset2.jpg",
    "additionalImages": [
      "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset1.jpg",
      "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset3.jpg",
      "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset4.jpg"
    ],
    "description": "A beautiful dusty rose organza suit set adorned with heavy sequinned front and delicately adorned tissue dupatta transforms it into an exclusive piece.",
    "material": "Organza",
    "occasion": [
      "Party"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted",
      "Limited"
    ]
  },
  {
    "slug": "royal-blue-crepe-bandhani-suit-set",
    "id": "P012",
    "name": "Royal Blue Crepe Bandhani suit set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$160",
    "priceNumeric": 160,
    "featured": true,
    "mainImage": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset1.jpg",
    "additionalImages": [
      "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset2.jpg",
      "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset3.jpg",
      "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset4.jpg"
    ],
    "description": "This elegant royal blue bandhani crepe suit is adorned with light embroidery on the front, perfect for a casual yet refined atmosphere.",
    "material": "crepe silk and chiffon",
    "occasion": [
      "Casual"
    ],
    "fit": "Medium",
    "tags": [
      "Casual",
      "Handcrafted",
      "Comfort Wear"
    ]
  },
  {
    "slug": "jade-applique-suit-set",
    "id": "P013",
    "name": "Jade Applique Suit Set",
    "collections": [
      "Festive"
    ],
    "price": "$180",
    "priceNumeric": 180,
    "featured": true,
    "mainImage": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3.jpg",
    "additionalImages": [
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1.jpg",
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2.jpg",
      "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4.jpg"
    ],
    "description": "This jade-hued tissue suit set, adorned with intricate applique work on the front and beautiful banarsi border on the hem, exudes elegance.",
    "material": "Tissue and Shantoon",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted",
      "Limited"
    ]
  },
  {
    "slug": "purple-tissue-front-slit-suit",
    "id": "P014",
    "name": "Purple Tissue Front Slit Suit",
    "collections": [
      "Festive"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
    "mainImage": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit1.jpg",
    "additionalImages": [
      "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit2.jpg",
      "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit3.jpg",
      "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit4.jpg"
    ],
    "description": "Elevate your festive look with this stunning purple ombre suit, crafted with leheriya tissue. The suit's front slit paired with a pant-style bottom exudes a smart, polished look. Delicate floral patterns on the front and crepe dupatta adorned with intricate booties add a touch of elegance to this ensemble.",
    "material": "Tissue and Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted"
    ]
  },
  {
    "slug": "sea-green-semi-crepe-suit-set",
    "id": "P015",
    "name": "Sea Green Semi-Crepe Suit Set",
    "collections": [
      "Festive"
    ],
    "price": "$230",
    "priceNumeric": 230,
    "featured": true,
    "mainImage": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1500-Edit.jpg",
    "additionalImages": [
      "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1508-Edit.jpg",
      "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1516-Edit.jpg",
      "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1539-Edit.jpg"
    ],
    "description": "Elevate your summer style with this stunning mint green suit, exclusively crafted from crepe and featuring a soothing colour palette ideal for any warm-weather celebration. The ensemble features bell sleeves and intricate sequin work on the sleeves and lower front hemline.",
    "material": "Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted"
    ]
  }
];

export const allCollections = [
  "Everyday Wear",
  "Festive",
  "Party"
];
export const allOccasions = [
  "Casual",
  "Festive",
  "Party"
];
export const allTags = [
  "Casual",
  "Comfort Wear",
  "Festive",
  "Handcrafted",
  "Limited"
];

export function formatPrice(price: number): string {
    if (price === 0) return 'Price on Request';
    return price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
}

export function getProductsByCollection(collection: string): Product[] {
    return products.filter(p => p.collections.includes(collection));
}

export function getRelatedProducts(product: Product): Product[] {
    return products.filter(p => {
        if (p.id === product.id) return false;
        const sameCollection = p.collections.some(c => product.collections.includes(c));
        const sameTag = p.tags.some(t => product.tags.includes(t));
        return sameCollection || sameTag;
    }).slice(0, 4);
}
