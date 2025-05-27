"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, Maximize, MapPin, ArrowRight, ArrowUpRight } from "lucide-react"
import { Building, Home } from "lucide-react"
import { Key, TrendingUp } from "@/components/icons"
import { motion } from "framer-motion"
import AnimatedElement from "@/components/animated-element"
import type { Locale } from "@/lib/types"
import { PatternBackground } from "@/components/pattern-background"
import { useState, useEffect } from "react"

// Format price based on locale
function formatPrice(price: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(price)
}

interface PropertyImage {
  id: number;
  image: string;
  is_main: boolean;
}

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  square_meters: number
  images: PropertyImage[]
  type: string
  description: string
}

interface Location {
  name: string
  image: string
}

interface HomeClientProps {
  dict: any
  lang: Locale
  featuredProperties: Property[]
  locations: Location[]
}

export default function HomeClient({ dict, lang, featuredProperties, locations }: HomeClientProps) {
  // State to track if component is mounted (for debugging)
  const [mounted, setMounted] = useState(false)

  // Log properties on mount to verify unique images
  useEffect(() => {
    setMounted(true)
    console.log("Featured properties:", featuredProperties)
  }, [featuredProperties])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.rustomjee.com/blog/wp-content/uploads/2024/07/8_1000-x-374-02.jpg"
            alt="Luxury property in Morocco"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {dict.home.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {dict.home.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={`/${lang}/properties`}>{dict.home.hero.cta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement animation="fadeInUp" className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">{dict.home.featured.title}</h2>
            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href={`/${lang}/properties`} className="flex items-center">
                  {dict.home.featured.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <AnimatedElement key={property.id} animation="fadeInUp" delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
                    <Link href={`/${lang}/properties/${property.id}`} className="relative h-64 block">
                      <div className="relative h-48">
                        <Image
                          src={
                            property.images?.find((img) => img.is_main)?.image ||
                            property.images?.[0]?.image ||
                            `/placeholder.svg?height=600&width=800&text=Property_${property.id}`
                          }
                          alt={property.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      {/* Debug overlay to show property ID - remove in production */}
                      {process.env.NODE_ENV === "development" && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                          ID: {property.id}
                        </div>
                      )}
                    </Link>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <Link
                          href={`/${lang}/properties/${property.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
                        </Link>
                        <span className="text-primary font-bold">{formatPrice(property.price, lang)}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        <span>
                          {dict.home.locations[property.location.toLowerCase() as keyof typeof dict.home.locations]}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>
                            {property.bedrooms} {dict.properties.details.bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>
                            {property.bathrooms} {dict.properties.details.bathrooms}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Maximize className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>{property.square_meters} m²</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                        {property.description}
                      </p>
                      <div className="mt-auto">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button asChild className="w-full">
                            <Link
                              href={`/${lang}/properties/${property.id}`}
                              className="flex items-center justify-center"
                            >
                              {dict.properties.details.description}
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
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 bg-muted/50 dark:bg-muted/30 relative">
        <PatternBackground />
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedElement animation="fadeInUp" className="mb-10">
              <h2 className="text-3xl font-bold text-center">{dict.home.locations.title}</h2>
            </AnimatedElement>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {locations.map((location, index) => (
                <AnimatedElement key={location.name} animation="scaleIn" delay={index * 0.1}>
                  <Link
                    href={`/${lang}/properties?location=${location.name}`}
                    className="group relative h-40 rounded-lg overflow-hidden border border-border shadow-sm"
                  >
                    <Image
                      src={location.image || "/placeholder.svg"}
                      alt={dict.home.locations[location.name as keyof typeof dict.home.locations]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-yellow text-xl font-semibold drop-shadow-md">
                          {dict.home.locations[location.name as keyof typeof dict.home.locations]}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement animation="fadeInUp" className="mb-10">
            <h2 className="text-3xl font-bold text-center">{dict.home.services.title}</h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(dict.home.services)
              .filter(([key]) => key !== "title")
              .map(([key, value], index) => (
                <AnimatedElement key={key} animation="fadeInUp" delay={index * 0.2}>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-card hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {key === "buying" && <Home className="h-8 w-8 text-primary" />}
                          {key === "selling" && <Building className="h-8 w-8 text-primary" />}
                          {key === "renting" && <Key className="h-8 w-8 text-primary" />}
                          {key === "investing" && <TrendingUp className="h-8 w-8 text-primary" />}
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-2">{value as string}</h3>
                        <p className="text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                          labore.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatedElement>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
