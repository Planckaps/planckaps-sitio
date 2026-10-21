import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Tecnología DIC",
  description:
    "Deshidratación por Impacto Controlado: la tecnología detrás de los ingredientes DIC. Una alternativa a la fruta liofilizada para gastronomía, heladería y coctelería profesional.",
};

export default function TecnologiaPage() {
  return (
    <ComingSoon
      eyebrow="Tecnología"
      title="Tecnología DIC"
      lead="Deshidratación por Impacto Controlado. Acá vas a entender, paso a paso, cómo se transforma la fruta en un ingrediente DIC."
      cycle={7}
      action={{ label: "VER PRODUCTOS", href: "/productos" }}
      secondaryAction={{ label: "HABLAR CON DIC", href: "/contacto" }}
    />
  );
}
