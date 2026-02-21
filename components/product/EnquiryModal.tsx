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
import { Mail } from "lucide-react";

interface EnquiryModalProps {
  product: Product;
}

export function EnquiryModal({ product }: EnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    const productUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const subject = `Enquiry: ${product.name}`;
    const body = `Hi,\n\nI am interested in ${product.name}.\nQuantity: ${quantity}\nLink: ${productUrl}\n\nPlease get back to me with more details.\n\nThank you.`;
    const mailtoUrl = `mailto:farzana@fehmifarz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoUrl, "_self");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full md:w-auto min-w-[200px] uppercase tracking-wider text-xs">
          Enquire Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-widest text-center">
            Enquire About Product
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
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
              <h4 className="font-medium text-sm uppercase tracking-wide">
                {product.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="quantity"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleOrder}
            className="w-full uppercase tracking-wider text-xs gap-2">
            <Mail className="w-4 h-4" />
            Send Enquiry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
