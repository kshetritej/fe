"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileMenuItem } from "./mobile-menu-item";
import { Button } from "./ui/button";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
};

interface MobileMenuProps {
  items: MenuItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <Button
        variant={"ghost"}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {isOpen ? (
          <X size={24} className="text-gray-900" />
        ) : (
          <Menu size={24} className="text-gray-900" />
        )}
      </Button>

      {/* Slide-down panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(var(--nav-height,112px))] bg-white border-t border-gray-200 z-50 overflow-y-auto max-h-[calc(100vh-112px)]">
          {items.map((item) => (
            <MobileMenuItem key={item.id} item={item} level={0} />
          ))}
        </div>
      )}
    </>
  );
}
