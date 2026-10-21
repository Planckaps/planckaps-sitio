import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: el sitio se publica como archivos (HTML/JS/CSS)
  // en un hosting gratuito. Cuando haya pagos/servidor se revisa.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
