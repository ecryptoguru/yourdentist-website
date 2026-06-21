"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/FadeIn";
import { clinicInfo, services } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Phone,
  Calendar,
  User,
  MessageSquare,
  Stethoscope,
  Send,
  CheckCircle,
} from "lucide-react";

export function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    treatment: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const text = encodeURIComponent(
      `*New Appointment Request*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📅 Preferred Date: ${form.date || "Anytime"}\n🦷 Treatment: ${form.treatment || "Not specified"}\n📝 Message: ${form.message || "None"}`,
    );
    window.open(`${clinicInfo.whatsapp}&text=${text}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FadeIn
        className="max-w-xl mx-auto text-center bg-white rounded-xl p-8 sm:p-12 border border-teal-100/60 shadow-premium"
        role="status"
        aria-live="polite"
      >
        <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-teal-700" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-slate-900 mb-2">
          Request Sent!
        </h3>
        <p className="text-slate-500 mb-8 text-[15px] leading-relaxed">
          We&apos;ve opened WhatsApp with your details. Dr. Arpita will confirm
          your appointment shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              phone: "",
              date: "",
              treatment: "",
              message: "",
            });
          }}
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:border-slate-400 rounded-lg h-11 px-6 transition-all duration-300"
        >
          Book Another Appointment
        </Button>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-xl p-6 sm:p-10 border border-slate-200/60 shadow-premium"
        aria-label="Book an appointment"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full Name{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={cn(
                  "pl-10",
                  errors.name && "border-red-500 focus-visible:ring-red-500",
                )}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Phone Number{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="phone"
                type="tel"
                required
                placeholder="98765 43210"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9\s]/g, "");
                  setForm({ ...form, phone: value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={cn(
                  "pl-10",
                  errors.phone && "border-red-500 focus-visible:ring-red-500",
                )}
                autoComplete="tel"
                inputMode="tel"
                maxLength={13}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  id="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="treatment"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Treatment Type
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Select
                  id="treatment"
                  value={form.treatment}
                  onChange={(e) =>
                    setForm({ ...form, treatment: e.target.value })
                  }
                  className="pl-10"
                >
                  <option value="">Select treatment</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Checkup">General Checkup</option>
                  <option value="Not Sure">Not Sure — Need Advice</option>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Additional Notes
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <Textarea
                id="message"
                rows={3}
                placeholder="Any specific concerns or symptoms..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-2 py-6 text-base rounded-lg font-medium transition-all duration-300 shadow-none hover:shadow-premium-lg"
          >
            <Send className="w-4 h-4" />
            Request Appointment via WhatsApp
          </Button>

          <p className="text-center text-sm text-slate-500">
            We will confirm your appointment within 2 hours during clinic hours.
          </p>
        </div>
      </form>
    </FadeIn>
  );
}
