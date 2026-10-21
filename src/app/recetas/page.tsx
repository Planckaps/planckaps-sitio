import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Recetas e inspiración",
  description: "Recetas y aplicaciones con ingredientes DIC para heladería, coctelería, chocolatería, pastelería y gastronomía.",
};

export default function RecetasPage() {
  return (
    <ComingSoon
      eyebrow="Inspiración"
      title="Recetas"
      lead="Ideas y aplicaciones para llevar los ingredientes DIC a tu carta, tu vitrina o tu barra."
      cycle={7}
      action={{ label: "VER PRODUCTOS", href: "/productos" }}
    />
  );
}
