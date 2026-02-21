import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      size,
      quantity,
      message,
      productName,
      productPrice,
      productUrl,
    } = body;

    // Validate required fields
    if (!name || !email || !size || !quantity || !productName) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please contact us directly at farzana@fehmifarz.com.",
        },
        { status: 500 },
      );
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 12px;">
          New Product Enquiry
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;">Product</td>
            <td style="padding: 8px 0; font-weight: 600;">${productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Price</td>
            <td style="padding: 8px 0;">${productPrice}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Size</td>
            <td style="padding: 8px 0;">${size}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Quantity</td>
            <td style="padding: 8px 0;">${quantity}</td>
          </tr>
        </table>

        ${
          message
            ? `
        <div style="background: #f9f9f9; padding: 12px 16px; border-radius: 6px; margin: 16px 0;">
          <p style="color: #666; font-size: 12px; margin: 0 0 4px;">Message</p>
          <p style="margin: 0;">${message}</p>
        </div>
        `
            : ""
        }

        <h3 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 24px;">
          Customer Details
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin: 8px 0;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${
            phone
              ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          `
              : ""
          }
        </table>

        ${
          productUrl
            ? `
        <p style="margin-top: 16px; font-size: 13px;">
          <a href="${productUrl}" style="color: #666;">View Product →</a>
        </p>
        `
            : ""
        }
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Fehmi Farzana Designs <onboarding@resend.dev>",
        to: "farzana@fehmifarz.com",
        reply_to: email,
        subject: `New Enquiry: ${productName} — ${name}`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          error:
            "Failed to send email. Please try again or contact us directly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
