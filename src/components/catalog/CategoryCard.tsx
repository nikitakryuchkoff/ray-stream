import { imageSmall, type Category } from '../../data/catalog';
import { useSurfaceDepth } from '../../hooks/useSurfaceDepth';
import { Arrow } from './Layout';

export function CategoryCard({ category }: { category: Category }) {
  const depth = useSurfaceDepth();
  return <a className="category-card" href={`/catalog/${category.id}`} {...depth}>
    <div className="category-visual"><img src={imageSmall(category.image)} alt={category.name} loading="lazy" decoding="async" /></div>
    <h3>{category.name}<Arrow /></h3><p>{category.description}</p>
  </a>;
}
