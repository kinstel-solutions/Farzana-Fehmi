
export interface ImageVariant {
    grid: string;
    detail: string;
    hero: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    collections: string[];
    price: string;
    priceNumeric: number;
    featured: boolean;
    mainImage: ImageVariant | null;
    additionalImages: ImageVariant[];
    description: string;
    material: string;
    occasion: string[];
    fit?: string;
    tags: string[];
}

export const products: Product[] = [
  {
    "id": "P001",
    "slug": "rani-silk-suit",
    "name": "Rani Silk Suit",
    "collections": [
      "Festive"
    ],
    "price": "$300",
    "priceNumeric": 300,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1305-Edit-grid.webp",
      "detail": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1305-Edit-detail.webp",
      "hero": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1305-Edit-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1313-Edit-grid.webp",
        "detail": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1313-Edit-detail.webp",
        "hero": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1313-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1324-Edit-grid.webp",
        "detail": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1324-Edit-detail.webp",
        "hero": "/Product-images/RaniSilkSuitSet(Festive)/DSCF1324-Edit-hero.webp"
      }
    ]
  },
  {
    "id": "P002",
    "slug": "emerald-green-kaamdaani-suit",
    "name": "Emerald Green Kaamdaani suit",
    "collections": [
      "Party"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1292-Edit-grid.webp",
      "detail": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1292-Edit-detail.webp",
      "hero": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1292-Edit-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1283-Edit-grid.webp",
        "detail": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1283-Edit-detail.webp",
        "hero": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1283-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1296-Edit-grid.webp",
        "detail": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1296-Edit-detail.webp",
        "hero": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1296-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1302-Edit-grid.webp",
        "detail": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1302-Edit-detail.webp",
        "hero": "/Product-images/EmeraldGreenKaamdaanisuitset(PartyWear)/DSCF1302-Edit-hero.webp"
      }
    ]
  },
  {
    "id": "P003",
    "slug": "magenta-orange-gota-patti-suit",
    "name": "Magenta Orange Gota Patti Suit",
    "collections": [
      "Party"
    ],
    "price": "Price on Request",
    "priceNumeric": 0,
    "featured": true,
    "description": "Inspired by rich heritage and craftmanship, this silk suit is adorned with floral motifs in gota patti and zardozi work, perfect for a grand occasion.",
    "material": "Pure Silk and crepe",
    "occasion": [
      "Party"
    ],
    "fit": "Made-to-order",
    "tags": [
      "Handcrafted",
      "Limited"
    ],
    "mainImage": {
      "grid": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1344-Edit-Edit-grid.webp",
      "detail": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1344-Edit-Edit-detail.webp",
      "hero": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1344-Edit-Edit-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1364-Edit-grid.webp",
        "detail": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1364-Edit-detail.webp",
        "hero": "/Product-images/MagentaOrangeGotaPattisuitset(PartyWear-madetoorder))/DSCF1364-Edit-hero.webp"
      }
    ]
  },
  {
    "id": "P004",
    "slug": "vintage-maroon-chanderi-suit-set",
    "name": "Vintage Maroon Chanderi Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$180",
    "priceNumeric": 180,
    "featured": true,
    "description": "This Chanderi suit set, featuring a vintage frock style with geometrical patterns, is perfectly suited for any casual event with its relaxed style.",
    "material": "Chanderi Silk abd Shantoon",
    "occasion": [
      "Casual"
    ],
    "fit": "Large",
    "tags": [],
    "mainImage": {
      "grid": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset1-grid.webp",
      "detail": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset1-detail.webp",
      "hero": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset2-grid.webp",
        "detail": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset2-detail.webp",
        "hero": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset3-grid.webp",
        "detail": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset3-detail.webp",
        "hero": "/Product-images/VintageMaroonChanderiSilkSuitSet(CasualWear)/32VintageMaroonChanderisilkAnarkalisuitset3-hero.webp"
      }
    ]
  },
  {
    "id": "P005",
    "slug": "dark-mauve-anarkali-suit",
    "name": "Dark Mauve Anarkali suit",
    "collections": [
      "Festive"
    ],
    "price": "$230",
    "priceNumeric": 230,
    "featured": true,
    "description": "This outfit is perfect for a light evening wear, featuring Anarkali style with delicate silk thread embroidery around neckline and sleeve band, paired with a crepe dupatta adorned with small booties.",
    "material": "Georgette and Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "small",
    "tags": [
      "Limited",
      "Handcrafted"
    ],
    "mainImage": {
      "grid": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1671-Edit-grid.webp",
      "detail": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1671-Edit-detail.webp",
      "hero": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1671-Edit-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1678-Edit-grid.webp",
        "detail": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1678-Edit-detail.webp",
        "hero": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1678-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1734-Edit-grid.webp",
        "detail": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1734-Edit-detail.webp",
        "hero": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1734-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1842-Edit-grid.webp",
        "detail": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1842-Edit-detail.webp",
        "hero": "/Product-images/DarkMauveAnaarkalisuitset(LightPartyWear)/DSCF1842-Edit-hero.webp"
      }
    ]
  },
  {
    "id": "P006",
    "slug": "maharani-shalwar-suit-set",
    "name": "Maharani Shalwar suit set",
    "collections": [
      "Festive"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset1-grid.webp",
      "detail": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset1-detail.webp",
      "hero": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset2-grid.webp",
        "detail": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset2-detail.webp",
        "hero": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset3-grid.webp",
        "detail": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset3-detail.webp",
        "hero": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset4-grid.webp",
        "detail": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset4-detail.webp",
        "hero": "/Product-images/MaharaniShalwarSuitSet(LightPartyWear)/21MaharaniShalwarsuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P007",
    "slug": "leheria-tissue-suit-set",
    "name": "Leheria Tissue Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$190",
    "priceNumeric": 190,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/LeheriyaTissueSuitSet(CasualWear)/34LeheriyaTissuesuitset1-grid.webp",
      "detail": "/Product-images/LeheriyaTissueSuitSet(CasualWear)/34LeheriyaTissuesuitset1-detail.webp",
      "hero": "/Product-images/LeheriyaTissueSuitSet(CasualWear)/34LeheriyaTissuesuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-hero.webp"
      },
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P008",
    "slug": "azure-blue-sequined-suit-set",
    "name": "Azure Blue Sequined suit set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$185",
    "priceNumeric": 185,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset1-grid.webp",
      "detail": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset1-detail.webp",
      "hero": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset2-grid.webp",
        "detail": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset2-detail.webp",
        "hero": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset3-grid.webp",
        "detail": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset3-detail.webp",
        "hero": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset4-grid.webp",
        "detail": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset4-detail.webp",
        "hero": "/Product-images/AzureBlueSequinnedSuitSet(CasualWear)/11AzureBlueSequinnedsuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P009",
    "slug": "apricot-and-salmon-pink-georgette-suit-set",
    "name": "Apricot and Salmon Pink Georgette Suit Set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$185",
    "priceNumeric": 185,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset1-grid.webp",
      "detail": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset1-detail.webp",
      "hero": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset2-grid.webp",
        "detail": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset2-detail.webp",
        "hero": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset4-grid.webp",
        "detail": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset4-detail.webp",
        "hero": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset4-hero.webp"
      },
      {
        "grid": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset5-grid.webp",
        "detail": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset5-detail.webp",
        "hero": "/Product-images/ApricotandSalmonPinkSequinnedSuitSet(CasualWear)/10ApricotandSalmonPinkSequinnedsuitset5-hero.webp"
      }
    ]
  },
  {
    "id": "P010",
    "slug": "bottle-green-mirror-sequined-suit-set",
    "name": "Bottle Green Mirror Sequined suit set",
    "collections": [
      "Festive"
    ],
    "price": "$150",
    "priceNumeric": 150,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset1-grid.webp",
      "detail": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset1-detail.webp",
      "hero": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset2-grid.webp",
        "detail": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset2-detail.webp",
        "hero": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset3-grid.webp",
        "detail": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset3-detail.webp",
        "hero": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset4-grid.webp",
        "detail": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset4-detail.webp",
        "hero": "/Product-images/BottleGreenMirrorSequinedsuitset(LightPartyWear)/25BottleGreenMirrorSequinedsuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P011",
    "slug": "dusty-rose-organza-suit-set",
    "name": "Dusty Rose Organza suit set",
    "collections": [
      "Party"
    ],
    "price": "$170",
    "priceNumeric": 170,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset2-grid.webp",
      "detail": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset2-detail.webp",
      "hero": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset2-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset1-grid.webp",
        "detail": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset1-detail.webp",
        "hero": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset1-hero.webp"
      },
      {
        "grid": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset3-grid.webp",
        "detail": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset3-detail.webp",
        "hero": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset4-grid.webp",
        "detail": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset4-detail.webp",
        "hero": "/Product-images/DustyRoseOrganzaSuitSet(PartyWear)/4DustyRoseOrganzasuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P012",
    "slug": "royal-blue-crepe-bandhani-suit-set",
    "name": "Royal Blue Crepe Bandhani suit set",
    "collections": [
      "Everyday Wear"
    ],
    "price": "$160",
    "priceNumeric": 160,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset1-grid.webp",
      "detail": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset1-detail.webp",
      "hero": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset2-grid.webp",
        "detail": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset2-detail.webp",
        "hero": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset3-grid.webp",
        "detail": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset3-detail.webp",
        "hero": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset3-hero.webp"
      },
      {
        "grid": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset4-grid.webp",
        "detail": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset4-detail.webp",
        "hero": "/Product-images/RoyalBlueCrepeBandhanisuit(CasualWear)/3.RoyalBlueCrepeBandhanisuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P013",
    "slug": "jade-applique-suit-set",
    "name": "Jade Applique Suit Set",
    "collections": [
      "Festive"
    ],
    "price": "$180",
    "priceNumeric": 180,
    "featured": true,
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
    ],
    "mainImage": {
      "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-grid.webp",
      "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-detail.webp",
      "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset3-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset1-hero.webp"
      },
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset2-hero.webp"
      },
      {
        "grid": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-grid.webp",
        "detail": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-detail.webp",
        "hero": "/Product-images/JadeTissueAppliqueSuitSet(LightPartyWear)/30JadeAppliqueSuitset4-hero.webp"
      }
    ]
  },
  {
    "id": "P014",
    "slug": "purple-tissue-front-slit-suit",
    "name": "Purple Tissue Front Slit Suit",
    "collections": [
      "Festive"
    ],
    "price": "$200",
    "priceNumeric": 200,
    "featured": true,
    "description": "Elevate your festive look with this stunning purple ombre suit, crafted with leheriya tissue. The suit's front slit paired with a pant-style bottom exudes a smart, polished look. Delicate floral patterns on the front and crepe dupatta adorned with intricate booties add a touch of elegance to this ensemble.",
    "material": "Tissue and Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted"
    ],
    "mainImage": {
      "grid": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit1-grid.webp",
      "detail": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit1-detail.webp",
      "hero": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit1-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit2-grid.webp",
        "detail": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit2-detail.webp",
        "hero": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit2-hero.webp"
      },
      {
        "grid": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit3-grid.webp",
        "detail": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit3-detail.webp",
        "hero": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit3-hero.webp"
      },
      {
        "grid": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit4-grid.webp",
        "detail": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit4-detail.webp",
        "hero": "/Product-images/PurpleTissueFrontSlitSuitSet(LightPartyWear)/20PurpleTissueFrontSlitSuit4-hero.webp"
      }
    ]
  },
  {
    "id": "P015",
    "slug": "sea-green-semi-crepe-suit-set",
    "name": "Sea Green Semi-Crepe Suit Set",
    "collections": [
      "Festive"
    ],
    "price": "$230",
    "priceNumeric": 230,
    "featured": true,
    "description": "Elevate your summer style with this stunning mint green suit, exclusively crafted from crepe and featuring a soothing colour palette ideal for any warm-weather celebration. The ensemble features bell sleeves and intricate sequin work on the sleeves and lower front hemline.",
    "material": "Crepe",
    "occasion": [
      "Festive"
    ],
    "fit": "Large",
    "tags": [
      "Festive",
      "Handcrafted"
    ],
    "mainImage": {
      "grid": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1500-Edit-grid.webp",
      "detail": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1500-Edit-detail.webp",
      "hero": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1500-Edit-hero.webp"
    },
    "additionalImages": [
      {
        "grid": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1508-Edit-grid.webp",
        "detail": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1508-Edit-detail.webp",
        "hero": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1508-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1516-Edit-grid.webp",
        "detail": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1516-Edit-detail.webp",
        "hero": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1516-Edit-hero.webp"
      },
      {
        "grid": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1539-Edit-grid.webp",
        "detail": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1539-Edit-detail.webp",
        "hero": "/Product-images/SeaGreenSemi-Crepesuitset(LightPartyWear)/DSCF1539-Edit-hero.webp"
      }
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

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.featured).slice(0, 4);
}

export function getRelatedProducts(product: Product): Product[] {
    return products.filter(p => {
        if (p.id === product.id) return false;
        const sameCollection = p.collections.some(c => product.collections.includes(c));
        const sameTag = p.tags.some(t => product.tags.includes(t));
        return sameCollection || sameTag;
    }).slice(0, 4);
}
