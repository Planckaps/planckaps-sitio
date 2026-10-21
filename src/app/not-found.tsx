import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center", display: "grid", gap: "1.25rem", justifyItems: "center" }}>
      <p className="eyebrow">Error 404</p>
      <h1>No encontramos esta página</h1>
      <p className="lead">Puede que el enlace haya cambiado. Volvé al inicio o mirá la tienda.</p>
      <div className="hero__cta">
        <Link href="/" className="btn btn--primary">Ir al inicio</Link>
        <Link href="/tienda/" className="btn btn--ghost">Ver la tienda</Link>
      </div>
    </div>
  );
}
