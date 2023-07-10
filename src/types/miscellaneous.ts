export interface CategoryDetails {
  id: number;
  productCategoryId: number;
  name: string;
  description: string;
  url: string;
  backgroundUrl: string;
  subCategory1: SubCategory[];
  brand: Brand[];
}

interface SubCategory {
  id: number;
  name: string;
  url: string;
  subCategory2: SubCategory2[];
}

interface SubCategory2 {
  id: number;
  name: string;
  url: string;
}

interface Brand {
  mainCategoryId: number;
  brandId: number;
  brandName: string;
  url: string;
  logoUrl: string | null;
  description: string | null;
}
