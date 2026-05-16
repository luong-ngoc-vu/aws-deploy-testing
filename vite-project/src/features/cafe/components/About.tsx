export default function About() {
  return (
    <section className="bg-stone-950 px-4 py-20 text-stone-100 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-md">
          <img
            className="h-full min-h-80 w-full object-cover"
            src="https://images.unsplash.com/photo-1760084459386-f389fc684921?auto=format&fit=crop&w=1000&q=80"
            alt="Cozy cafe interior in Ben Tre, Vietnam"
            loading="lazy"
          />
        </div>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">About us</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Built around better beans and better pauses.
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            Hearth & Bean partners with regional roasters who source transparent, seasonal lots from
            small farms. Our baristas dial in each coffee daily, and the pastry case changes with
            local fruit, dairy, and grains.
          </p>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Inside, you will find quiet corners, communal tables, soft lighting, and the kind of
            steady hospitality that makes a neighborhood cafe feel like a second living room.
          </p>
        </div>
      </div>
    </section>
  )
}
