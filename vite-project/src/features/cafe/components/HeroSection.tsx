export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden" id="home" aria-labelledby="hero-heading">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(28, 20, 14, 0.82), rgba(28, 20, 14, 0.42)), url('https://images.unsplash.com/photo-1760084459386-f389fc684921?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="mx-auto flex min-h-[calc(100svh-73px)] max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-amber-200">
            Cà phê rang tại Việt Nam và bánh mới mỗi ngày
          </p>
          <h1
            className="font-serif text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-7xl"
            id="hero-heading"
          >
            Một góc ấm cho những buổi sáng chậm rãi.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-100">
            Thưởng thức cà phê phin, espresso từ hạt Việt Nam và những mẻ bánh mới ra lò trong không
            gian ấm cúng giữa thành phố.
          </p>
          <a
            className="mt-8 inline-flex rounded-md bg-amber-300 px-6 py-3 font-bold text-stone-950 shadow-xl shadow-stone-950/20 transition hover:bg-amber-200"
            href="#menu"
          >
            Xem menu
          </a>
        </div>
      </div>
    </section>
  )
}
