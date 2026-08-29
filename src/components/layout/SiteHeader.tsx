import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

/** The announcement strip + primary nav, stacked as one fixed header. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />
      <Navbar />
    </header>
  );
}
