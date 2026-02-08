import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

interface OrderBody {
  name: string;
  email: string;
  phone?: string;
  street: string;
  houseNumber: string;
  postcode: string;
  country: string;
  productId: string;
  productName: string;
  productPrice: number;
}

function buildCustomerEmailHtml(orderData: OrderBody & { reference: string; formattedPrice: string }) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>body{font-family:'Inter',sans-serif;line-height:1.6;color:#111}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#111;color:#fff;padding:30px;text-align:center}.content{background:#f9f9f9;padding:30px}.reference{font-size:24px;font-weight:bold;margin:20px 0}.details{background:#fff;padding:20px;margin:20px 0;border-left:3px solid #111}.footer{text-align:center;padding:20px;color:#666;font-size:12px}</style>
</head>
<body>
<div class="container">
<div class="header"><h1 style="margin:0;font-size:32px">Vielen Dank für Ihre Bestellung</h1></div>
<div class="content">
<p>Sehr geehrte/r ${orderData.name},</p>
<p>vielen Dank für Ihre Bestellung bei Architekt & Meister.</p>
<div class="details"><p class="reference">Referenznummer: ${orderData.reference}</p><p><strong>Produkt:</strong> ${orderData.productName}</p><p><strong>Preis:</strong> ${orderData.formattedPrice}</p></div>
<p>Wir werden Ihre Anfrage schnellstmöglich bearbeiten und uns in Kürze bei Ihnen melden.</p>
<p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
<p>Mit freundlichen Grüßen,<br>Architekt & Meister</p>
</div>
<div class="footer"><p>Architekt & Meister<br>Buchenstraße 20, 01097 Dresden<br>architektundmeister@gmail.com | +49 151 22807682</p></div>
</div>
</body>
</html>`;
}

function buildBusinessEmailHtml(orderData: OrderBody & { reference: string; formattedPrice: string }) {
  const phoneBlock = orderData.phone ? `<div class="section"><span class="label">Telefon:</span> <a href="tel:${orderData.phone}">${orderData.phone}</a></div>` : '';
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>body{font-family:'Inter',sans-serif;line-height:1.6;color:#111}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#111;color:#fff;padding:30px;text-align:center}.content{background:#f9f9f9;padding:30px}.reference{font-size:24px;font-weight:bold;margin:20px 0;color:#111}.details{background:#fff;padding:20px;margin:20px 0;border-left:3px solid #111}.section{margin:15px 0}.label{font-weight:bold;color:#666}</style>
</head>
<body>
<div class="container">
<div class="header"><h1 style="margin:0;font-size:32px">Neue Bestellung</h1></div>
<div class="content">
<p class="reference">Referenz: ${orderData.reference}</p>
<div class="details"><h2 style="margin-top:0">Produktinformationen</h2>
<div class="section"><span class="label">Produkt:</span> ${orderData.productName}</div>
<div class="section"><span class="label">Produkt-ID:</span> ${orderData.productId}</div>
<div class="section"><span class="label">Preis:</span> ${orderData.formattedPrice}</div></div>
<div class="details"><h2 style="margin-top:0">Kundeninformationen</h2>
<div class="section"><span class="label">Name:</span> ${orderData.name}</div>
<div class="section"><span class="label">E-Mail:</span> <a href="mailto:${orderData.email}">${orderData.email}</a></div>${phoneBlock}</div>
<div class="details"><h2 style="margin-top:0">Lieferadresse</h2>
<div class="section">${orderData.street} ${orderData.houseNumber}<br>${orderData.postcode} ${orderData.country}</div></div>
<p style="margin-top:30px;padding-top:20px;border-top:1px solid #ddd;color:#666;font-size:12px">Bestellt am: ${new Date().toLocaleString('de-DE', { dateStyle: 'long', timeStyle: 'short' })}</p>
</div>
</div>
</body>
</html>`;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const dbUrl = process.env.DATABASE_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const businessEmail = process.env.BUSINESS_EMAIL || 'architektundmeister@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = (process.env.FROM_NAME || 'ARCHITEKTUNDMEISTER').trim();
  const replyToEmail = process.env.REPLY_TO_EMAIL || 'architektundmeister@gmail.com';

  const fromHeader = fromName ? `"${fromName}" <${fromEmail}>` : fromEmail;

  if (!dbUrl) {
    return new Response(
      JSON.stringify({ success: false, error: 'DATABASE_URL is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  let body: OrderBody;
  try {
    body = (await request.json()) as OrderBody;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const { name, email, phone, street, houseNumber, postcode, country, productId, productName, productPrice } = body;
  if (!name || !email || !street || !houseNumber || !postcode || !country || !productId || !productName || productPrice == null) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const ref = `AM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const sql = neon(dbUrl);

  let orderId: string;
  try {
    const insertRows = await sql`
      INSERT INTO orders (reference, customer_name, customer_email, customer_phone, street, house_number, postcode, country, product_id, product_name, product_price, status)
      VALUES (${ref}, ${name}, ${email}, ${phone ?? null}, ${street}, ${houseNumber}, ${postcode}, ${country}, ${productId}, ${productName}, ${productPrice}, 'pending')
      RETURNING id
    `;
    const row = Array.isArray(insertRows) ? insertRows[0] : (insertRows as unknown as { id: string }[])[0];
    orderId = (row as { id: string }).id;
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : 'Database error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const formattedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(productPrice);
  const orderData = { ...body, reference: ref, formattedPrice };

  if (resendKey) {
    try {
      const customerEmailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: fromHeader,
          reply_to: replyToEmail,
          to: email,
          subject: `Bestätigung Ihrer Bestellung - ${ref}`,
          html: buildCustomerEmailHtml(orderData),
        }),
      });
    } catch {
      // ignore
    }
    try {
      const businessEmailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: fromHeader,
          reply_to: replyToEmail,
          to: businessEmail,
          subject: `Neue Bestellung: ${ref}`,
          html: buildBusinessEmailHtml(orderData),
        }),
      });
    } catch {
      // ignore
    }
  }

  return new Response(
    JSON.stringify({ success: true, reference: ref, orderId }),
    { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
  );
}
