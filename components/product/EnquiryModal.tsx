"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/cms/types";
import {
  Mail,
  Instagram,
  MessageCircle,
  Facebook,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toaster";
import {
  EnquiryFormData,
  buildEnquiryMessage,
  handleInstagramDM,
  submitEnquiryEmail,
} from "@/lib/enquiry";

interface EnquiryModalProps {
  product: Product;
}

const SIZE_OPTIONS = ["S", "M", "L", "XL", "Custom"];

export function EnquiryModal({ product }: EnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const [form, setForm] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    size: "M",
    quantity: 1,
    message: "",
  });

  const updateField = (
    field: keyof EnquiryFormData,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const isFormValid = form.name.trim() && form.email.trim() && form.size;

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      size: "M",
      quantity: 1,
      message: "",
    });
    setSubmitted(false);
    setError(null);
    setLoading(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset after close animation
      setTimeout(resetForm, 200);
    }
  };

  const handleEmailSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError(null);

    const result = await submitEnquiryEmail(product, form);

    if (result.success) {
      setSubmitted(true);
      showToast("Enquiry sent successfully!");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleInstagram = async () => {
    const message = buildEnquiryMessage(product, form);
    const copied = await handleInstagramDM(message);
    if (copied) {
      showToast("Message copied! Paste it in your Instagram chat.", "info");
    }
  };

  const inputClasses =
    "flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full md:w-auto min-w-[200px] uppercase tracking-wider text-xs">
          Enquire Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-widest text-center text-sm">
            Enquire About Product
          </DialogTitle>
        </DialogHeader>

        {/* Product Preview */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
            {product.mainImage && (
              <Image
                src={product.mainImage.grid}
                alt={product.name}
                fill
                className="object-cover object-top"
              />
            )}
          </div>
          <div>
            <h4 className="font-medium text-sm">{product.name}</h4>
            <p className="text-sm text-gray-500 mt-0.5">{product.price}</p>
          </div>
        </div>

        {submitted ? (
          /* Success State */
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Thank You!</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Your enquiry has been sent. We&apos;ll get back to you within 24
                hours.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
              className="uppercase tracking-wider text-xs mt-4">
              Close
            </Button>
          </div>
        ) : (
          /* Form */
          <div className="space-y-5 pt-2">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="enquiry-name"
                  className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="enquiry-email"
                  className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor="enquiry-phone"
                className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                Phone{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                placeholder="+61 400 000 000"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Size & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="enquiry-size"
                  className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Size <span className="text-red-400">*</span>
                </label>
                <select
                  id="enquiry-size"
                  value={form.size}
                  onChange={(e) => updateField("size", e.target.value)}
                  className={inputClasses}>
                  {SIZE_OPTIONS.map((s) => (
                    <option
                      key={s}
                      value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="enquiry-qty"
                  className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Quantity
                </label>
                <input
                  id="enquiry-qty"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) =>
                    updateField("quantity", parseInt(e.target.value) || 1)
                  }
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="enquiry-message"
                className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                Message{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="enquiry-message"
                placeholder="Any special requests or questions..."
                rows={3}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={`${inputClasses} h-auto resize-none`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Primary Submit */}
            <Button
              onClick={handleEmailSubmit}
              disabled={!isFormValid || loading}
              className="w-full uppercase tracking-wider text-xs gap-2">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              {loading ? "Sending..." : "Submit Enquiry"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">
                or reach us directly
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Channels */}
            <div className="flex justify-center gap-3">
              {/* WhatsApp — disabled until business number */}
              <button
                disabled
                title="Coming soon"
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 text-sm text-gray-300 cursor-not-allowed">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagram}
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </button>

              {/* Facebook — disabled until page URL is provided */}
              <button
                disabled
                title="Coming soon"
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 text-sm text-gray-300 cursor-not-allowed">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center">
              Instagram will copy the enquiry message to your clipboard and open
              our DM.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
