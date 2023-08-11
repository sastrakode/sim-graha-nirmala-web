import { TAnnouncement, TStaff } from "@/server/db/schema"
import { StaffResponse, toStaffResponse } from "./staff"

export type AnnouncementResponse = {
  id: number
  title: string
  content: string
  author_id: number
  author: StaffResponse | null
  created_at: Date
  updated_at: Date | null
}

export function toAnnouncementResponse(
  announcement?: TAnnouncement,
  relations?: {
    author?: TStaff
  },
): AnnouncementResponse | null {
  return announcement
    ? {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        author_id: announcement.authorId,
        author: toStaffResponse(relations?.author),
        created_at: announcement.createdAt,
        updated_at: announcement.updatedAt,
      }
    : null
}
