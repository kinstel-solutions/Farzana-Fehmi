"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toaster";
import { Loader2, CheckCircle } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTime = useRef(0);
  const [jsVerified, setJsVerified] = useState(false);
  const { showToast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    startTime.current = Date.now();
    // Mark as JS-capable after a short delay
    const timer = setTimeout(() => setJsVerified(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Enquiry",
    message: "",
    _fax_number: "",
    _js_verification: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError(null);

    if (form._fax_number) {
      // Quietly "succeed" for bots
      setSubmitted(true);
      return;
    }

    // Check if JS verification happened
    if (!jsVerified) {
      setError("Please ensure JavaScript is enabled.");
      setLoading(false);
      return;
    }

    // Check if submitted too fast (reduced to 1 second for autofill)
    if (startTime.current > 0 && Date.now() - startTime.current < 1000) {
      setError("Please wait a moment before sending.");
      setLoading(false);
      return;
    }

    if (!executeRecaptcha) {
      setError("reCAPTCHA is not ready. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _js_verification: "human_verified", // Inject the value on submission
          recaptchaToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      showToast("Message sent successfully!");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="font-medium text-lg">Thank You!</h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Your message has been sent. We&apos;ll get back to you as soon as
          possible.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              subject: "General Enquiry",
              message: "",
              _fax_number: "",
              _js_verification: "",
            });
            startTime.current = Date.now();
            setJsVerified(false);
            setTimeout(() => setJsVerified(true), 100);
          }}
          className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-900 transition-colors mt-2">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}>
      <form
        className="space-y-6"
        onSubmit={handleSubmit}>
        <input
          type="text"
          name="_fax_number"
          value={form._fax_number}
          onChange={(e) => updateField("_fax_number", e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-wider text-gray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent"
            placeholder="Your Name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-wider text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-xs uppercase tracking-wider text-gray-500">
            Subject
          </label>
          <select
            id="subject"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent">
            <option>General Enquiry</option>
            <option>Appointment Request</option>
            <option>Custom Order</option>
            <option>Press &amp; Media</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs uppercase tracking-wider text-gray-500">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors bg-transparent resize-none"
            placeholder="How can we assist you?"></textarea>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full uppercase tracking-widest gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </motion.div>
  );
}
