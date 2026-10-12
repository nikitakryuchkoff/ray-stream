import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const raw = fs.readFileSync(path.join(root, 'src/data/catalog.json'), 'utf8');
const data = JSON.parse(raw);
assert.equal(data.categories.length, 7);
assert.equal(data.products.length, 214);
assert.equal(new Set(data.products.map(p => p.id)).size, data.products.length);
assert.ok(!/olympia|https?:|\.pdf|\.zip|download/i.test(raw), 'Public data must not contain source links/branding/downloads');
const categories = new Set(data.categories.map(c => c.id));
let rows=0;
let accessories=0;
for (const product of data.products) {
  assert.ok(categories.has(product.category), product.id);
  assert.ok(product.images.length, product.id);
  for (const image of product.images) {
    assert.ok(image.startsWith('/catalog/'), image);
    assert.ok(fs.existsSync(path.join(root, 'public', image)), image);
    assert.ok(fs.existsSync(path.join(root, 'public', image.replace('.webp','-600.webp'))), image);
  }
  for (const table of product.specs) {
    assert.ok(table.headers.length, product.id);
    for (const row of table.rows) assert.equal(row.length, table.headers.length, `${product.id}: ${table.title}`);
    rows += table.rows.length;
  }
  for (const accessory of product.accessories || []) {
    assert.ok(accessory.title, product.id);
    if (accessory.image) {
      assert.ok(accessory.image.startsWith('/catalog/'), accessory.image);
      assert.ok(fs.existsSync(path.join(root, 'public', accessory.image)), accessory.image);
      assert.ok(fs.existsSync(path.join(root, 'public', accessory.image.replace('.webp','-600.webp'))), accessory.image);
    }
    accessories++;
  }
}
for (const category of data.categories) assert.equal(category.count, data.products.filter(p=>p.category===category.id).length, category.id);
for (const id of data.newProducts) assert.ok(data.products.some(p=>p.id===id), id);
const mapped=JSON.parse(fs.readFileSync(path.join(root,'docs/migration-map.json'),'utf8'));
for (const entry of mapped.filter(e=>e.destination.startsWith('/products/'))) assert.ok(data.products.some(p=>entry.destination===`/products/${p.id}`), entry.destination);
assert.equal(rows,3804);
assert.equal(accessories,348);
console.log(`PASS: 7 categories, 214 unique cards, ${rows} table rows, ${accessories} published family accessory blocks, images/responsive versions, new collection, every source route mapped.`);
