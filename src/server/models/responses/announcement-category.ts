import { TAnnouncementCategory } from "@/server/db/schema"

export type AnnouncementCategoryResponse = {
  id: number
  name: string
  created_at: Date
  updated_at: Date | null
}

export function toAnnouncementCategoryResponse(
  announcementCategory?: TAnnouncementCategory,
): AnnouncementCategoryResponse | null {
  return announcementCategory
    ? {
        id: announcementCategory.id,
        name: announcementCategory.name,
        created_at: announcementCategory.createdAt,
        updated_at: announcementCategory.updatedAt,
      }
    : null
}
