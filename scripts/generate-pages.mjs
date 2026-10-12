import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'src/data/catalog.json'),'utf8'));
const base='https://raystream.hk';
const homeDescription='Architectural lighting, flexible linear systems, wall grazers and controls. Explore equipment and discuss your project with Raystream.';
const pages=[
  {route:'/',title:'Raystream — Light, shaped around architecture.',description:homeDescription,image:'/catalog/architecture-0.webp'},
  {route:'/catalog',title:'Lighting catalogue | Raystream',description:'Explore silicone and PVC linear flex, flexible video lighting, wall grazers, connections, mounting and control systems.',image:'/catalog/sf24-0.webp'},
  {route:'/catalog/new',title:'New products | Raystream',description:'Discover new flexible lighting and wall grazing equipment for your project.',image:'/catalog/sfp16-0.webp'},
  {route:'/contact',title:'Contact & project enquiry | Raystream',description:'Discuss your selected lighting equipment with Raystream. Send your project enquiry to info@raystream.hk.',image:'/catalog/architecture-0.webp'},
  {route:'/applications',title:'Lighting applications | Raystream',description:'Explore linear and wall grazing light for facades, interiors, landscapes and integrated details.',image:'/catalog/architecture-0.webp'},
  ...data.categories.map(c=>({route:`/catalog/${c.id}`,title:`${c.name} | Raystream`,description:c.description,image:c.image})),
  ...data.products.map(p=>({route:`/products/${p.id}`,title:`${p.name.startsWith(p.model)?p.name:`${p.model} — ${p.name}`} | Raystream`,description:p.summary,image:p.images[0],product:p}))
];
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const template=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const assetOrigin=template.match(/<script\b[^>]*src="(https:\/\/[^/"<>]+)\/assets\//i)?.[1] || base;
for (const page of pages) {
  const canonical=base+page.route;
  const imageUrl=new URL(page.image,assetOrigin).href;
  const schema={'@context':'https://schema.org','@type':'WebPage',name:page.title,url:canonical,description:page.description,isPartOf:{'@type':'WebSite',name:'Raystream',url:base+'/'},...(page.product?{mainEntity:{'@type':'Product',name:page.product.name,model:page.product.model,description:page.description,image:imageUrl,url:canonical}}:{})};
  const metadata=`<title>${escape(page.title)}</title>\n<meta name="description" content="${escape(page.description)}">\n<link rel="canonical" href="${canonical}">\n<meta property="og:site_name" content="Raystream">\n<meta property="og:type" content="${page.product?'product':'website'}">\n<meta property="og:title" content="${escape(page.title)}">\n<meta property="og:description" content="${escape(page.description)}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:image" content="${imageUrl}">\n<meta name="twitter:card" content="summary_large_image">\n<script type="application/ld+json" id="page-schema">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
  const html=template.replace(/<title>[\s\S]*?<\/title>/i,'').replace(/<meta\b[^>]*(?:name=["'](?:description|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi,'').replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi,'').replace(/<script\b[^>]*id=["']page-schema["'][^>]*>[\s\S]*?<\/script>/gi,'').replace('</head>',metadata+'\n</head>');
  const folder=path.join(root,'dist',page.route);
  fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),html);
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${base+p.route}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root,'public/sitemap.xml'),sitemap);
fs.writeFileSync(path.join(root,'dist/sitemap.xml'),sitemap);
fs.writeFileSync(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
fs.copyFileSync(path.join(root,'public/robots.txt'),path.join(root,'dist/robots.txt'));
console.log(`Generated ${pages.length} page entry documents and canonical sitemap for raystream.hk.`);
