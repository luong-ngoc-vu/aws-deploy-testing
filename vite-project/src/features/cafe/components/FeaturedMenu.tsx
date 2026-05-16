const menuItems = [
  {
    name: 'Cà phê sữa đá',
    description: 'Robusta Việt Nam pha đậm, hòa cùng sữa đặc và phục vụ trên đá.',
    price: '45.000 VND',
    image:
      'https://images.unsplash.com/photo-1745210358756-e7f7ff40e506?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Bạc xỉu',
    description: 'Cà phê sữa kiểu Sài Gòn nhẹ vị cà phê, béo thơm và dễ uống.',
    price: '49.000 VND',
    image:
      'https://images.unsplash.com/photo-1745816743825-b1be5b23e528?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Cà phê trứng',
    description: 'Cà phê trứng Hà Nội với lớp kem trứng mịn, cacao và nền robusta đậm.',
    price: '65.000 VND',
    image:
      'https://images.unsplash.com/photo-1760769214612-aff51cd270bd?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Phin Arabica Đà Lạt',
    description: 'Arabica Đà Lạt pha phin chậm, hương cam nhẹ, hậu vị caramel và sạch miệng.',
    price: '59.000 VND',
    image:
      'https://images.unsplash.com/photo-1660287987708-36a96179b6db?auto=format&fit=crop&w=700&q=80',
  },
]

export default function FeaturedMenu() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="menu">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
            Món được yêu thích
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-950 sm:text-5xl dark:text-stone-100">
            Menu cà phê Việt Nam
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-300">
            Những hương vị quen thuộc từ robusta Việt Nam, arabica Đà Lạt, sữa đặc và cách pha phin
            truyền thống.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <article
              className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-700 dark:bg-stone-900"
              key={item.name}
            >
              <img
                className="h-48 w-full object-cover"
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl font-bold text-stone-950 dark:text-stone-100">
                    {item.name}
                  </h3>
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-sm font-bold text-amber-900">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
