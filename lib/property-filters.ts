export interface FilterCriteria {
  search: string
  location: string
  type: string
  priceRange: [number, number]
  bedrooms: string
}

export interface PropertyImage {
  id: number;
  image: string;
  is_main: boolean;
}

export interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  images: PropertyImage[]
  type: string
  description: string
}

export const defaultFilters: FilterCriteria = {
  search: "",
  location: "all",
  type: "all",
  priceRange: [0, 20000000],
  bedrooms: "any",
}

export function filterProperties(properties: Property[], filters: FilterCriteria): Property[] {
  return properties.filter((property) => {
    // Search filter - check title, description, and location
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim()
      const searchableText = [property.title, property.description, property.location].join(" ").toLowerCase()

      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      if (property.location.toLowerCase() !== filters.location.toLowerCase()) {
        return false
      }
    }

    // Property type filter
    if (filters.type && filters.type !== "all") {
      if (property.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false
      }
    }

    // Price range filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== "any") {
      const minBedrooms = Number.parseInt(filters.bedrooms)
      if (isNaN(minBedrooms)) {
        return true // Invalid bedroom filter, don't filter
      }
      if (property.bedrooms < minBedrooms) {
        return false
      }
    }

    return true
  })
}

export function validateFilters(filters: FilterCriteria): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate price range
  if (filters.priceRange[0] < 0) {
    errors.push("Minimum price cannot be negative")
  }

  if (filters.priceRange[1] < filters.priceRange[0]) {
    errors.push("Maximum price must be greater than minimum price")
  }

  // Validate bedrooms
  if (filters.bedrooms && filters.bedrooms !== "any") {
    const bedrooms = Number.parseInt(filters.bedrooms)
    if (isNaN(bedrooms) || bedrooms < 0) {
      errors.push("Invalid bedroom count")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function formatPriceRange(range: [number, number], locale: string): string {
  const formatter = new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  })

  return `${formatter.format(range[0])} - ${formatter.format(range[1])}`
}
