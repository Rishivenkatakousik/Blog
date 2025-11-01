"use client";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-20 md:py-28 from-purple-50 to-blue-50 border-t border-b border-gray-200 mb-6">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Never Miss an Update
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest articles delivered
          straight to your inbox every week.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
