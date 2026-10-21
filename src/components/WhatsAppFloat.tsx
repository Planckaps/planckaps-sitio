import { whatsappUrl } from "@/lib/data";
import { IconWhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp">
      <IconWhatsApp />
    </a>
  );
}
