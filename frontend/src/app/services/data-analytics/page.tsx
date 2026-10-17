import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/servicesContent";

const s = SERVICES["data-analytics"];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function DataAnalyticsPage() {
  return <ServicePage slug="data-analytics" />;
}
