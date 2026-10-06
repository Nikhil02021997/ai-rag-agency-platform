"use client";

import { WhatsAppChooserButton } from "./WhatsAppChooser";
import WhatsAppIcon from "./WhatsAppIcon";

/** Floating WhatsApp button: opens the "which line?" chooser instead of a fixed number. */
export default function WhatsAppButton() {
  return (
    <WhatsAppChooserButton
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fab-bounce fixed bottom-6 right-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      <WhatsAppIcon size={28} />
    </WhatsAppChooserButton>
  );
}
