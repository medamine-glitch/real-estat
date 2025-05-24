"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { properties } from "@/lib/mock-data"
import { filterProperties, validateFilters, type FilterCriteria } from "@/lib/property-filters"

export default function FilterTestPage() {
  const [testResults, setTestResults] = useState<string[]>([])

  const runTests = () => {
    const results: string[] = []

    // Test 1: Search filter
    const searchFilter: FilterCriteria = {
      search: "villa",
      location: "all",
      type: "all",
      priceRange: [0, 20000000],
      bedrooms: "any",
    }
    const searchResults = filterProperties(properties, searchFilter)
    results.push(`Search test: Found ${searchResults.length} properties with "villa" in title/description`)

    // Test 2: Location filter
    const locationFilter: FilterCriteria = {
      search: "",
      location: "marrakech",
      type: "all",
      priceRange: [0, 20000000],
      bedrooms: "any",
    }
    const locationResults = filterProperties(properties, locationFilter)
    results.push(`Location test: Found ${locationResults.length} properties in Marrakech`)

    // Test 3: Type filter
    const typeFilter: FilterCriteria = {
      search: "",
      location: "all",
      type: "apartment",
      priceRange: [0, 20000000],
      bedrooms: "any",
    }
    const typeResults = filterProperties(properties, typeFilter)
    results.push(`Type test: Found ${typeResults.length} apartments`)

    // Test 4: Price range filter
    const priceFilter: FilterCriteria = {
      search: "",
      location: "all",
      type: "all",
      priceRange: [2000000, 5000000],
      bedrooms: "any",
    }
    const priceResults = filterProperties(properties, priceFilter)
    results.push(`Price test: Found ${priceResults.length} properties between 2M-5M MAD`)

    // Test 5: Bedroom filter
    const bedroomFilter: FilterCriteria = {
      search: "",
      location: "all",
      type: "all",
      priceRange: [0, 20000000],
      bedrooms: "3",
    }
    const bedroomResults = filterProperties(properties, bedroomFilter)
    results.push(`Bedroom test: Found ${bedroomResults.length} properties with 3+ bedrooms`)

    // Test 6: Combined filters
    const combinedFilter: FilterCriteria = {
      search: "",
      location: "casablanca",
      type: "apartment",
      priceRange: [1000000, 5000000],
      bedrooms: "2",
    }
    const combinedResults = filterProperties(properties, combinedFilter)
    results.push(`Combined test: Found ${combinedResults.length} apartments in Casablanca, 2+ bedrooms, 1M-5M MAD`)

    // Test 7: Validation
    const invalidFilter: FilterCriteria = {
      search: "",
      location: "all",
      type: "all",
      priceRange: [5000000, 1000000], // Invalid: max < min
      bedrooms: "any",
    }
    const validation = validateFilters(invalidFilter)
    results.push(`Validation test: ${validation.isValid ? "FAILED" : "PASSED"} - Invalid price range detected`)

    setTestResults(results)
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Property Filter Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runTests} className="mb-4">
            Run Filter Tests
          </Button>

          <div className="space-y-2">
            <p className="font-medium">Total properties in dataset: {properties.length}</p>
            {testResults.map((result, index) => (
              <p key={index} className="text-sm">
                {result}
              </p>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Property Breakdown:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>By Location:</p>
                <ul className="ml-4">
                  {Object.entries(
                    properties.reduce(
                      (acc, p) => {
                        acc[p.location] = (acc[p.location] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([location, count]) => (
                    <li key={location}>
                      {location}: {count}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p>By Type:</p>
                <ul className="ml-4">
                  {Object.entries(
                    properties.reduce(
                      (acc, p) => {
                        acc[p.type] = (acc[p.type] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([type, count]) => (
                    <li key={type}>
                      {type}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
