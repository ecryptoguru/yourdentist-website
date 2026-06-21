import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <div className="min-h-[60vh] flex items-center justify-center bg-cream relative">
          <div className="absolute inset-0 bg-dot-grid-subtle opacity-20" />
          <div className="text-center px-4 relative">
            <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="font-heading text-3xl font-semibold text-teal-700">
                404
              </span>
            </div>
            <h1 className="font-heading text-3xl font-semibold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Page Not Found
            </h1>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
              The page you are looking for does not exist. Let us help you find
              your way back.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2 rounded-lg h-11 font-medium transition-all duration-300 shadow-none hover:shadow-premium">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 gap-2 rounded-lg h-11 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
