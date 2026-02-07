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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center mb-2">Size Guide</DialogTitle>
          <DialogDescription className="text-center mb-4">
            All measurements are in centimeters (cm) and inches ("). For the best fit, match your measurements to the chart below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Size</th>
                <th scope="col" className="px-6 py-3">Bust</th>
                <th scope="col" className="px-6 py-3">Waist</th>
                <th scope="col" className="px-6 py-3">Hips</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">XS</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">81 cm</span>
                  <span className="text-gray-400 text-xs ml-2">32"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">61 cm</span>
                  <span className="text-gray-400 text-xs ml-2">24"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">86 cm</span>
                  <span className="text-gray-400 text-xs ml-2">34"</span>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">S</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">86 cm</span>
                  <span className="text-gray-400 text-xs ml-2">34"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">66 cm</span>
                  <span className="text-gray-400 text-xs ml-2">26"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">91 cm</span>
                  <span className="text-gray-400 text-xs ml-2">36"</span>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">M</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">91 cm</span>
                  <span className="text-gray-400 text-xs ml-2">36"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">71 cm</span>
                  <span className="text-gray-400 text-xs ml-2">28"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">96 cm</span>
                  <span className="text-gray-400 text-xs ml-2">38"</span>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">L</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">96 cm</span>
                  <span className="text-gray-400 text-xs ml-2">38"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">76 cm</span>
                  <span className="text-gray-400 text-xs ml-2">30"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">101 cm</span>
                  <span className="text-gray-400 text-xs ml-2">40"</span>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-medium text-gray-900">XL</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">101 cm</span>
                  <span className="text-gray-400 text-xs ml-2">40"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">81 cm</span>
                  <span className="text-gray-400 text-xs ml-2">32"</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">106 cm</span>
                  <span className="text-gray-400 text-xs ml-2">42"</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Fit may vary by style and personal preference.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
