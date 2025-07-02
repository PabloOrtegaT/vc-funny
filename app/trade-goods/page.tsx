"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin } from "lucide-react"

// Mock trade goods data
const tradeGoods = [
  { name: "Almond", cities: ["Suez"] },
  { name: "Aloe", cities: ["Tourane", "Semarang", "San Diego"] },
  { name: "Amber", cities: ["Accra", "Oslo"] },
  { name: "Ambergris", cities: ["Nagasaki", "Tourane", "Semarang", "Magellan Supply Station"] },
  { name: "Amethyst", cities: ["Seoul"] },
  { name: "Antler Decoration", cities: ["Lisbon", "Reykjavik"] },
  { name: "Antiques", cities: ["Hamburg", "Alexander", "Edo", "Barcelona"] },
  { name: "Apple", cities: ["Barcelona"] },
  { name: "Banana", cities: ["Athens"] },
  { name: "Bear Gallbladder", cities: ["Hamburg"] },
  { name: "Beef", cities: ["Tripoli", "Bordeaux", "London"] },
  { name: "Beer", cities: ["Beirut", "Sri Lanka", "Cape Town", "Cruz", "Magellan Supply Station"] },
  { name: "Brandy", cities: ["Lisbon", "Istanbul", "Bordeaux", "Madeira"] },
  { name: "Bronzeware", cities: ["Seville", "Barcelona"] },
  { name: "Cabinet", cities: ["Muscat", "Mogadishu", "Amsterdam"] },
  { name: "Canvas", cities: ["Nagasaki", "Stockholm", "Dakar"] },
  { name: "Carpet", cities: ["Hamburg", "Las Palmas", "Madeira", "Oslo"] },
  { name: "Carvings", cities: ["Tripoli", "Stockholm"] },
  { name: "Chest", cities: ["Muscat", "Tourane"] },
  { name: "Champagne", cities: ["Bordeaux"] },
  { name: "Chinese Medicine Liquer", cities: ["Zhigu"] },
  { name: "Cinnamon", cities: ["Aden", "Las Palmas", "Madeira", "Luanda"] },
  { name: "Cocoa", cities: ["Cruz", "Salinas"] },
  { name: "Coffee", cities: ["Aden", "Cape Town", "Luanda", "San Diego"] },
  { name: "Corn", cities: ["Mozambique", "Cape Town", "Salinas", "San Francisco"] },
  { name: "Cotton Fabric", cities: ["Venice", "Genoa", "Algiers", "Bombay"] },
  { name: "Crystal", cities: ["Nagasaki"] },
  { name: "Date", cities: ["Beirut", "Accra", "Mogadishu"] },
  { name: "Datura", cities: ["Muscat", "Basra"] },
  { name: "Diamond", cities: ["Muscat"] },
  { name: "Dyes", cities: ["Alexander", "Genoa", "Mozambique", "Salinas", "Seward"] },
  { name: "Emerald", cities: ["San Diego  ***Bug will also rename Jadeite as Emerald"] },
  { name: "Fish", cities: ["Istanbul", "Dakar"] },
  { name: "Fruit Jam", cities: ["Reykjavik", "Dakar", "Salinas"] },
  { name: "Glassware", cities: ["Hamburg", "Athens", "Lisbon"] },
  { name: "Ginseng", cities: ["Seville"] },
  { name: "Gold", cities: ["Cape Town", "San Francisco"] },
  { name: "Goldware", cities: ["Mogadishu", "Salinas"] },
  { name: "Grape", cities: ["Algiers"] },
  { name: "Granulated Sugar", cities: ["Beirut", "Luanda"] },
  { name: "Handicraft", cities: ["Quanzhou", "San Diego"] },
  { name: "Hide", cities: ["Basra", "Madeira", "Dakar", "Oslo", "Seward"] },
  { name: "Honey", cities: ["Istanbul", "Malacca", "Mozambique", "Seward"] },
  { name: "Ironware", cities: ["Suez", "Alexander", "London"] },
  { name: "Isatis Root", cities: ["Basra", "Sri Lanka", "Cruz"] },
  { name: "Ivory", cities: ["Sri Lanka", "Bombay"] },
  { name: "Ivory Carvings (Crafts)", cities: ["Algiers", "Las Palmas"] },
  { name: "Jewelry", cities: ["Beirut", "Genoa", "Mozambique"] },
  { name: "Jadeite", cities: ["Luanda  ***Bug will also rename Jadeite as Emerald"] },
  { name: "Kimchi", cities: ["Seoul"] },
  { name: "Kimono", cities: ["Nagasaki", "Edo"] },
  { name: "King Salmon", cities: ["Magellan Supply Station"] },
  { name: "Kite", cities: ["Zhigu", "Seoul"] },
  { name: "Korean Dress", cities: ["Seoul"] },
  { name: "Korean Ginseng", cities: ["Seoul"] },
  { name: "Lacquered Work", cities: ["Seoul"] },
  { name: "Leather", cities: ["Muscat", "Genoa", "Basra"] },
  { name: "Lemon", cities: ["Accra", "Mogadishu"] },
  { name: "Lichi", cities: ["Edo", "Malacca", "Sri Lanka"] },
  { name: "Linen", cities: ["Nagasaki", "Athens", "Tripoli", "Bombay"] },
  { name: "Lizard Tail", cities: ["Mogadishu", "Mozambique"] },
  { name: "Lobster", cities: ["Seville", "Barcelona", "Magellan Supply Station"] },
  { name: "Longan", cities: ["Quanzhou"] },
  { name: "Marble", cities: ["Alexander", "Seville", "Suez", "Tripoli", "Bombay", "San Francisco"] },
  { name: "Marijuana", cities: ["Semarang", "Malacca", "Dakar", "San Diego"] },
  { name: "Mirror", cities: ["Seville", "Stockholm"] },
  { name: "Mutton", cities: ["Suez", "Alexander"] },
  { name: "Oil Painting", cities: ["Athens", "Algiers", "Oslo"] },
  { name: "Olive", cities: ["Istanbul", "Aden"] },
  { name: "Olive Oil", cities: ["Venice", "Basra", "Bombay", "Amsterdam"] },
  { name: "Orange", cities: ["Venice"] },
  { name: "Pear", cities: ["Nagasaki", "Genoa"] },
  { name: "Pearl", cities: ["Malacca"] },
  { name: "Pepper", cities: ["Accra", "Cruz"] },
  { name: "Pendant Lamp", cities: ["Reykjavik"] },
  { name: "Picea", cities: ["Seward"] },
  { name: "Pilrose Antler", cities: ["Suez", "Stockholm", "Amsterdam", "Mozambique"] },
  { name: "Pollen", cities: ["Semarang", "Seward"] },
  { name: "Porcelain", cities: ["Zhigu", "Beirut", "Salinas"] },
  { name: "Pork", cities: ["Venice", "Tourane"] },
  { name: "Pure White Lotus", cities: ["Stockholm"] },
  { name: "Reindeer Antlers", cities: ["Seward"] },
  { name: "Reishi", cities: ["Edo"] },
  { name: "Rice", cities: ["Muscat", "Basra"] },
  { name: "Rice Wine", cities: ["Edo"] },
  { name: "Rose Oil", cities: ["Malacca", "Amsterdam"] },
  { name: "Rum", cities: ["Hamburg", "Reykjavik", "San Diego"] },
  { name: "Salt", cities: ["Hamburg", "Athens", "Cruz"] },
  { name: "Saffron", cities: ["Bordeaux"] },
  { name: "Scorpion  Venom (Poison)", cities: ["Accra", "Luanda"] },
  { name: "Sculpture", cities: ["London"] },
  { name: "Seafood", cities: ["Athens", "Madeira", "Magellan Supply Station"] },
  { name: "Silk", cities: ["Quanzhou"] },
  { name: "Silk Fabric", cities: ["Zhigu", "Quanzhou"] },
  { name: "Silver", cities: ["Zhigu"] },
  { name: "Silverware", cities: ["Tourane", "Semarang"] },
  { name: "Snake Gallbladder", cities: ["Dakar", "Accra"] },
  { name: "Soybean", cities: ["Algiers"] },
  { name: "Spices", cities: ["Mogadishu", "Aden", "Sri Lanka", "Bombay"] },
  { name: "Stone Carving", cities: ["Quanzhou"] },
  { name: "Sword Ornament", cities: ["London", "Aden"] },
  { name: "Tableware", cities: ["London", "Madeira"] },
  { name: "Tea", cities: ["Quanzhou"] },
  { name: "Tobacco", cities: ["Tourane", "Aden", "Magellan Supply Station", "San Francisco"] },
  { name: "Tomato", cities: ["Beirut", "Malacca"] },
  { name: "Tulip", cities: ["Genoa", "Bordeaux"] },
  { name: "Vegetable", cities: ["Edo", "Amsterdam"] },
  { name: "Velvet", cities: ["Stockholm", "Algiers"] },
  { name: "Violin", cities: ["Istanbul", "Reykjavik", "Cape Town"] },
  { name: "Vodka", cities: ["Seville", "Las Palmas", "Luanda"] },
  { name: "Watch", cities: ["Lisbon", "Venice", "Bordeaux"] },
  { name: "Western Medicine Liqueur", cities: ["Reykjavik"] },
  { name: "Whale Oil", cities: ["Lisbon", "Barcelona", "Las Palmas", "Oslo"] },
  { name: "Wheat", cities: ["Alexander", "Semarang", "Las Palmas", "Sri Lanka"] },
  { name: "Whiskey", cities: ["Venice", "Barcelona", "London", "San Francisco"] },
  { name: "Wood Carvings", cities: ["Amsterdam"] },
  { name: "Wool", cities: ["Suez", "Tripoli", "Cape Town", "Oslo"] },
  { name: "Wool Fabric", cities: ["Lisbon", "Istanbul", "Tripoli"] },
  { name: "Yellow Wine", cities: ["Zhigu"] },
];

export default function TradeGoodsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGoods = useMemo(() => {
    if (!searchTerm) return tradeGoods

    const term = searchTerm.toLowerCase()
    return tradeGoods.filter(
      (good) => good.name.toLowerCase().includes(term) || good.cities.some((city) => city.toLowerCase().includes(term)),
    )
  }, [searchTerm])

  // Group goods by first letter
  const groupedGoods = useMemo(() => {
    const groups: { [key: string]: typeof tradeGoods } = {}

    filteredGoods.forEach((good) => {
      const firstLetter = good.name[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(good)
    })

    // Sort each group
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [filteredGoods])

  const getProfitabilityColor = (price: number) => {
    if (price >= 200) return "text-green-400"
    if (price >= 100) return "text-yellow-400"
    if (price >= 50) return "text-orange-400"
    return "text-slate-300"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Trade Goods Locations</h1>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search goods or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-300 placeholder-slate-400"
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-slate-400">
            Found {filteredGoods.length} goods matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Trade Goods List */}
      <div className="space-y-8">
        {Object.keys(groupedGoods)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <h2 className="text-3xl font-bold text-amber-400 mb-4 border-b border-slate-700 pb-2">{letter}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedGoods[letter].map((good, index) => (
                  <Card
                    key={`${good.name}-${index}`}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-amber-100 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          {good.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Available in:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {good.cities.map((city, cityIndex) => (
                            <Badge key={cityIndex} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <span className="text-xs text-slate-500">
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {filteredGoods.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No goods found</h3>
          <p className="text-slate-500">Try searching for a different good or city name.</p>
        </div>
      )}
    </div>
  )
}
