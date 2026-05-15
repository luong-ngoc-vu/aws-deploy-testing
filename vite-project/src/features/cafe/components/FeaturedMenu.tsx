const menuItems = [
  {
    name: 'Honey Oat Latte',
    description: 'Double espresso, steamed oat milk, wildflower honey, and cinnamon.',
    price: '$5.75',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Maple Cardamom Cappuccino',
    description: 'A creamy cappuccino finished with maple and a soft spice blend.',
    price: '$5.25',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Almond Croissant',
    description: 'Buttery layers filled with almond cream and toasted sliced almonds.',
    price: '$4.95',
    image:
      'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Berry Morning Tart',
    description: 'Vanilla custard, market berries, and crisp pastry with lemon zest.',
    price: '$6.25',
    image:
      'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=700&q=80',
  },
]

export default function FeaturedMenu() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="menu">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
            Popular picks
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-stone-950 sm:text-5xl">
            Featured Menu
          </h2>
          <p className="mt-4 text-stone-600">
            House favorites for coffee breaks, working afternoons, and weekend catch-ups.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <article
              className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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
                  <h3 className="font-serif text-xl font-bold text-stone-950">{item.name}</h3>
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-sm font-bold text-amber-900">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm leading-6 text-stone-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
