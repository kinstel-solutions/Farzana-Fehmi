"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";
import { allSizeTables, sizeGuideNote } from "@/data/size-guide";

type Unit = "in" | "cm";

function formatMeasurement(value: string | number, unit: Unit): string {
  if (typeof value === "string") return value;
  if (unit === "in") return `${value}"`;
  return `${Math.round(value * 2.54)} cm`;
}

export function SizeGuide() {
  const [unit, setUnit] = useState<Unit>("in");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 uppercase tracking-wide text-xs">
          <Ruler className="h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle className="font-sans text-xl sm:text-2xl text-center mb-1">
            Suit Measurements
          </DialogTitle>
          <DialogDescription className="text-center mb-2 text-xs sm:text-sm">
            Select your preferred unit of measurement.
          </DialogDescription>
        </DialogHeader>

        {/* Unit toggle */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex rounded-md border border-gray-200 overflow-hidden text-sm">
            <button
              onClick={() => setUnit("in")}
              className={`px-4 py-1.5 transition-colors ${
                unit === "in"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}>
              Inches
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-1.5 transition-colors border-l border-gray-200 ${
                unit === "cm"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}>
              Centimetres
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {allSizeTables.map((table) => (
            <div key={table.title}>
              <h3 className="text-base sm:text-lg font-medium text-center mb-4 font-sans">
                {table.title}
              </h3>

              {/* ── Desktop table ── */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      {table.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr
                        key={row.size}
                        className={`bg-white ${i < table.rows.length - 1 ? "border-b" : ""}`}>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {row.size}
                        </td>
                        {table.columns.slice(1).map((col) => (
                          <td
                            key={col}
                            className="px-4 py-3">
                            {formatMeasurement(row[col.toLowerCase()], unit)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile cards ── */}
              <div className="sm:hidden grid grid-cols-2 gap-3">
                {table.rows.map((row) => (
                  <div
                    key={row.size}
                    className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                      Size {row.size}
                    </p>
                    {table.columns.slice(1).map((col) => (
                      <div
                        key={col}
                        className="flex justify-between items-center py-0.5">
                        <span className="text-xs text-gray-500">{col}</span>
                        <span className="text-xs font-medium text-gray-800">
                          {formatMeasurement(row[col.toLowerCase()], unit)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center space-y-1">
          <p className="font-medium">{sizeGuideNote.setDescription}</p>
          <p>{sizeGuideNote.lining}</p>
          <p className="text-xs text-gray-400 mt-3">
            {sizeGuideNote.disclaimer}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
