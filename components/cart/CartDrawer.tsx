"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/CartContext";
import { useState, useEffect } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, cartOpen, setCartOpen } =
    useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");

  // Reset step when drawer closes
  useEffect(() => {
    if (!cartOpen) {
      setStep("cart");
    }
  }, [cartOpen]);

  const handleCheckoutClick = () => {
    setStep("checkout");
  };

  return (
    <Sheet
      open={cartOpen}
      onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        {step === "cart" ? (
          <>
            <SheetHeader>
              <SheetTitle className="uppercase tracking-widest text-center border-b pb-4">
                Shopping Bag ({items.length})
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
                <p className="text-gray-500">Your bag is empty.</p>
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(false)}
                  className="uppercase text-xs tracking-wider">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4">
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
                          {item.product.mainImage && (
                            <Image
                              src={item.product.mainImage.grid}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm uppercase tracking-wide line-clamp-2">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.product.price}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                                -
                              </button>
                              <span className="px-2 text-sm text-gray-600 min-w-[1.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100 text-gray-600">
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-base font-medium">
                      <span>Subtotal</span>
                      <span>Request Quote</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </div>
                  <Button
                    onClick={handleCheckoutClick}
                    className="w-full h-12 uppercase tracking-wider text-xs">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <CheckoutForm onBack={() => setStep("cart")} />
        )}
      </SheetContent>
    </Sheet>
  );
}
