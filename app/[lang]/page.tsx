import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/types"
import HomeClient from "./home-client"
import { properties } from "@/lib/mock-data"
import { getFeaturedProperties } from "./properties/actions"

// Mock data for locations
const locations = [
  { name: "casablanca", image: "/placeholder.svg?height=200&width=300" },
  { name: "marrakech", image: "/placeholder.svg?height=200&width=300" },
  { name: "tangier", image: "/placeholder.svg?height=200&width=300" },
  { name: "rabat", image: "/placeholder.svg?height=200&width=300" },
  { name: "agadir", image: "/placeholder.svg?height=200&width=300" },
  { name: "fes", image: "/placeholder.svg?height=200&width=300" },
]

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)
  const data = await getFeaturedProperties();
  console.log(data)

  // Get the first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3)

  return <HomeClient dict={dict} lang={params.lang} featuredProperties={data.results.slice(0, 3)} locations={locations} />
}
