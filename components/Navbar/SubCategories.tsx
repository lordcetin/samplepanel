/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Fragment } from "react"

interface SubCategory {
  name: string
  href: string
}

interface SubCategoriesProps {
  categories: SubCategory[]
}

export const SubCategories: React.FC<SubCategoriesProps> = ({ categories }) => {
  return (
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        {categories.map((category, index) => (
          <Fragment key={index}>
          <li key={index}>
            <NavigationMenuLink asChild>
              <a
                href={category.href}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-foreground hover:text-accent-foreground focus:bg-foreground focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">{category.name}</div>
              </a>
            </NavigationMenuLink>
          </li>
          </Fragment>
        ))}
      </ul>
    </NavigationMenuContent>
  )
}

