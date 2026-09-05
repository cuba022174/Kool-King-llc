import { Snowflake } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center gap-2 overflow-hidden bg-laser-blue px-4 text-center">
      <Snowflake className="h-3.5 w-3.5 shrink-0 text-white" />
      <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-white sm:text-xs">
        Software for HVAC &amp; refrigeration shops
      </p>
      <Snowflake className="h-3.5 w-3.5 shrink-0 text-white" />
    </div>
  );
}
