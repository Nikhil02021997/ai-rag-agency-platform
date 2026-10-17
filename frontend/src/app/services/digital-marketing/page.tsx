import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/servicesContent";

const s = SERVICES["digital-marketing"];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function DigitalMarketingPage() {
  return <ServicePage slug="digital-marketing" />;
}
