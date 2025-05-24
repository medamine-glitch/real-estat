"use client"

import { useState, useCallback, useMemo } from "react"
import {
  filterProperties,
  validateFilters,
  type FilterCriteria,
  type Property,
  defaultFilters,
} from "@/lib/property-filters"

export function usePropertyFilters(properties: Property[]) {
  const [filters, setFilters] = useState<FilterCriteria>(defaultFilters)
  const [isLoading, setIsLoading] = useState(false)

  // Update individual filter
  const updateFilter = useCallback((key: keyof FilterCriteria, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  // Apply filters with loading state
  const applyFilters = useCallback(async () => {
    setIsLoading(true)
    // Simulate async operation for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsLoading(false)
  }, [])

  // Get filtered properties
  const filteredProperties = useMemo(() => {
    const validation = validateFilters(filters)
    if (!validation.isValid) {
      console.warn("Invalid filters:", validation.errors)
      return properties // Return all properties if filters are invalid
    }

    return filterProperties(properties, filters)
  }, [properties, filters])

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search.trim() !== "" ||
      filters.location !== "all" ||
      filters.type !== "all" ||
      filters.priceRange[0] !== defaultFilters.priceRange[0] ||
      filters.priceRange[1] !== defaultFilters.priceRange[1] ||
      filters.bedrooms !== "any"
    )
  }, [filters])

  // Validate current filters
  const validation = useMemo(() => validateFilters(filters), [filters])

  return {
    filters,
    filteredProperties,
    updateFilter,
    resetFilters,
    applyFilters,
    isLoading,
    hasActiveFilters,
    validation,
    totalProperties: properties.length,
    filteredCount: filteredProperties.length,
  }
}
