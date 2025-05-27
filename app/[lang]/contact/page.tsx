"use client"
import { useState, useEffect } from "react"
import { getDictionary, type Locale } from "@/lib/dictionary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dict, setDict] = useState<any>(null)

  // Fetch dictionary on mount
  useEffect(() => {
    getDictionary(lang).then(setDict)
  }, [lang])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("Message sent successfully!")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        const data = await res.json()
        setStatus("Error: " + JSON.stringify(data))
      }
    } catch (err) {
      setStatus("Network error")
    }
    setLoading(false)
  }

  if (!dict) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{dict.contact.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">{dict.contact.form.name}</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{dict.contact.form.name}</Label>
                  <Input id="name" required value={form.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{dict.contact.form.email}</Label>
                  <Input id="email" type="email" required value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{dict.contact.form.phone}</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{dict.contact.form.message}</Label>
                <Textarea id="message" rows={6} required value={form.message} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : dict.contact.form.submit}
              </Button>
              {status && <div className="mt-2 text-center">{status}</div>}
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