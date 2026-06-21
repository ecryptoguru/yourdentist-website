"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="absolute inset-0 bg-dot-grid-subtle opacity-20" />
      <div className="text-center relative max-w-md">
        <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="font-heading text-3xl font-semibold text-teal-700">
            !
          </span>
        </div>
        <h1 className="font-heading text-3xl font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
          Something Went Wrong
        </h1>
        <p className="text-slate-500 mb-8 text-[15px] leading-relaxed">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={reset}
            className="bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg h-11 font-medium transition-all duration-300 shadow-none hover:shadow-premium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 gap-2 rounded-lg h-11 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
