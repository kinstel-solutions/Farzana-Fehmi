"use client";

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

export function SizeGuide() {
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
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans text-2xl text-center mb-2">
            Suit Measurements
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            All measurements are in inches.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {allSizeTables.map((table) => (
            <div key={table.title}>
              <h3 className="text-lg font-medium text-center mb-4 font-sans">
                {table.title}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      {table.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className={
                            table.columns.length > 4 ? "px-4 py-3" : "px-6 py-3"
                          }>
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
                        <td
                          className={`${table.columns.length > 4 ? "px-4" : "px-6"} py-3 font-medium text-gray-900`}>
                          {row.size}
                        </td>
                        {table.columns.slice(1).map((col) => (
                          <td
                            key={col}
                            className={`${table.columns.length > 4 ? "px-4" : "px-6"} py-3`}>
                            {row[col.toLowerCase()]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center space-y-2">
          <p className="font-medium">{sizeGuideNote.setDescription}</p>
          <p>{sizeGuideNote.lining}</p>
          <p className="text-xs text-gray-400 mt-4">
            {sizeGuideNote.disclaimer}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
