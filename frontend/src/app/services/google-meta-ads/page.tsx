import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/servicesContent";

const s = SERVICES["google-meta-ads"];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function GoogleMetaAdsPage() {
  return <ServicePage slug="google-meta-ads" />;
}
