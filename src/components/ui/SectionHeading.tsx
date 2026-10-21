type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** "dark" = el fondo de la sección es oscuro */
  theme?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const dark = theme === "dark";
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <p className={`eyebrow mb-6 ${dark ? "text-berry-2" : "text-berry"}`}>
        {eyebrow}
      </p>
      <h2 className="display text-[clamp(2.1rem,5vw,4.25rem)]">{title}</h2>
      {lead && (
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${dark ? "text-bone/70" : "text-muted"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
