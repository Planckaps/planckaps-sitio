import { whatsappHref } from "@/lib/data";
import { ChatIcon } from "@/components/ui/Icons";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-forest py-3.5 pl-4 pr-4 text-bone shadow-[0_18px_40px_-14px_rgb(0_0_0/0.5)] ring-1 ring-bone/15 transition-all duration-300 hover:bg-forest-2 sm:pr-5"
    >
      <ChatIcon />
      <span className="hidden font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
