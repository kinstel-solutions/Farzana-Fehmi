"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/lib/cms/types";
import { Minus, Plus } from "lucide-react";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center border border-gray-200 rounded-sm w-32">
        <button
          onClick={handleDecrease}
          className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          disabled={quantity <= 1}>
          <Minus className="w-4 h-4" />
        </button>
        <div className="flex-1 h-11 flex items-center justify-center font-medium text-sm border-x border-gray-200">
          {quantity}
        </div>
        <button
          onClick={handleIncrease}
          className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <Button
        onClick={handleAddToCart}
        size="lg"
        variant="outline"
        className="flex-1 md:flex-none min-w-[200px] uppercase tracking-wider text-xs h-11 border-black hover:bg-black hover:text-white transition-all">
        Add to Bag
      </Button>
    </div>
  );
}
