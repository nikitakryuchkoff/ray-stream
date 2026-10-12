import { useState } from 'react';
import { ChevronDown, ChevronUp } from '../components/catalog/Icons';
import { enquiryUrl, getCategory, imageSmall, products, type Product, type Specification } from '../data/catalog';
import { Breadcrumb, ButtonLink, ProjectCTA, TextLink } from '../components/catalog/Layout';
import { ProductCard } from '../components/catalog/ProductCard';

function SpecificationTable({ spec, index }: { spec: Specification; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const regionId = `specification-${index}`;
  const numericColumns = spec.headers.map((_, column) => spec.rows.length > 0 && spec.rows.every(row => /^\d+(?:[.,]\d+)?$/.test(row[column]?.trim() || '')));
  return <div className="spec-group"><h3 id={`${regionId}-heading`}>{spec.title}<span>{spec.rows.length} options</span></h3><div id={regionId} className="table-scroll" tabIndex={0} role="region" aria-labelledby={`${regionId}-heading`}><table><thead><tr>{spec.headers.map((heading, cell) => <th key={cell} scope="col" className={numericColumns[cell] ? 'numeric' : undefined}>{heading}</th>)}</tr></thead><tbody>{(expanded ? spec.rows : spec.rows.slice(0, 6)).map((row, position) => <tr key={position}>{row.map((cell, column) => <td key={column} className={numericColumns[column] ? 'numeric' : undefined}>{cell}</td>)}</tr>)}</tbody></table></div><p className="table-help">Scroll horizontally to view the full specification table.</p>{spec.rows.length > 6 && <button className="spec-show" aria-expanded={expanded} aria-controls={regionId} onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer configurations' : `Show all ${spec.rows.length} configurations`}{expanded ? <ChevronUp className="icon" aria-hidden="true" /> : <ChevronDown className="icon" aria-hidden="true" />}</button>}</div>;
}
function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const application = product.id === 'sf24' && selected === 1;
  return <div className="product-gallery"><div className="gallery-main"><img src={product.images[selected]} alt={application ? 'Application example: linear light in a swimming pool' : `${product.model} equipment view ${selected + 1}`} loading="eager" /><span className="photo-count">{String(selected + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}</span></div><p className="gallery-caption" aria-live="polite">{application ? 'Application example - reference installation.' : `${product.model} equipment view.`}</p><div className="gallery-thumbs" role="group" aria-label={`${product.model} images`}>{product.images.map((image, index) => <button key={`${image}-${index}`} aria-label={`View ${product.model} image ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><img src={imageSmall(image)} alt="" loading="lazy" /></button>)}</div></div>;
}
function FamilyAccessories({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const accessories = product.accessories || [];
  if (!accessories.length) return null;
  const listId = `accessories-${product.id}`;
  const toggleExpanded = () => {
    setExpanded(value => !value);
    if (expanded) requestAnimationFrame(() => document.getElementById(`${listId}-section`)?.scrollIntoView({ block: 'start' }));
  };
  return <section className="accessories" id={`${listId}-section`} aria-labelledby={`${listId}-heading`}>
    <div className="section-heading">
      <h2 id={`${listId}-heading`}>Accessories for this family.</h2>
      <p>Explore the accessories listed with this family. Confirm your final configuration with Raystream.</p>
    </div>
    <div className="accessory-grid" id={listId}>
      {(expanded ? accessories : accessories.slice(0, 3)).map((accessory, index) => <article className="accessory-card" key={`${accessory.title}-${index}`}>
        {accessory.image && <img src={imageSmall(accessory.image)} alt={accessory.title} loading="lazy" />}
        {accessory.group && <p className="accessory-group">{accessory.group}</p>}
        <h3>{accessory.title}</h3>
        {accessory.description && <p>{accessory.description}</p>}
        <TextLink href={enquiryUrl(`${product.model} / ${accessory.title}`)}>Enquire about this accessory</TextLink>
      </article>)}
    </div>
    {accessories.length > 3 && <button className="spec-show accessory-show" aria-expanded={expanded} aria-controls={listId} onClick={toggleExpanded}>
      {expanded ? 'Show fewer accessories' : `Show all ${accessories.length} accessories`}
      {expanded ? <ChevronUp className="icon" aria-hidden="true" /> : <ChevronDown className="icon" aria-hidden="true" />}
    </button>}
  </section>;
}
export function ProductPage({ product }: { product: Product }) {
  const category = getCategory(product.category)!;
  const related = products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3);
  const fullName = product.name.replace(product.model, '').trim();
  return <>
    <Breadcrumb items={[{ label: 'Catalog', href: '/catalog' }, { label: category.name, href: `/catalog/${category.id}` }, { label: product.model }]} />
    <section className="product-intro"><ProductGallery product={product} /><div className="product-info"><span className="eyebrow">{category.name}</span><h1 className={product.model.length > 12 ? 'long-model' : undefined}>{product.model}</h1><h2 className="product-fullname">{fullName || product.name}</h2><p>{product.summary}</p>{product.id === 'sf24' && <div className="spec-highlights"><div className="spec-highlight"><span>Input voltage</span><strong>24V</strong></div><div className="spec-highlight"><span>Power per metre</span><strong>16W</strong></div><div className="spec-highlight"><span>CRI (white options)</span><strong>80+</strong></div></div>}<ButtonLink href={enquiryUrl(product.model)} wrap>Enquire about {product.model}</ButtonLink><p className="small-note">Share your application. We'll help you choose the configuration.</p></div></section>
    <nav className="product-subnav" aria-label="On this page"><a href="#technical">Technical details</a><a href="#complete-system">Complete the system</a><a href="#related">Related equipment</a></nav>
    <section className="technical" id="technical"><div className="technical-heading"><h2>Technical details.</h2><p>Explore the available configurations. Confirm your selected specification with Raystream before ordering.</p></div>{product.specs.length ? product.specs.map((spec, index) => <SpecificationTable key={index} spec={spec} index={index} />) : <p>Please contact Raystream for configuration details for this equipment.</p>}</section>
    <FamilyAccessories product={product} />
    <section className="system-row" id="complete-system"><h2>Every detail,<br />working together.</h2><div><span>01 / INSTALLATION</span><h3>Mounting & connections</h3><p>Explore mounting profiles and connectors to integrate light into your design.</p><TextLink href="/catalog/mounting">View mounting</TextLink></div><div><span>02 / CONTROL</span><h3>Power & control</h3><p>Choose the components for your lighting system with Raystream.</p><TextLink href="/catalog/control">View control & power</TextLink></div></section>
    <section id="related" className="related"><div className="section-heading"><h2>More in this family.</h2><TextLink href={`/catalog/${category.id}`}>View all {category.name}</TextLink></div><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div></section><ProjectCTA model={product.model} />
  </>;
}
