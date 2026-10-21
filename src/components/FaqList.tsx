import { faq } from "@/lib/data";

export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faq.slice(0, limit) : faq;
  return (
    <div className="accordion">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div className="acc-body">
            <p>{f.a}</p>
            {f.pending && <span className="pending-note">Información en definición</span>}
          </div>
        </details>
      ))}
    </div>
  );
}
