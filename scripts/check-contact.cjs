const assert = require('node:assert/strict');
const handler = require('../api/contact.js');
const originalFetch = global.fetch;
const saved = { ...process.env };
async function call(method, body) {
  const res = { code: 200, headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(value) { this.body=value; return this; } };
  await handler({ method, body }, res);
  return res;
}
(async () => {
  try {
    const enquiry = { name: 'Test Person', email: 'test@example.com', message: 'Please confirm project compatibility.', model: 'SF24' };
    assert.equal((await call('GET')).code, 405);
    assert.equal((await call('POST', '{')).code, 400);
    assert.equal((await call('POST', { ...enquiry, email: 'invalid' })).code, 422);
    assert.equal((await call('POST', { ...enquiry, model: 'SF24\r\nInjected' })).code, 422);
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM;
    assert.equal((await call('POST', enquiry)).code, 503);
    process.env.RESEND_API_KEY = 'test-only-placeholder';
    process.env.CONTACT_FROM = 'Raystream <no-reply@raystream.hk>';
    delete process.env.CONTACT_EMAIL;
    let sent;
    global.fetch = async (url, options) => { sent=JSON.parse(options.body); assert.equal(url, 'https://api.resend.com/emails'); return { ok: true }; };
    const accepted = await call('POST', enquiry);
    assert.equal(accepted.code, 200);
    assert.equal(accepted.body.ok, true);
    assert.equal(sent.to, 'info@raystream.hk');
    assert.equal(sent.reply_to, enquiry.email);
    assert.ok(sent.subject.includes('SF24'));
    assert.ok(sent.text.includes('Selected equipment: SF24'));
    global.fetch = async () => ({ ok: false });
    assert.equal((await call('POST', enquiry)).code, 502);
    console.log('PASS: method, JSON, validation, model injection, missing configuration, recipient/model payload, provider acceptance and provider failure. No real email sent.');
  } finally { global.fetch=originalFetch; process.env=saved; }
})().catch(error => { console.error(error); process.exitCode=1; });
