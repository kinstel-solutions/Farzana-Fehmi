import { Product } from "@/lib/cms/types";

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  size: string;
  quantity: number;
  message: string;
}

const INSTAGRAM_USERNAME = "fehmifarzanadesigns";
const ENQUIRY_EMAIL = "farzana@fehmifarz.com";

/**
 * Builds a formatted enquiry message from product + form data
 */
export function buildEnquiryMessage(
  product: Product,
  form: EnquiryFormData,
): string {
  const lines = [
    `Hi, I'd like to enquire about:`,
    ``,
    `Product: ${product.name}`,
    `Price: ${product.price}`,
    `Size: ${form.size}`,
    `Quantity: ${form.quantity}`,
  ];

  if (form.message) {
    lines.push(``, `Note: ${form.message}`);
  }

  lines.push(``, `— ${form.name}`, form.email);

  if (form.phone) {
    lines.push(form.phone);
  }

  return lines.join("\n");
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
}

/**
 * Open Instagram DM — copies message to clipboard first since IG doesn't support prefilled DMs
 */
export async function handleInstagramDM(message: string): Promise<boolean> {
  const copied = await copyToClipboard(message);
  window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`, "_blank");
  return copied;
}

/**
 * Open WhatsApp with prefilled message (ready for when business number is added)
 */
export function handleWhatsApp(message: string, phoneNumber?: string): void {
  if (!phoneNumber) return;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/**
 * Submit enquiry via the API route (Resend)
 */
export async function submitEnquiryEmail(
  product: Product,
  formData: EnquiryFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        size: formData.size,
        quantity: formData.quantity,
        message: formData.message || undefined,
        productName: product.name,
        productPrice: product.price,
        productUrl: typeof window !== "undefined" ? window.location.href : "",
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
