"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InventoryStats } from "@/components/admin/Inventory/InventoryStats";
import { ProductTable } from "@/components/admin/Inventory/ProductTable";
import { InventoryFilter, FilterValues } from "@/components/admin/Inventory/InventoryFilter";
import Link from "next/link";

// Define View Type
export type InventoryView = 'all' | 'sold' | 'empty';

export default function InventoryPage() {
  const [filters, setFilters] = useState<FilterValues | undefined>(undefined);
  
  // 👇 1. New View State
  const [view, setView] = useState<InventoryView>('all');

  const handleApplyFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <h1 className="text-2xl font-bold text-black">Inventory</h1>
        </div>

        <div className="flex items-center gap-4">
          <InventoryFilter onApply={handleApplyFilter} />
          <Link href="/inventory/add">
            <Button className="bg-[#DC8404] hover:bg-[#b86e03] text-black gap-2 rounded-xl h-11 px-6 shadow-sm shadow-orange-200">
              <Plus size={18} /> Add Item
            </Button>
          </Link>
        </div>
      </header>

      {/* 👇 2. Pass view props to Stats */}
      <InventoryStats 
        currentView={view} 
        onViewChange={setView} 
      />

      {/* 👇 3. Pass view prop to Table */}
      <ProductTable
        onFilterChange={handleApplyFilter}
        filters={filters}
        view={view}
      />
    </div>
  );
}