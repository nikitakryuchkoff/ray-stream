import raw from './catalog.json';
import { sanitizeModelSelection } from '../utils/modelSelection';

export interface Category { id: string; name: string; description: string; image: string; count: number }
export interface Specification { title: string; headers: string[]; rows: string[][] }
export interface Accessory { title: string; description: string; group: string; image?: string }
export interface Product { id: string; model: string; name: string; category: string; summary: string; images: string[]; specs: Specification[]; accessories?: Accessory[] }
export const categories: Category[] = raw.categories;
export const products: Product[] = raw.products;
export const newProducts: string[] = raw.newProducts;
const categoryMap = new Map(categories.map(category => [category.id, category]));
const productMap = new Map(products.map(product => [product.id, product]));
export const getCategory = (id: string) => categoryMap.get(id);
export const getProduct = (id: string) => productMap.get(id);
export const enquiryUrl = (model?: string) => {
  const selected = sanitizeModelSelection(model);
  return selected ? `/contact?model=${encodeURIComponent(selected)}` : '/contact';
};
export const imageSmall = (path: string) => path.replace(/\.webp$/, '-600.webp');
