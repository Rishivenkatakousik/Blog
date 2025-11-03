"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full py-24 md:py-32 from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Insights from Industry Experts
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore in-depth articles on design, development, and digital
          innovation. Stay ahead of the curve with our carefully curated
          content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="text-white px-8 py-6 text-base cursor-pointer">
            Start Reading
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-900 hover:bg-gray-100 cursor-pointer px-8 py-6 text-base bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
