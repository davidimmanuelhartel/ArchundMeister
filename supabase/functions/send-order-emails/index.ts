import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const BUSINESS_EMAIL = Deno.env.get("BUSINESS_EMAIL") || "architektundmeister@gmail.com";
// Update this to your verified domain email address (e.g., "noreply@yourdomain.com")
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "noreply@architekturundmeister.de";

interface OrderData {
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  street: string;
  house_number: string;
  postcode: string;
  country: string;
  product_name: string;
  product_price: number;
  product_id: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Get order data from request
    const requestBody = await req.json();
    const orderData: OrderData = requestBody as OrderData;

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Format price
    const formattedPrice = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(orderData.product_price);

    // Customer confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #111; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #111; color: #fff; padding: 30px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .reference { font-size: 24px; font-weight: bold; margin: 20px 0; }
            .details { background-color: #fff; padding: 20px; margin: 20px 0; border-left: 3px solid #111; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Vielen Dank für Ihre Bestellung</h1>
            </div>
            <div class="content">
              <p>Sehr geehrte/r ${orderData.customer_name},</p>
              <p>vielen Dank für Ihre Bestellung bei Architekt & Meister.</p>
              
              <div class="details">
                <p class="reference">Referenznummer: ${orderData.reference}</p>
                <p><strong>Produkt:</strong> ${orderData.product_name}</p>
                <p><strong>Preis:</strong> ${formattedPrice}</p>
              </div>

              <p>Wir werden Ihre Anfrage schnellstmöglich bearbeiten und uns in Kürze bei Ihnen melden.</p>
              
              <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
              
              <p>Mit freundlichen Grüßen,<br>Architekt & Meister</p>
            </div>
            <div class="footer">
              <p>Architekt & Meister<br>Buchenstraße 20, 01097 Dresden<br>architektundmeister@gmail.com | +49 151 22807682</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Business notification email
    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #111; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #111; color: #fff; padding: 30px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .reference { font-size: 24px; font-weight: bold; margin: 20px 0; color: #111; }
            .details { background-color: #fff; padding: 20px; margin: 20px 0; border-left: 3px solid #111; }
            .section { margin: 15px 0; }
            .label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Neue Bestellung</h1>
            </div>
            <div class="content">
              <p class="reference">Referenz: ${orderData.reference}</p>
              
              <div class="details">
                <h2 style="margin-top: 0;">Produktinformationen</h2>
                <div class="section">
                  <span class="label">Produkt:</span> ${orderData.product_name}
                </div>
                <div class="section">
                  <span class="label">Produkt-ID:</span> ${orderData.product_id}
                </div>
                <div class="section">
                  <span class="label">Preis:</span> ${formattedPrice}
                </div>
              </div>

              <div class="details">
                <h2 style="margin-top: 0;">Kundeninformationen</h2>
                <div class="section">
                  <span class="label">Name:</span> ${orderData.customer_name}
                </div>
                <div class="section">
                  <span class="label">E-Mail:</span> <a href="mailto:${orderData.customer_email}">${orderData.customer_email}</a>
                </div>
                ${orderData.customer_phone ? `<div class="section"><span class="label">Telefon:</span> <a href="tel:${orderData.customer_phone}">${orderData.customer_phone}</a></div>` : ''}
              </div>

              <div class="details">
                <h2 style="margin-top: 0;">Lieferadresse</h2>
                <div class="section">
                  ${orderData.street} ${orderData.house_number}<br>
                  ${orderData.postcode} ${orderData.country}
                </div>
              </div>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                Bestellt am: ${new Date().toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short" })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation email
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: orderData.customer_email,
        subject: `Bestätigung Ihrer Bestellung - ${orderData.reference}`,
        html: customerEmailHtml,
      }),
    });

    if (!customerEmailResponse.ok) {
      const errorText = await customerEmailResponse.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        errorJson = { message: errorText };
      }
      console.error("Failed to send customer email:", errorText);
      console.error("Customer email error details:", errorJson);
      // Don't throw - continue to send business email even if customer email fails
    }

    // Send business notification email
    const businessEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        subject: `Neue Bestellung: ${orderData.reference}`,
        html: businessEmailHtml,
      }),
    });

    if (!businessEmailResponse.ok) {
      const errorText = await businessEmailResponse.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        errorJson = { message: errorText };
      }
      console.error("Failed to send business email:", errorText);
      console.error("Business email error details:", errorJson);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        stack: errorStack,
        details: "Check Supabase Edge Function logs for more information",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

