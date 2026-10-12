const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const file = path.join(__dirname, '../src/utils/modelSelection.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const loaded = { exports: {} };
vm.runInNewContext(compiled.outputText, loaded, { filename: file });
const { sanitizeModelSelection } = loaded.exports;

assert.equal(sanitizeModelSelection(' SF24 '), 'SF24');
assert.equal(sanitizeModelSelection('SF24\r\nInjected'), 'SF24Injected');
assert.equal(sanitizeModelSelection('  \n '), undefined);
assert.equal(sanitizeModelSelection('A'.repeat(160)), 'A'.repeat(160));
assert.equal(sanitizeModelSelection('A'.repeat(158) + '😀'), 'A'.repeat(158) + '😀');
assert.equal(sanitizeModelSelection('A'.repeat(159) + '😀'), 'A'.repeat(159));
assert.equal(sanitizeModelSelection('SF24\ud800'), 'SF24\ufffd');
assert.equal(sanitizeModelSelection('SF24\udc00'), 'SF24\ufffd');
for (const input of ['A'.repeat(159) + '😀', '😀'.repeat(100), '\ud800', '灯具 / 曲线光']) {
  const model = sanitizeModelSelection(input);
  assert.ok(model.length <= 160);
  assert.equal(decodeURIComponent(encodeURIComponent(model)), model, 'Selection must survive URL/mailto encoding');
}
console.log('Model selection: Unicode boundaries, URL round trips, length and newline handling passed.');
