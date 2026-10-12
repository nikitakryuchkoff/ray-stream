import { getCategory, imageSmall, type Product } from '../../data/catalog';
import { Arrow } from './Layout';
import { useSurfaceDepth } from '../../hooks/useSurfaceDepth';

export function ProductCard({ product }: { product: Product }) {
  const depth = useSurfaceDepth();
  return <a className="product-card" href={`/products/${product.id}`} {...depth}>
    <div className="product-image"><img src={imageSmall(product.images[0])} alt={`${product.model} ${product.name}`} loading="lazy" decoding="async" /></div>
    <div className="product-copy"><span className="eyebrow">{getCategory(product.category)?.name}</span><h3><span className="model-name">{product.model}</span><Arrow /></h3><p>{product.name}</p></div>
  </a>;
}
