export interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  main_image: string | null;
  features: string[];
  images: PropertyImage[];
  type: string
  description: string
  is_published: boolean;
  created_at: string;
}
export interface PropertiesResult {
  properties: Property[]
  total: number
  page: number
  pages: number
}

export interface PropertiesSlugResult {
  properties: Property
  total: number
  page: number
  pages: number
}
interface PropertyImage {
  id: number;
  image: string;
  is_main: boolean;
}

