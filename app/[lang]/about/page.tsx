import Image from "next/image"
import { getDictionary, type Locale } from "@/lib/dictionary"
import { Building, Users, Award, ThumbsUp } from "lucide-react"

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  // This would come from the dictionary in a real app
  const aboutContent = {
    title: "About Morocco Estates",
    subtitle: "Your Trusted Real Estate Partner in Morocco",
    description:
      "Morocco Estates is a premier real estate agency specializing in luxury properties across Morocco. With over 15 years of experience in the Moroccan real estate market, we have established ourselves as a trusted partner for both local and international clients looking to buy, sell, or rent properties in Morocco.",
    mission:
      "Our mission is to provide exceptional real estate services with integrity, expertise, and personalized attention to meet the unique needs of each client. We are committed to helping our clients make informed decisions and achieve their real estate goals in Morocco.",
    values: [
      {
        title: "Excellence",
        description:
          "We strive for excellence in every aspect of our business, from property selection to client service.",
      },
      {
        title: "Integrity",
        description: "We conduct our business with honesty, transparency, and ethical standards.",
      },
      {
        title: "Client Focus",
        description: "We put our clients' needs first and work tirelessly to exceed their expectations.",
      },
      {
        title: "Local Expertise",
        description:
          "Our deep knowledge of the Moroccan real estate market allows us to provide valuable insights and guidance.",
      },
    ],
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "1000+", label: "Properties Sold" },
      { value: "500+", label: "Happy Clients" },
      { value: "6", label: "Offices Across Morocco" },
    ],
    team: [
      {
        name: "Hassan Benjelloun",
        position: "Founder & CEO",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Leila Tazi",
        position: "Head of Sales",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Omar Alaoui",
        position: "Chief Financial Officer",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Fatima Zahra",
        position: "Marketing Director",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/679823609.jpg?k=17a5fcd8781ccdc1c1b68e855ff042d7ceec37e356d6f15fa622962890fb495d&o=height=800&width=1920"
            alt="Morocco Estates Team"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{aboutContent.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{aboutContent.subtitle}</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{aboutContent.description}</p>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{aboutContent.mission}</p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://blog.udemy.com/wp-content/uploads/2014/06/bigstock-Mixed-group-in-business-meetin-23883404-620x413.jpgheight=800&width=600"
                alt="Morocco Estates Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {index === 0 && <Award className="h-6 w-6 text-primary" />}
                  {index === 1 && <Users className="h-6 w-6 text-primary" />}
                  {index === 2 && <ThumbsUp className="h-6 w-6 text-primary" />}
                  {index === 3 && <Building className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
