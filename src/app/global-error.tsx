"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en-IN">
      <body className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-heading text-3xl font-semibold text-teal-700">
              !
            </span>
          </div>
          <h1 className="font-heading text-3xl font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
            Something Went Wrong
          </h1>
          <p className="text-slate-500 mb-8 text-[15px] leading-relaxed">
            A critical error occurred. Please refresh the page or try again
            later.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
