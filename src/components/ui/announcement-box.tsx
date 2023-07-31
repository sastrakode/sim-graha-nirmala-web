import { dateFormat } from "@/lib/utils"

export default function AnnouncementBox({
  category,
  content,
  date,
}: {
  category: string
  content: string
  date: Date
}) {
  return (
    <div className="bg-white pb-6 rounded-3xl">
      <div className="bg-primary txt-tiny text-white py-2 px-6 w-max rounded-tl-3xl rounded-br-3xl">
        {category}
      </div>
      <div className="px-8 mt-4">
        <p className="text-xs md:text-base text-primary">{content}</p>
        <div className="flex items-center mt-3">
          <p className="txt-tiny md:text-xs text-primary">{dateFormat(date)}</p>
        </div>
      </div>
    </div>
  )
}
