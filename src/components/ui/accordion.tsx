"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("space-y-3", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "bg-white rounded-xl border border-warm-100 px-5 data-open:border-teal-100 transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "flex w-full items-center justify-between py-5 text-left text-warm-900 font-medium hover:no-underline focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:rounded-lg outline-none cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-warm-400 transition-transform duration-200 [[data-open]>&]:rotate-180"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn("text-warm-600 pb-5 leading-relaxed", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
