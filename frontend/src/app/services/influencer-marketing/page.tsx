import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/servicesContent";

const s = SERVICES["influencer-marketing"];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function InfluencerMarketingPage() {
  return <ServicePage slug="influencer-marketing" />;
}
