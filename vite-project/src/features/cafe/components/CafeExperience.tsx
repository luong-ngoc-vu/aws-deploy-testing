import { type FormEvent, useMemo, useState } from 'react'
import { type CafeLocation, defaultCafeLocation } from '../cafeLocation'
import { useCafeLocation } from '../useCafeLocation'

type FlavorSegment = {
  name: string
  color: string
  notes: string[]
  beans: string[]
}

type JournalEntry = {
  id: number
  origin: string
  process: string
  roast: string
  rating: number
}

type CoffeeShop = {
  name: string
  locationId: string
  bean: 'Arabica' | 'Robusta' | 'Blend'
  lat: number
  lon: number
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

function BrewingCalculator() {
  const [coffeeGrams, setCoffeeGrams] = useState(20)
  const [ratio, setRatio] = useState(15)
  const waterGrams = coffeeGrams * ratio

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
        Vietnamese brew guide
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">Water and coffee calculator</h3>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
        Start with a familiar Vietnamese specialty recipe: 20g coffee at 1:15 for filter brewers.
        Increase coffee for a stronger phin-style cup or raise the ratio for a cleaner pour-over.
      </p>
      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="flex justify-between text-sm font-semibold">
            Coffee <span>{coffeeGrams}g</span>
          </span>
          <input
            className="mt-2 w-full accent-amber-600"
            max="60"
            min="10"
            onChange={(event) => setCoffeeGrams(Number(event.target.value))}
            type="range"
            value={coffeeGrams}
          />
        </label>
        <label className="block">
          <span className="flex justify-between text-sm font-semibold">
            Ratio <span>1:{ratio}</span>
          </span>
          <input
            className="mt-2 w-full accent-amber-600"
            max="20"
            min="12"
            onChange={(event) => setRatio(Number(event.target.value))}
            type="range"
            value={ratio}
          />
        </label>
        <div className="rounded-md bg-amber-100 p-4 text-stone-950">
          <p className="text-sm font-semibold">Water needed</p>
          <p className="text-4xl font-bold">{waterGrams}g</p>
          <p className="mt-2 text-sm">
            Try this with Vietnamese Arabica from Da Lat, honey Robusta from Gia Lai, or a balanced
            Arabica-Robusta blend from Cau Dat.
          </p>
        </div>
      </div>
    </article>
  )
}

function TastingJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: 1, origin: 'Ethiopia', process: 'Natural', roast: 'Light', rating: 92 },
  ])
  const [formValues, setFormValues] = useState({
    origin: '',
    process: 'Washed',
    roast: 'Medium',
    rating: 85,
  })

  const averageRating = useMemo(() => {
    if (entries.length === 0) return 0
    return Math.round(entries.reduce((total, entry) => total + entry.rating, 0) / entries.length)
  }, [entries])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formValues.origin.trim()) {
      return
    }

    setEntries((currentEntries) => [
      {
        id: Date.now(),
        origin: formValues.origin.trim(),
        process: formValues.process,
        roast: formValues.roast,
        rating: formValues.rating,
      },
      ...currentEntries,
    ])
    setFormValues((currentValues) => ({ ...currentValues, origin: '' }))
  }

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Tasting Journal
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold">Recent cups</h3>
        </div>
        <div className="rounded-md bg-stone-950 px-3 py-2 text-center text-white dark:bg-amber-300 dark:text-stone-950">
          <p className="text-xs font-semibold">Avg</p>
          <p className="text-xl font-bold">{averageRating}</p>
        </div>
      </div>

      <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
        <input
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950"
          onChange={(event) =>
            setFormValues((currentValues) => ({
              ...currentValues,
              origin: event.target.value,
            }))
          }
          placeholder="Origin"
          value={formValues.origin}
        />
        <select
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950"
          onChange={(event) =>
            setFormValues((currentValues) => ({
              ...currentValues,
              process: event.target.value,
            }))
          }
          value={formValues.process}
        >
          <option>Washed</option>
          <option>Natural</option>
          <option>Honey</option>
          <option>Anaerobic</option>
        </select>
        <select
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950"
          onChange={(event) =>
            setFormValues((currentValues) => ({
              ...currentValues,
              roast: event.target.value,
            }))
          }
          value={formValues.roast}
        >
          <option>Light</option>
          <option>Medium</option>
          <option>Dark</option>
        </select>
        <label className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950">
          Rating {formValues.rating}
          <input
            className="mt-1 w-full accent-amber-600"
            max="100"
            min="60"
            onChange={(event) =>
              setFormValues((currentValues) => ({
                ...currentValues,
                rating: Number(event.target.value),
              }))
            }
            type="range"
            value={formValues.rating}
          />
        </label>
        <button
          className="rounded-md bg-amber-300 px-4 py-2 font-bold text-stone-950 transition hover:bg-amber-200 sm:col-span-2"
          type="submit"
        >
          Add tasting note
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {entries.map((entry) => (
          <div
            className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm dark:border-stone-700 dark:bg-stone-950"
            key={entry.id}
          >
            <div>
              <p className="font-semibold">{entry.origin}</p>
              <p className="text-stone-600 dark:text-stone-300">
                {entry.process} / {entry.roast}
              </p>
            </div>
            <span className="text-lg font-bold">{entry.rating}</span>
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
              Brew Vietnamese coffee better
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
              Practical tools for flavor, recipes, and local cafes
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Explore flavor notes, calculate a simple brew recipe, log tasting notes, and compare
              specialty coffee options across Vietnam's major coffee cities.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <FlavorWheel />
          <div className="grid gap-6 lg:grid-cols-2">
            <BrewingCalculator />
            <TastingJournal />
          </div>
          <CoffeeMap />
        </div>
      </div>
    </section>
  )
}
