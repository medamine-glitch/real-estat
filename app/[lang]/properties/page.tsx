import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/types"
import PropertiesClient from "./properties-client"
import { getProperties } from "./actions"


export default async function PropertiesPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)
  const data = await getProperties();

  return <PropertiesClient dict={dict} lang={params.lang} properties={data.results} />
}
