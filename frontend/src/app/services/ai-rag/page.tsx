import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/servicesContent";

const s = SERVICES["ai-rag"];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
};

export default function AiRagPage() {
  return <ServicePage slug="ai-rag" />;
}
