import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please email us directly at farzana@fehmifarz.com.",
        },
        { status: 500 },
      );
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 12px;">
          New Contact Form Message
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 100px;">From</td>
            <td style="padding: 8px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Subject</td>
            <td style="padding: 8px 0;">${subject || "General Enquiry"}</td>
          </tr>
        </table>

        <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <p style="color: #666; font-size: 12px; margin: 0 0 8px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "fehmi farzana designs <no-reply@fehmifarz.com>",
        to: ["kinstelsolutions@gmail.com"],
        reply_to: email,
        subject: `Contact: ${subject || "General Enquiry"} — ${name}`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          error:
            "Failed to send message. Please try again or email us directly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
