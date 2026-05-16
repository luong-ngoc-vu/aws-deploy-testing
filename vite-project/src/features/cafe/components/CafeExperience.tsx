import { useMemo, useState } from 'react'
import { type CafeLocation, defaultCafeLocation } from '../cafeLocation'
import { useCafeLocation } from '../useCafeLocation'

type FlavorSegment = {
  name: string
  color: string
  notes: string[]
  beans: string[]
}

type CoffeeShop = {
  name: string
  locationId: string
  bean: 'Arabica' | 'Robusta' | 'Blend'
  lat: number
  lon: number
}

type ChartDatum = {
  label: string
  value: number
  detail: string
}

const flavorSegments: FlavorSegment[] = [
  {
    name: 'Acidic',
    color: '#f97316',
    notes: ['Citrus', 'Green apple', 'Tamarind'],
    beans: ['Kenya AA', 'Ethiopia Yirgacheffe'],
  },
  {
    name: 'Sweet',
    color: '#f59e0b',
    notes: ['Honey', 'Caramel', 'Brown sugar'],
    beans: ['Colombia Huila', 'Brazil Cerrado'],
  },
  {
    name: 'Bitter',
    color: '#7c2d12',
    notes: ['Cacao nibs', 'Walnut', 'Dark chocolate'],
    beans: ['Sumatra Mandheling', 'Vietnam Robusta'],
  },
  {
    name: 'Floral',
    color: '#db2777',
    notes: ['Jasmine', 'Rose', 'Elderflower'],
    beans: ['Panama Geisha', 'Ethiopia Sidamo'],
  },
  {
    name: 'Fruity',
    color: '#dc2626',
    notes: ['Berry', 'Stone fruit', 'Grape'],
    beans: ['Natural Ethiopia', 'Costa Rica Tarrazu'],
  },
  {
    name: 'Nutty',
    color: '#92400e',
    notes: ['Almond', 'Hazelnut', 'Peanut butter'],
    beans: ['Brazil Santos', 'Guatemala Antigua'],
  },
]

const presetLocations: CafeLocation[] = [
  {
    id: 'hcm-city',
    label: 'HCM City',
    lat: 10.8231,
    lon: 106.6297,
    source: 'preset',
  },
  {
    id: 'hn-city',
    label: 'HN City',
    lat: 21.0278,
    lon: 105.8342,
    source: 'preset',
  },
  defaultCafeLocation,
  {
    id: 'hue-city',
    label: 'Hue City',
    lat: 16.4637,
    lon: 107.5909,
    source: 'preset',
  },
  {
    id: 'quang-ninh-city',
    label: 'Quang Ninh City',
    lat: 20.9712,
    lon: 107.0448,
    source: 'preset',
  },
]

const shopTemplates = [
  { name: 'Arabica Atelier', bean: 'Arabica' as const, latOffset: 0.018, lonOffset: -0.014 },
  { name: 'Robusta Works', bean: 'Robusta' as const, latOffset: -0.016, lonOffset: 0.018 },
  { name: 'Blend Society', bean: 'Blend' as const, latOffset: 0.011, lonOffset: 0.021 },
]

const coffeeConsumptionData: ChartDatum[] = [
  { label: 'Robusta', value: 62, detail: 'Bold body, phin coffee, milk coffee' },
  { label: 'Arabica', value: 23, detail: 'Da Lat specialty, filter brews' },
  { label: 'Blend', value: 15, detail: 'Balanced daily cafe recipes' },
]

const popularVietnamCoffeeData: ChartDatum[] = [
  { label: 'Ca phe sua da', value: 92, detail: 'Iconic iced condensed milk coffee' },
  { label: 'Bac xiu', value: 78, detail: 'Milk-forward Saigon favorite' },
  { label: 'Ca phe den da', value: 71, detail: 'Strong black iced robusta' },
  { label: 'Ca phe trung', value: 58, detail: 'Creamy Hanoi egg coffee' },
]

function describeSlice(index: number, total: number, innerRadius: number, outerRadius: number) {
  const center = 120
  const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2
  const endAngle = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  const outerStart = {
    x: center + outerRadius * Math.cos(startAngle),
    y: center + outerRadius * Math.sin(startAngle),
  }
  const outerEnd = {
    x: center + outerRadius * Math.cos(endAngle),
    y: center + outerRadius * Math.sin(endAngle),
  }
  const innerEnd = {
    x: center + innerRadius * Math.cos(endAngle),
    y: center + innerRadius * Math.sin(endAngle),
  }
  const innerStart = {
    x: center + innerRadius * Math.cos(startAngle),
    y: center + innerRadius * Math.sin(startAngle),
  }

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

function FlavorWheel() {
  const [selectedFlavor, setSelectedFlavor] = useState(flavorSegments[0])

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-center">
        <svg
          className="mx-auto size-60"
          viewBox="0 0 240 240"
          role="img"
          aria-label="Coffee flavor wheel"
        >
          {flavorSegments.map((segment, index) => (
            <path
              className="cursor-pointer stroke-white stroke-[3] transition hover:brightness-110"
              d={describeSlice(index, flavorSegments.length, 44, 108)}
              fill={segment.color}
              key={segment.name}
              onClick={() => setSelectedFlavor(segment)}
            />
          ))}
          <circle cx="120" cy="120" r="38" className="fill-white dark:fill-stone-950" />
          <text
            className="fill-stone-950 text-[13px] font-bold dark:fill-stone-100"
            textAnchor="middle"
            x="120"
            y="124"
          >
            Flavor
          </text>
        </svg>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Coffee Flavor Wheel
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold">{selectedFlavor.name}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold">Notes</p>
              <ul className="mt-2 space-y-1 text-sm text-stone-600 dark:text-stone-300">
                {selectedFlavor.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Bean suggestions</p>
              <ul className="mt-2 space-y-1 text-sm text-stone-600 dark:text-stone-300">
                {selectedFlavor.beans.map((bean) => (
                  <li key={bean}>{bean}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function HorizontalBarChart({
  title,
  eyebrow,
  description,
  data,
}: {
  title: string
  eyebrow: string
  description: string
  data: ChartDatum[]
}) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{description}</p>
      <div className="mt-5 space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold">{item.label}</span>
              <span className="font-bold text-amber-700 dark:text-amber-300">{item.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{item.detail}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function getCoffeeShopsForLocation(location: CafeLocation): CoffeeShop[] {
  return shopTemplates.map((shop) => ({
    name: `${shop.name} ${location.label}`,
    locationId: location.id,
    bean: shop.bean,
    lat: Number((location.lat + shop.latOffset).toFixed(5)),
    lon: Number((location.lon + shop.lonOffset).toFixed(5)),
  }))
}

function getMapEmbedUrl(location: CafeLocation) {
  const delta = 0.055
  const bbox = [
    location.lon - delta,
    location.lat - delta,
    location.lon + delta,
    location.lat + delta,
  ].join(',')

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lon}`
}

function CoffeeMap() {
  const { currentLocation } = useCafeLocation()
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [beanFilter, setBeanFilter] = useState('All')
  const cityOptions = useMemo(() => {
    const hasDetectedLocation = currentLocation.source === 'detected'
    return hasDetectedLocation ? [currentLocation, ...presetLocations] : presetLocations
  }, [currentLocation])
  const selectedLocation =
    cityOptions.find((location) => location.id === selectedLocationId) || currentLocation
  const coffeeShops = useMemo(() => getCoffeeShopsForLocation(selectedLocation), [selectedLocation])
  const filteredShops = coffeeShops.filter((shop) => {
    const matchesQuery = shop.name.toLowerCase().includes(query.toLowerCase())
    const matchesBean = beanFilter === 'All' || shop.bean === beanFilter
    return matchesQuery && matchesBean
  })

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
        Specialty Map
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">Coffee near you</h3>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
        Default map follows the location allowed in the weather widget. Pick a city to explore
        sample specialty coffee spots by bean type.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-950">
          <iframe
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapEmbedUrl(selectedLocation)}
            title={`OpenStreetMap for ${selectedLocation.label}`}
          />
        </div>
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {cityOptions.map((location) => (
              <button
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  selectedLocation.id === location.id
                    ? 'bg-stone-950 text-white dark:bg-amber-300 dark:text-stone-950'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200'
                }`}
                key={location.id}
                onClick={() => setSelectedLocationId(location.id)}
                type="button"
              >
                {location.label}
              </button>
            ))}
          </div>
          <input
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search coffee shops"
            value={query}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {['All', 'Arabica', 'Robusta', 'Blend'].map((bean) => (
              <button
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  beanFilter === bean
                    ? 'bg-stone-950 text-white dark:bg-amber-300 dark:text-stone-950'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200'
                }`}
                key={bean}
                onClick={() => setBeanFilter(bean)}
                type="button"
              >
                {bean}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {filteredShops.map((shop) => (
              <div
                className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm dark:border-stone-700 dark:bg-stone-950"
                key={shop.name}
              >
                <p className="font-semibold">{shop.name}</p>
                <p className="text-stone-600 dark:text-stone-300">
                  {shop.bean} / {shop.lat}, {shop.lon}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function CafeExperience() {
  return (
    <section
      className="px-4 py-20 text-stone-950 transition-colors sm:px-6 lg:px-8 dark:bg-stone-950 dark:text-stone-100"
      id="coffee-tools"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              Vietnam coffee insights
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
              What Vietnam drinks most
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Compare the beans behind daily cafe culture and the drinks people come back for across
              Vietnam.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <FlavorWheel />
          <div className="grid gap-6 lg:grid-cols-2">
            <HorizontalBarChart
              data={coffeeConsumptionData}
              description="A simplified view of how common bean categories show up in Vietnamese cafe menus."
              eyebrow="Consumption mix"
              title="Popular coffee types"
            />
            <HorizontalBarChart
              data={popularVietnamCoffeeData}
              description="A simple popularity snapshot of familiar Vietnamese coffee orders."
              eyebrow="Most ordered"
              title="Favorite drinks in Vietnam"
            />
          </div>
          <CoffeeMap />
        </div>
      </div>
    </section>
  )
}
