import { TAnnouncement } from "@/server/db/schema"

export type AnnouncementResponse = {
  id: number
  title: string
  content: string
  author_id: number
  created_at: Date
  updated_at: Date | null
}

export function toAnnouncementResponse(
  announcement?: TAnnouncement
): AnnouncementResponse | null {
  return announcement
    ? {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        author_id: announcement.authorId,
        created_at: announcement.createdAt,
        updated_at: announcement.updatedAt,
      }
    : null
}
