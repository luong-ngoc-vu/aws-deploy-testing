export default function CafeFooter() {
  return (
    <footer className="bg-[#fbf7ef] px-4 py-12 sm:px-6 lg:px-8" id="contact">
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-stone-200 pt-10 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-950">Hearth & Bean</h2>
          <p className="mt-3 max-w-sm text-stone-600">
            214 Maple Street, Seattle, WA
            <br />
            hello@hearthandbean.example
            <br />
            (206) 555-0184
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950">Hours</h3>
          <p className="mt-3 text-stone-600">
            Mon-Fri: 7:00 AM - 6:00 PM
            <br />
            Sat-Sun: 8:00 AM - 5:00 PM
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950">Social</h3>
          <div className="mt-3 flex gap-4">
            <a className="font-semibold text-stone-600 hover:text-stone-950" href="#contact">
              Instagram
            </a>
            <a className="font-semibold text-stone-600 hover:text-stone-950" href="#contact">
              Facebook
            </a>
            <a className="font-semibold text-stone-600 hover:text-stone-950" href="#contact">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
