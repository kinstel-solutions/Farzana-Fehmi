'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 uppercase tracking-wide text-xs">
          <Ruler className="h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center mb-2">Suit Measurements</DialogTitle>
          <DialogDescription className="text-center mb-4">
            All measurements are in inches.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Kurta Table */}
          <div>
            <h3 className="text-lg font-medium text-center mb-4 font-serif">Kurta</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Size</th>
                    <th scope="col" className="px-4 py-3">Bust</th>
                    <th scope="col" className="px-4 py-3">Waist</th>
                    <th scope="col" className="px-4 py-3">Hip</th>
                    <th scope="col" className="px-4 py-3">Sleeve</th>
                    <th scope="col" className="px-4 py-3">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">S</td>
                    <td className="px-4 py-3">34"</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">33"</td>
                    <td className="px-4 py-3">20"</td>
                    <td className="px-4 py-3">45"</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">M</td>
                    <td className="px-4 py-3">40"</td>
                    <td className="px-4 py-3">36"</td>
                    <td className="px-4 py-3">43"</td>
                    <td className="px-4 py-3">22"</td>
                    <td className="px-4 py-3">46"</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">L</td>
                    <td className="px-4 py-3">40"</td>
                    <td className="px-4 py-3">36"</td>
                    <td className="px-4 py-3">44"</td>
                    <td className="px-4 py-3">22"</td>
                    <td className="px-4 py-3">39.5"</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">XL</td>
                    <td className="px-4 py-3">45"</td>
                    <td className="px-4 py-3">40"</td>
                    <td className="px-4 py-3">48"</td>
                    <td className="px-4 py-3">16.5"</td>
                    <td className="px-4 py-3">44"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom/Pant Table */}
          <div>
            <h3 className="text-lg font-medium text-center mb-4 font-serif">Bottom/Pant</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Size</th>
                    <th scope="col" className="px-6 py-3">Length</th>
                    <th scope="col" className="px-6 py-3">Waist</th>
                    <th scope="col" className="px-6 py-3">Flair</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">S</td>
                    <td className="px-6 py-4">39"</td>
                    <td className="px-6 py-4">37"</td>
                    <td className="px-6 py-4">14"</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">M</td>
                    <td className="px-6 py-4">38"</td>
                    <td className="px-6 py-4">41.5"</td>
                    <td className="px-6 py-4">16"</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">L</td>
                    <td className="px-6 py-4">39.5"</td>
                    <td className="px-6 py-4">45"</td>
                    <td className="px-6 py-4">14"</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium text-gray-900">XL</td>
                    <td className="px-6 py-4">40"</td>
                    <td className="px-6 py-4">50"</td>
                    <td className="px-6 py-4">21"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 text-center space-y-2">
          <p className="font-medium">
            Kurta, Pant, and Dupatta set.
          </p>
          <p>
            100% viscose lining
          </p>
          <p className="text-xs text-gray-400 mt-4">Fit may vary by style and personal preference.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
