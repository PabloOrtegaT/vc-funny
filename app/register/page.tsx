"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    favoriteAspect: "",
    comments: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700 text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-amber-100 mb-2">Registration Successful!</h2>
              <p className="text-slate-300 mb-6">
                Thank you for joining the VCFunny community,{" "}
                <span className="text-amber-400 font-semibold">{formData.username}</span>!
              </p>
              <p className="text-sm text-slate-400 mb-6">
                You'll receive updates about new guides, events, and community features.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ username: "", email: "", favoriteAspect: "", comments: "" })
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Register Another User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Join the Community</h1>
        <p className="text-slate-300">Register to stay updated with VCFunny news and community features</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-100 flex items-center gap-2">
              <UserPlus className="h-6 w-6" />
              Player Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300 font-medium">
                  Username / In-Game Name *
                </Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Enter your username or in-game name"
                  className="bg-slate-700 border-slate-600 text-slate-300 placeholder-slate-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-medium">
                  Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-slate-700 border-slate-600 text-slate-300 placeholder-slate-400"
                />
                <p className="text-xs text-slate-500">
                  We'll only use this to notify you about major updates and community events.
                </p>
              </div>

              {/* Favorite Aspect */}
              <div className="space-y-2">
                <Label htmlFor="favoriteAspect" className="text-slate-300 font-medium">
                  Favorite Aspect of VCFunny
                </Label>
                <Select
                  value={formData.favoriteAspect}
                  onValueChange={(value) => handleInputChange("favoriteAspect", value)}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                    <SelectValue placeholder="Select your favorite aspect" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="naval-combat" className="text-slate-300 focus:bg-slate-600">
                      Naval Combat
                    </SelectItem>
                    <SelectItem value="trading" className="text-slate-300 focus:bg-slate-600">
                      Trading & Economics
                    </SelectItem>
                    <SelectItem value="exploration" className="text-slate-300 focus:bg-slate-600">
                      Exploration
                    </SelectItem>
                    <SelectItem value="land-combat" className="text-slate-300 focus:bg-slate-600">
                      Land Combat
                    </SelectItem>
                    <SelectItem value="city-building" className="text-slate-300 focus:bg-slate-600">
                      City Building
                    </SelectItem>
                    <SelectItem value="pvp" className="text-slate-300 focus:bg-slate-600">
                      Player vs Player
                    </SelectItem>
                    <SelectItem value="community" className="text-slate-300 focus:bg-slate-600">
                      Community & Social
                    </SelectItem>
                    <SelectItem value="other" className="text-slate-300 focus:bg-slate-600">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-slate-300 font-medium">
                  Additional Comments (Optional)
                </Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange("comments", e.target.value)}
                  placeholder="Tell us what you'd like to see on this reference site, or any feedback about VCFunny..."
                  rows={4}
                  className="bg-slate-700 border-slate-600 text-slate-300 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!formData.username || isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                By registering, you agree to receive occasional updates about VCFunny community features and events.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
