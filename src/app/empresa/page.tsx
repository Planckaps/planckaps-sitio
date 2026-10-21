import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Empresa",
  description: "Quiénes somos: DIC y su propuesta de ingredientes premium.",
};

export default function EmpresaPage() {
  return (
    <ComingSoon
      eyebrow="Empresa"
      title="Sobre DIC"
      lead="La historia, el equipo y la visión de DIC. Contenido a completar con información real de la empresa."
      cycle={7}
      action={{ label: "HABLAR CON DIC", href: "/contacto" }}
    />
  );
}
