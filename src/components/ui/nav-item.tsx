import Link from "next/link"
import { FC } from "react"
import { LucideIcon } from "lucide-react"

interface INavItemProp {
  Icon: LucideIcon
  isActive: boolean
  routeName: string
  children: React.ReactNode
}

const NavItem: FC<INavItemProp> = ({ Icon, isActive, routeName, children }) => (
  <Link
    href={routeName}
    className={`${
      isActive && "active-link"
    } flex flex-col items-center py-4 px-7 lg:flex-row`}
  >
    {/* cannot use fill attr, because some icon doesn't support */}
    <Icon className="w-6 lg:w-7 h-auto mr-3" />
    <p className={`${isActive && "font-bold"} text-xs lg:text-base`}>
      {children}
    </p>
  </Link>
)

export default NavItem
