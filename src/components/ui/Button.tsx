import Link from "next/link";
import { ArrowIcon } from "./Icons";

type Variant = "primary" | "light" | "dark" | "outline" | "outlineLight";

const variants: Record<Variant, string> = {
  primary: "bg-berry text-white hover:bg-[#b8203c]",
  light: "bg-bone text-ink hover:bg-white",
  dark: "bg-ink text-bone hover:bg-forest",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  outlineLight:
    "border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowIcon className="size-4 transition-transform duration-300 ease-(--ease-premium) group-hover:translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
