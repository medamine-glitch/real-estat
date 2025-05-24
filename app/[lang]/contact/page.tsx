import { getDictionary, type Locale } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{dict.contact.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">{dict.contact.form.name}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{dict.contact.form.name}</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{dict.contact.form.email}</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{dict.contact.form.phone}</Label>
                <Input id="phone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{dict.contact.form.message}</Label>
                <Textarea id="message" rows={6} required />
              </div>
              <Button type="submit" className="w-full">
                {dict.contact.form.submit}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">{dict.contact.info.title}</h2>
            <div className="space-y-6">
              <div className="flex">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0" />
                <div>
                  <h3 className="font-semibold mb-2">{dict.contact.info.address}</h3>
                  <p className="text-muted-foreground">
                    123 Avenue Mohammed V<br />
                    Casablanca, 20250
                    <br />
                    Morocco
                  </p>
                </div>
              </div>

              <div className="flex">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0" />
                <div>
                  <h3 className="font-semibold mb-2">{dict.contact.info.phone}</h3>
                  <p className="text-muted-foreground">+212 522 123 456</p>
                  <p className="text-muted-foreground">+212 661 789 012</p>
                </div>
              </div>

              <div className="flex">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0" />
                <div>
                  <h3 className="font-semibold mb-2">{dict.contact.info.email}</h3>
                  <p className="text-muted-foreground">info@moroccoestates.com</p>
                  <p className="text-muted-foreground">sales@moroccoestates.com</p>
                </div>
              </div>

              <div className="flex">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0" />
                <div>
                  <h3 className="font-semibold mb-2">{dict.contact.info.hours}</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <div className="mt-12 rounded-lg overflow-hidden h-[400px] bg-muted/30 flex items-center justify-center">
        <p className="text-muted-foreground">Interactive Map Would Be Displayed Here</p>
      </div>
    </div>
  )
}
