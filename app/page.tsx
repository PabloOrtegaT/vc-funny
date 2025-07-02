import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "Major Sea Combat Update - Version 2.4.1",
    summary:
      "New ship types, improved cannon mechanics, and enhanced naval battles. This update brings significant improvements to sea warfare.",
    date: "2024-12-28",
    time: "14:30",
    version: "v2.4.1",
    type: "patch",
  },
  {
    id: 2,
    title: "Holiday Event: Winter Treasure Hunt",
    summary:
      "Special holiday event featuring exclusive rewards, limited-time bosses, and festive decorations across all ports.",
    date: "2024-12-25",
    time: "09:00",
    type: "event",
  },
  {
    id: 3,
    title: "New Trading Routes Discovered",
    summary:
      "Three new trading routes have been added connecting the Caribbean to the Mediterranean. New goods and opportunities await!",
    date: "2024-12-22",
    time: "16:45",
    type: "news",
  },
  {
    id: 4,
    title: "Bug Fixes and Performance Improvements - Version 2.4.0",
    summary: "Fixed various issues with ship movement, trading calculations, and server stability improvements.",
    date: "2024-12-20",
    time: "11:20",
    version: "v2.4.0",
    type: "patch",
  },
  {
    id: 5,
    title: "Boss Respawn Times Adjusted",
    summary:
      "Several boss respawn times have been rebalanced based on community feedback. Check the Boss Respawn tab for updated schedules.",
    date: "2024-12-18",
    time: "13:15",
    type: "news",
  },
]

export default function HomePage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "patch":
        return "bg-blue-600"
      case "event":
        return "bg-purple-600"
      case "news":
        return "bg-amber-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Latest News & Updatess</h1>
        <p className="text-slate-300">Stay updated with the latest VCFunny developments</p>
      </div>

      <div className="space-y-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getTypeColor(item.type)} text-white`}>{item.type.toUpperCase()}</Badge>
                    {item.version && (
                      <Badge variant="outline" className="border-amber-500 text-amber-400">
                        {item.version}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-amber-100 mb-2">{item.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{item.time}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">{item.summary}</p>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 bg-transparent"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="w-10 h-10 bg-amber-600 text-white border-amber-600">
            1
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            2
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            3
          </Button>
        </div>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
