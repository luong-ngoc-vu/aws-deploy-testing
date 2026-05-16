import { useMemo, useState } from 'react'
import { type CafeLocation, defaultCafeLocation } from '../cafeLocation'
import { useCafeLocation } from '../useCafeLocation'

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

const vietnamCoffeeBrands: ChartDatum[] = [
  {
    label: 'Highlands Coffee',
    value: 95,
    detail:
      'Chuỗi cà phê Việt Nam lớn, nổi bật với cà phê sữa đá, đồ uống kiểu phin và độ phủ rộng ở nhiều đô thị.',
  },
  {
    label: 'Trung Nguyen Legend',
    value: 88,
    detail:
      'Thương hiệu cà phê Việt Nam lâu đời với cà phê rang, G7 và hệ thống không gian cà phê.',
  },
  {
    label: 'Phuc Long',
    value: 78,
    detail: 'Thương hiệu trà và cà phê quen thuộc, có độ nhận diện cao tại các thành phố lớn.',
  },
  {
    label: 'The Coffee House',
    value: 72,
    detail:
      'Chuỗi nội địa hiện đại, tập trung vào không gian ngồi thoải mái, đặt món qua app và đồ uống hằng ngày.',
  },
  {
    label: 'Cong Ca Phe',
    value: 66,
    detail:
      'Thương hiệu cà phê mang màu sắc hoài niệm Việt Nam, nổi tiếng với cà phê cốt dừa và không gian xanh lính.',
  },
  {
    label: 'Katinat',
    value: 61,
    detail:
      'Chuỗi đồ uống xuất phát từ Sài Gòn, tăng trưởng nhanh và được nhiều khách trẻ yêu thích.',
  },
]

const presetLocations: CafeLocation[] = [
  {
    id: 'hcm-city',
    label: 'TP. Hồ Chí Minh',
    lat: 10.8231,
    lon: 106.6297,
    source: 'preset',
  },
  {
    id: 'hn-city',
    label: 'Hà Nội',
    lat: 21.0278,
    lon: 105.8342,
    source: 'preset',
  },
  defaultCafeLocation,
  {
    id: 'hue-city',
    label: 'Huế',
    lat: 16.4637,
    lon: 107.5909,
    source: 'preset',
  },
  {
    id: 'quang-ninh-city',
    label: 'Quảng Ninh',
    lat: 20.9712,
    lon: 107.0448,
    source: 'preset',
  },
]

const shopTemplates = [
  { name: 'Xưởng Arabica', bean: 'Arabica' as const, latOffset: 0.018, lonOffset: -0.014 },
  { name: 'Góc Robusta', bean: 'Robusta' as const, latOffset: -0.016, lonOffset: 0.018 },
  { name: 'Nhà Blend', bean: 'Blend' as const, latOffset: 0.011, lonOffset: 0.021 },
]

const coffeeConsumptionData: ChartDatum[] = [
  { label: 'Robusta', value: 62, detail: 'Đậm vị, hợp cà phê phin và cà phê sữa' },
  { label: 'Arabica', value: 23, detail: 'Hạt Đà Lạt, hợp các kiểu pha nhẹ và sạch vị' },
  { label: 'Blend', value: 15, detail: 'Công thức phối trộn cân bằng cho menu hằng ngày' },
]

const popularVietnamCoffeeData: ChartDatum[] = [
  { label: 'Cà phê sữa đá', value: 92, detail: 'Món cà phê sữa đặc có đá mang tính biểu tượng' },
  { label: 'Bạc xỉu', value: 78, detail: 'Món kiểu Sài Gòn nhiều sữa, nhẹ vị cà phê' },
  { label: 'Cà phê đen đá', value: 71, detail: 'Robusta đá đậm, gọn và tỉnh táo' },
  { label: 'Cà phê trứng', value: 58, detail: 'Cà phê trứng Hà Nội béo mịn' },
]

const beanFilterLabels = {
  All: 'Tất cả',
  Arabica: 'Arabica',
  Robusta: 'Robusta',
  Blend: 'Blend',
} as const

function BrandLeaderboard() {
  const [selectedBrand, setSelectedBrand] = useState(vietnamCoffeeBrands[0])
  const maxValue = Math.max(...vietnamCoffeeBrands.map((brand) => brand.value))

  return (
    <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Thương hiệu cà phê Việt Nam
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold">Những cái tên nổi bật</h3>
          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
            Một góc nhìn dễ nhận biết hơn về các thương hiệu và chuỗi cà phê lớn tại Việt Nam.
          </p>
          <div className="mt-5 space-y-3">
            {vietnamCoffeeBrands.map((brand) => (
              <button
                className={`w-full rounded-md border p-3 text-left transition ${
                  selectedBrand.label === brand.label
                    ? 'border-amber-400 bg-amber-50 dark:border-amber-300 dark:bg-stone-800'
                    : 'border-stone-200 bg-stone-50 hover:border-amber-300 dark:border-stone-700 dark:bg-stone-950'
                }`}
                key={brand.label}
                onClick={() => setSelectedBrand(brand)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold">{brand.label}</span>
                  <span className="font-bold text-amber-700 dark:text-amber-300">
                    {brand.value}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${(brand.value / maxValue) * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md bg-stone-950 p-5 text-white dark:bg-amber-300 dark:text-stone-950">
          <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-75">
            Thương hiệu đang chọn
          </p>
          <h4 className="mt-2 font-serif text-3xl font-bold">{selectedBrand.label}</h4>
          <p className="mt-4 leading-7">{selectedBrand.detail}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-md bg-white/10 p-3 dark:bg-stone-950/10">
              <p className="text-2xl font-bold">{selectedBrand.value}</p>
              <p className="opacity-75">Chỉ số</p>
            </div>
            <div className="rounded-md bg-white/10 p-3 dark:bg-stone-950/10">
              <p className="text-2xl font-bold">VN</p>
              <p className="opacity-75">Thị trường</p>
            </div>
            <div className="rounded-md bg-white/10 p-3 dark:bg-stone-950/10">
              <p className="text-2xl font-bold">Cafe</p>
              <p className="opacity-75">Nhóm</p>
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
  const [beanFilter, setBeanFilter] = useState<keyof typeof beanFilterLabels>('All')
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
        Bản đồ cà phê đặc sản
      </p>
      <h3 className="mt-2 font-serif text-3xl font-bold">Cà phê gần bạn</h3>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
        Bản đồ mặc định đi theo vị trí bạn cho phép ở widget thời tiết. Chọn một thành phố để xem
        các điểm cà phê mẫu theo loại hạt.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-950">
          <iframe
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapEmbedUrl(selectedLocation)}
            title={`Bản đồ OpenStreetMap cho ${selectedLocation.label}`}
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
            placeholder="Tìm quán cà phê"
            value={query}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(beanFilterLabels).map((bean) => (
              <button
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  beanFilter === bean
                    ? 'bg-stone-950 text-white dark:bg-amber-300 dark:text-stone-950'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200'
                }`}
                key={bean}
                onClick={() => setBeanFilter(bean as keyof typeof beanFilterLabels)}
                type="button"
              >
                {beanFilterLabels[bean as keyof typeof beanFilterLabels]}
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
              Góc nhìn cà phê Việt Nam
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
              Người Việt uống gì nhiều nhất
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              So sánh các loại hạt đứng sau văn hóa cà phê hằng ngày và những món được yêu thích ở
              Việt Nam.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <BrandLeaderboard />
          <div className="grid gap-6 lg:grid-cols-2">
            <HorizontalBarChart
              data={coffeeConsumptionData}
              description="Góc nhìn đơn giản về cách các nhóm hạt phổ biến xuất hiện trong menu cà phê Việt Nam."
              eyebrow="Tỷ trọng tiêu thụ"
              title="Loại hạt phổ biến"
            />
            <HorizontalBarChart
              data={popularVietnamCoffeeData}
              description="Một lát cắt đơn giản về những món cà phê Việt quen thuộc được gọi nhiều."
              eyebrow="Món được gọi nhiều"
              title="Đồ uống được ưa chuộng"
            />
          </div>
          <CoffeeMap />
        </div>
      </div>
    </section>
  )
}
