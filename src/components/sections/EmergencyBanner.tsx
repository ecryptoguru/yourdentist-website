import { clinicInfo } from "@/lib/data";
import { Phone, AlertTriangle } from "lucide-react";

export function EmergencyBanner() {
  return (
    <div className="bg-amber-50/80 border-b border-amber-200/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-sm font-medium text-amber-800">
              Dental Emergency?
            </span>
          </div>
          <a
            href={clinicInfo.phoneLink}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-900 transition-colors py-1 px-3 rounded-md hover:bg-teal-50/60"
          >
            <Phone className="w-3.5 h-3.5" />
            Call us immediately at {clinicInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
