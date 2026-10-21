/** Círculos concéntricos: recurso gráfico del manual de marca. */
export function Rings({
  size = 360,
  count = 5,
  className,
  style,
}: {
  size?: number;
  count?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const step = size / 2 / count;
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={size / 2} cy={size / 2} r={step * (i + 1) - 1} />
      ))}
    </svg>
  );
}
