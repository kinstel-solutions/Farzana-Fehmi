"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/context/CartContext";
import { ArrowLeft } from "lucide-react";

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "919889988408";
    let message = `*New Order Request*\n`;
    message += `------------------\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.postalCode}\n`;
    message += `------------------\n`;
    message += `*Order Items:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity})\n`;
      message += `   Price: ${item.product.price}\n`;
      message += `   Link: ${window.location.origin}/product/${item.product.slug}\n\n`;
    });

    message += `------------------\n`;
    message += `Please confirm the availability and total price including shipping.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Optionally clear cart after creating order
    // clearCart();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-0 hover:bg-transparent -ml-2 mr-2">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Button>
        <h3 className="text-lg font-semibold">Checkout Details</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 overflow-y-auto px-1 pb-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Shipping Address *</Label>
          <Input
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Street Name, Area"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Mumbai"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="400001"
            />
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 uppercase tracking-wider text-xs">
            Place Order via WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
}
