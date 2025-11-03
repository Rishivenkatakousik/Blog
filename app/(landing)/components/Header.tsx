"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl text-gray-900">
            BlogHub
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#recent"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Recent
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#all-posts"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Posts
            </Link>
          </nav>
        </div>
        <Button className=" text-white cursor-pointer">Subscribe</Button>
      </div>
    </header>
  );
}
