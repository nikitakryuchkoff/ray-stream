module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  let payload;
  try { payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ ok: false, error: 'Invalid JSON' }); }
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const name = clean(payload?.name), email = clean(payload?.email), message = clean(payload?.message);
  const model = clean(payload?.model);
  if (name.length < 2 || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !message || message.length > 400 || model.length > 160 || /[\r\n]/.test(model)) {
    return res.status(422).json({ ok: false, error: 'Invalid form fields' });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) {
    return res.status(503).json({ ok: false, error: 'Email delivery is not configured' });
  }
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: process.env.CONTACT_EMAIL || 'info@raystream.hk', reply_to: email,
        subject: model ? `Raystream enquiry: ${model}` : 'New Raystream website enquiry',
        text: `Name: ${name}\nEmail: ${email}\nSelected equipment: ${model || 'General enquiry'}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) throw new Error('Email provider rejected request');
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'Email delivery failed' });
  }
};
