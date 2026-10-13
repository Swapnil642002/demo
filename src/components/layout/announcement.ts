import { publishedNotices } from "@/data/admissions";

/**
 * Text for the top announcement bar. Derived from published notices only —
 * if nothing has been approved and published, the bar is hidden entirely
 * rather than showing placeholder copy like the live site does.
 */
export const announcementText: string | null =
  publishedNotices.length > 0 ? publishedNotices[0].title : null;
