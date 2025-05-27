"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Search,
  ArrowUpRight,
  X,
  Filter,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedElement from "@/components/animated-element";
import type { Locale } from "@/lib/types";
import { useState, useEffect } from "react";
import { usePropertyFilters } from "@/hooks/use-property-filters";

// Format price based on locale
function formatPrice(price: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA",
    {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }
  ).format(price);
}

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  main_image: string | null;
  features: string[];
  images: PropertyImage[];
  type: string
  description: string
  is_published: boolean;
  created_at: string;
}

interface PropertyImage {
  id: number;
  image: string;
  is_main: boolean;
}


export type PropertiesResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
};

interface PropertiesClientProps {
  dict: any;
  lang: Locale;
  properties: Property[];
}

export default function PropertiesClient({
  dict,
  lang,
  properties,
}: PropertiesClientProps) {
  const {
    filters,
    filteredProperties,
    updateFilter,
    resetFilters,
    applyFilters,
    isLoading,
    hasActiveFilters,
    validation,
    totalProperties,
    filteredCount,
  } = usePropertyFilters(properties);

  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Sort filtered properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "newest":
      default:
        return b.id - a.id; // Assuming higher ID means newer
    }
  });

  // Handle search input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Auto-apply filters when search changes
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filters.search]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedElement animation="fadeInDown">
        <h1 className="text-3xl font-bold mb-8">{dict.properties.title}</h1>
      </AnimatedElement>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <AnimatedElement animation="fadeInLeft" className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {dict.properties.filter.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Search */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="search">{dict.common.search}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder={`${dict.common.search}...`}
                      className="pl-9"
                      value={filters.search}
                      onChange={(e) => updateFilter("search", e.target.value)}
                    />
                    {filters.search && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => updateFilter("search", "")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="location">
                    {dict.properties.filter.location}
                  </Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => updateFilter("location", value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue
                        placeholder={dict.properties.filter.location}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {Object.entries(dict.home.locations)
                        .filter(([key]) => key !== "title")
                        .map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value as string}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Property Type */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="type">{dict.properties.filter.type}</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => updateFilter("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder={dict.properties.filter.type} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {Object.entries(dict.properties.types).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value as string}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Price Range */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label>{dict.properties.filter.price}</Label>
                  <div className="pt-4">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        updateFilter("priceRange", value as [number, number])
                      }
                      min={0}
                      max={20000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{formatPrice(filters.priceRange[0], lang)}</span>
                      <span>{formatPrice(filters.priceRange[1], lang)}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Bedrooms */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="bedrooms">
                    {dict.properties.filter.bedrooms}
                  </Label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) => updateFilter("bedrooms", value)}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Filter Actions */}
                {/* Validation Errors */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={applyFilters}
                      disabled={isLoading || !validation.isValid}
                    >
                      {isLoading ? "Applying..." : dict.properties.filter.apply}
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={resetFilters}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Validation Errors */}
                  {!validation.isValid && (
                    <div className="text-sm text-destructive">
                      {validation.errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label>Active Filters</Label>
                    <div className="flex flex-wrap gap-2">
                      {filters.search && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          Search: {filters.search}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => updateFilter("search", "")}
                          />
                        </Badge>
                      )}
                      {filters.location && filters.location !== "all" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {
                            dict.home.locations[
                              filters.location as keyof typeof dict.home.locations
                            ]
                          }
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => updateFilter("location", "all")}
                          />
                        </Badge>
                      )}
                      {filters.type && filters.type !== "all" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {
                            dict.properties.types[
                              filters.type as keyof typeof dict.properties.types
                            ]
                          }
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => updateFilter("type", "all")}
                          />
                        </Badge>
                      )}
                      {filters.bedrooms && filters.bedrooms !== "any" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {filters.bedrooms}+ bedrooms
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => updateFilter("bedrooms", "any")}
                          />
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* Properties List */}
        <div className="lg:col-span-3">
          <AnimatedElement
            animation="fadeInRight"
            className="flex justify-between items-center mb-6"
          >
            <div>
              <p className="text-muted-foreground">
                {filteredCount} of {totalProperties} properties found
                {hasActiveFilters && (
                  <span className="ml-2 text-primary">(filtered)</span>
                )}
              </p>
              {filteredCount === 0 && hasActiveFilters && (
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters to see more results
                </p>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={dict.properties.sort.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  {dict.properties.sort.newest}
                </SelectItem>
                <SelectItem value="priceAsc">
                  {dict.properties.sort.priceAsc}
                </SelectItem>
                <SelectItem value="priceDesc">
                  {dict.properties.sort.priceDesc}
                </SelectItem>
              </SelectContent>
            </Select>
          </AnimatedElement>

          {/* No Results Message */}
          {filteredCount === 0 ? (
            <AnimatedElement animation="fadeInUp" className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {hasActiveFilters
                    ? "No properties match your current filters. Try adjusting your search criteria."
                    : "No properties are available at the moment."}
                </p>
                {hasActiveFilters && (
                  <Button onClick={resetFilters} variant="outline">
                    Clear all filters
                  </Button>
                )}
              </div>
            </AnimatedElement>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties?.map((property, index) => (
                <AnimatedElement
                  key={property.id}
                  animation="fadeInUp"
                  delay={0.1 * index}
                  className="h-full"
                >
                  <motion.div
                    className="h-full"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
                      <Link
                        href={`/${lang}/properties/${property.id}`}
                        className="relative h-48 block"
                      >
                        <Image
                          src={
                            property.images?.find((img) => img.is_main)?.image ||
                            property.images?.[0]?.image ||
                            `/placeholder.svg?height=600&width=800&text=Property_${property.id}`
                          }
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <Link
                            href={`/${lang}/properties/${property.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            <h3 className="text-lg font-semibold line-clamp-1">
                              {property.title}
                            </h3>
                          </Link>
                          <span className="text-primary font-bold text-sm">
                            {formatPrice(property.price, lang)}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                          <MapPin className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>
                            {
                              dict.home.locations[
                                property.location.toLowerCase() as keyof typeof dict.home.locations
                              ]
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-xs mb-3">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center">
                              <Bed className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center">
                              <Bath className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Maximize className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            <span>{property.area} m²</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                          {property.description}
                        </p>
                        <div className="mt-auto">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button asChild className="w-full" size="sm">
                              <Link
                                href={`/${lang}/properties/${property.id}`}
                                className="flex items-center justify-center"
                              >
                                View Details
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
