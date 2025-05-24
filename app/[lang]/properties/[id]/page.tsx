import Image from "next/image"
import Link from "next/link"
import { getDictionary, type Locale } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, Maximize, MapPin, Calendar, Check, Phone, Mail, User, MessageSquare } from "lucide-react"
import { properties } from "@/lib/mock-data"
import AnimatedElement from "@/components/animated-element"

// Format price based on locale
function formatPrice(price: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function PropertyPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string }
}) {
  const dict = await getDictionary(lang)
  const property = properties.find((p) => p.id === Number.parseInt(id))

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Property not found</h1>
        <p className="mb-8">The property you are looking for does not exist.</p>
        <Button asChild>
          <Link href={`/${lang}/properties`}>Back to properties</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatedElement animation="fadeInDown">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              <span>{dict.home.locations[property.location.toLowerCase() as keyof typeof dict.home.locations]}</span>
            </div>
          </AnimatedElement>

          {/* Property Images */}
          <AnimatedElement animation="fadeIn" className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={property.images[0] || `/placeholder.svg?height=600&width=800&text=Property_${property.id}`}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {property.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={image || `/placeholder.svg?height=300&width=400&text=Image_${index + 2}`}
                    alt={`${property.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </AnimatedElement>

          {/* Property Details */}
          <AnimatedElement animation="fadeInUp" delay={0.1} className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.bedrooms > 0 && (
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{dict.properties.details.bedrooms}</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Bath className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{dict.properties.details.bathrooms}</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              )}
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <Maximize className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{dict.properties.details.area}</p>
                <p className="font-semibold">{property.area} m²</p>
              </div>
              {property.yearBuilt > 0 && (
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-semibold">{property.yearBuilt}</p>
                </div>
              )}
            </div>
          </AnimatedElement>

          {/* Description */}
          <AnimatedElement animation="fadeInUp" delay={0.2} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.properties.details.description}</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </AnimatedElement>

          {/* Features */}
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <h2 className="text-2xl font-semibold mb-4">{dict.properties.details.features}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Price Card */}
          <AnimatedElement animation="fadeInRight" delay={0.1}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <p className="text-muted-foreground">{dict.properties.details.price}</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(property.price, lang)}</p>
                </div>
                <Button className="w-full">{dict.properties.details.contact}</Button>
              </CardContent>
            </Card>
          </AnimatedElement>

          {/* Agent Card */}
          <AnimatedElement animation="fadeInRight" delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 rtl:ml-4 rtl:mr-0">
                    <Image
                      src={property.agent.image || "/placeholder.svg"}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      {dict.contact.form.name}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        id="name"
                        className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      {dict.contact.form.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      {dict.contact.form.message}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea
                        id="message"
                        rows={4}
                        className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={`I'm interested in this property (ID: ${property.id})`}
                      />
                    </div>
                  </div>
                  <Button className="w-full">{dict.contact.form.submit}</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </div>
  )
}
