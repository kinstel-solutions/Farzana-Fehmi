"use client";

import { useState, useRef, useEffect } from "react";
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
  X,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/components/ui/Toaster";
import {
  EnquiryFormData,
  buildEnquiryMessage,
  handleInstagramDM,
  handleFacebookDM,
  submitEnquiryEmail,
} from "@/lib/enquiry";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface EnquiryModalProps {
  product: Product;
}

const SIZE_OPTIONS = ["S", "M", "L", "XL", "Custom"];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function EnquiryModal({ product }: EnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const isMobile = useIsMobile();

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
      setTimeout(resetForm, 300);
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

  const handleFacebook = async () => {
    const message = buildEnquiryMessage(product, form);
    const copied = await handleFacebookDM(message);
    if (copied) {
      showToast("Message copied! Paste it in your Facebook chat.", "info");
    }
  };

  const inputClasses =
    "flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50";

  // Shared form content
  const FormContent = () => (
    <>
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
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

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
            <span className="text-xs text-gray-400">or reach us directly</span>
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

            {/* Facebook */}
            <button
              onClick={handleFacebook}
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 text-center">
            Instagram &amp; Facebook will copy the enquiry to your clipboard and
            open our chat.
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Trigger button */}
      <Button
        size="lg"
        onClick={() => handleOpenChange(true)}
        className="w-full md:w-auto min-w-[200px] uppercase tracking-wider text-xs">
        Enquire Now
      </Button>

      {/* Mobile: Bottom Sheet Drawer */}
      {isMobile && (
        <MobileDrawer
          open={open}
          onClose={() => handleOpenChange(false)}>
          <FormContent />
        </MobileDrawer>
      )}

      {/* Desktop: Dialog */}
      {!isMobile && (
        <Dialog
          open={open}
          onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="uppercase tracking-widest text-center text-sm">
                Enquire About Product
              </DialogTitle>
            </DialogHeader>
            <FormContent />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// ─── Mobile Bottom Sheet Drawer ───────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  const dragY = useMotionValue(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { y: number }; offset: { y: number } },
  ) => {
    // Close if dragged down fast or far enough
    if (info.velocity.y > 300 || info.offset.y > 150) {
      onClose();
    } else {
      dragY.set(0);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col"
            style={{
              y: dragY,
              maxHeight: "92dvh",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}>
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b border-gray-100">
              <h2 className="text-xs uppercase tracking-widest font-medium">
                Enquire About Product
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div
              className="overflow-y-auto px-5 py-4 flex-1"
              // Prevent drag from triggering when scrolling inside
              onPointerDown={(e) => e.stopPropagation()}>
              {children}
              {/* Bottom safe area padding */}
              <div className="h-6" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
