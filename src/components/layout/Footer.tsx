import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { clinicInfo, navLinks, services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 relative">
      {/* Top accent line */}
      <div className="h-1 bg-linear-to-r from-teal-700 via-teal-600 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-teal-700 rounded-lg flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 5 3 7.5C10.5 18 11 20 12 20s1.5-2 3-4.5c1.5-2.5 3-5 3-7.5 0-3.5-2.5-6-6-6z" />
                  <path d="M12 8v4" />
                  <circle
                    cx="12"
                    cy="8"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>
              <div>
                <span className="font-heading font-semibold text-base text-white block leading-tight">
                  YourDentist
                </span>
                <span className="text-teal-400 text-[11px] tracking-wide uppercase">
                  Laser Dental Clinic
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-[1.7]">
              Advanced laser dental care in Bhubaneswar. Your smile is our
              passion. Experience painless treatments with cutting-edge
              technology.
            </p>
            <a
              href={clinicInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-teal-700 hover:bg-teal-600 text-white gap-2 rounded-lg h-10 text-sm font-medium transition-all duration-300">
                <Phone className="w-3.5 h-3.5" />
                Book via WhatsApp
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-[15px]">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-slate-500 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/certificates"
                  className="block py-2 text-slate-500 hover:text-teal-400 transition-colors text-sm"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="block py-2 text-slate-500 hover:text-teal-400 transition-colors text-sm"
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-[15px]">
              Our Services
            </h3>
            <ul className="space-y-1">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block py-2 text-slate-500 hover:text-teal-400 transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-[15px]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-slate-500 text-sm leading-relaxed">
                  {clinicInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={clinicInfo.phoneLink}
                  className="text-slate-500 hover:text-teal-400 transition-colors text-sm"
                >
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="text-slate-500 hover:text-teal-400 transition-colors text-sm"
                >
                  {clinicInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div className="text-slate-500 text-sm">
                  <p>Tue - Sun</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Morning: {clinicInfo.hours.tuesdayToSunday.morning}
                  </p>
                  <p className="text-slate-500 text-xs">
                    Evening: {clinicInfo.hours.tuesdayToSunday.evening}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Monday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-slate-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} {clinicInfo.copyright}. All rights
            reserved.
          </p>
          <p className="text-slate-600 text-sm">
            Designed with care for YourDentist Laser Dental Clinic
          </p>
        </div>
      </div>
    </footer>
  );
}
