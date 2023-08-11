import {
  TAnnouncement,
  TAnnouncementCategory,
  TStaff,
} from "@/server/db/schema"
import { StaffResponse, toStaffResponse } from "./staff"
import {
  AnnouncementCategoryResponse,
  toAnnouncementCategoryResponse,
} from "./announcement-category"

export type AnnouncementResponse = {
  id: number
  title: string
  content: string
  announcement_category_id: number
  announcementCategory: AnnouncementCategoryResponse | null
  author_id: number
  author: StaffResponse | null
  created_at: Date
  updated_at: Date | null
}

export function toAnnouncementResponse(
  announcement?: TAnnouncement,
  relations?: {
    announcementCategory?: TAnnouncementCategory
    author?: TStaff
  },
): AnnouncementResponse | null {
  return announcement
    ? {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        announcement_category_id: announcement.announcementCategoryId,
        announcementCategory: toAnnouncementCategoryResponse(
          relations?.announcementCategory,
        ),
        author_id: announcement.authorId,
        author: toStaffResponse(relations?.author),
        created_at: announcement.createdAt,
        updated_at: announcement.updatedAt,
      }
    : null
}
