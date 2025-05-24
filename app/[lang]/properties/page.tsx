import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/types"
import PropertiesClient from "./properties-client"
import { properties } from "@/lib/mock-data"

export default async function PropertiesPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return <PropertiesClient dict={dict} lang={params.lang} properties={properties} />
}
