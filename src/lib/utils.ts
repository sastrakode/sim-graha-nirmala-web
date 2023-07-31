import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberFormat(value: number) {
  const formatter = new Intl.NumberFormat("id")

  const formattedValue = `Rp ${formatter.format(value)}`

  return formattedValue
}

function join(t: Date, a: any, s: string) {
  function format(m: any) {
    let f = new Intl.DateTimeFormat("id", m)
    return f.format(t)
  }
  return a.map(format).join(s)
}

export function dateFormat(dateObj: Date, isTimeDetail = false): string {
  const a = [
    { day: "numeric" },
    { month: isTimeDetail ? "long" : "short" },
    { year: "numeric" },
  ]
  let s: string = join(dateObj, a, " ")

  if (isTimeDetail) {
    const hour = new Date(dateObj).getHours()
    const hourString = (hour < 10 ? "- 0" : "- ") + hour.toString()

    s += ` ${hourString}:`

    const min = new Date(dateObj).getMinutes()
    const minString = (min < 10 ? "0" : "") + min.toString()

    s += `${minString}:`

    const sec = new Date(dateObj).getSeconds()
    const secString = (sec < 10 ? "0" : "") + sec.toString()

    s += secString
  }

  return s
}
