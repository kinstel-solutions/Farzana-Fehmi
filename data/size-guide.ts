export interface SizeRow {
  size: string;
  [key: string]: string | number;
}

export interface SizeTable {
  title: string;
  columns: string[];
  rows: SizeRow[];
}

export const kurtaSizes: SizeTable = {
  title: "Kurta",
  columns: ["Size", "Bust", "Waist", "Hip", "Sleeve", "Length"],
  rows: [
    { size: "S", bust: 34, waist: 32, hip: 33, sleeve: 20, length: 45 },
    { size: "M", bust: 40, waist: 36, hip: 43, sleeve: 22, length: 46 },
    { size: "L", bust: 40, waist: 36, hip: 44, sleeve: 22, length: 39.5 },
    { size: "XL", bust: 45, waist: 40, hip: 48, sleeve: 16.5, length: 44 },
  ],
};

export const bottomSizes: SizeTable = {
  title: "Bottom/Pant",
  columns: ["Size", "Length", "Waist", "Flair"],
  rows: [
    { size: "S", length: 39, waist: 37, flair: 14 },
    { size: "M", length: 38, waist: 41.5, flair: 16 },
    { size: "L", length: 39.5, waist: 45, flair: 14 },
    { size: "XL", length: 40, waist: 50, flair: 21 },
  ],
};

export const sizeGuideNote = {
  setDescription: "Kurta, Pant, and Dupatta set.",
  lining: "100% viscose lining",
  disclaimer: "Fit may vary by style and personal preference.",
};

export const allSizeTables = [kurtaSizes, bottomSizes];
