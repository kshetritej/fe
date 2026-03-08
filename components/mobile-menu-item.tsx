"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
};

interface MobileMenuItemProps {
  item: MenuItem;
  level?: number;
}

export function MobileMenuItem({ item, level = 0 }: MobileMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const indent = level > 0 ? `pl-${4 + level * 4}` : "px-4";

  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center">
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className={`flex-1 text-left ${indent} py-3 font-semibold text-gray-900 hover:bg-orange-50 transition-colors`}
          >
            <div className="flex items-center justify-between pr-4">
              <span>{item.label}</span>
              <Plus
                size={18}
                className={`transition-transform duration-200 ${
                  isExpanded ? "rotate-45" : ""
                }`}
              />
            </div>
          </button>
        ) : (
          <Link
            href={item.url || "#"}
            className={`flex-1 block ${indent} py-3 font-semibold text-gray-900  hover:text-orange-600 transition-colors`}
          >
            {item.label}
          </Link>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="bg-gray-50 pl-6">
          {item.children.map((child) => (
            <MobileMenuItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
