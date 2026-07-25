export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { email, name, phone, tag, source, path } = req.body || {};
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }
    const token = process.env.GHL_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) return res.status(500).json({ error: 'Server not configured' });

    const nameParts = (name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const tags = ['website-lead'];
    if (tag) tags.push(String(tag).slice(0, 60));

    const body = {
      locationId,
      email: String(email).toLowerCase().trim(),
      firstName,
      lastName,
      tags,
      source: source || 'ycotw.com',
    };
    if (phone) body.phone = String(phone).trim();
    if (path) {
      body.customFields = [{ key: 'survey_path', field_value: String(path).slice(0, 500) }];
    }

    const r = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('GHL error', r.status, data);
      return res.status(502).json({ error: 'CRM upsert failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('lead handler error', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}
