import { site } from "@/lib/data";

export function Announce() {
  return (
    <p className="announce" role="note">
      {site.buildNotice}
    </p>
  );
}
