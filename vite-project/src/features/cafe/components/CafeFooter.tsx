export default function CafeFooter() {
  return (
    <footer
      className="bg-[#fbf7ef] px-4 py-12 transition-colors sm:px-6 lg:px-8 dark:bg-stone-950"
      id="contact"
    >
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-stone-200 pt-10 md:grid-cols-3 dark:border-stone-700">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-stone-100">
            Hearth & Bean
          </h2>
          <p className="mt-3 max-w-sm text-stone-600 dark:text-stone-300">
            42 Nguyen Hue, Ben Nghe, District 1, Ho Chi Minh City
            <br />
            hello@hearthandbean.vn
            <br />
            +84 28 3822 1845
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950 dark:text-stone-100">Hours</h3>
          <p className="mt-3 text-stone-600 dark:text-stone-300">
            Mon-Fri: 7:00 AM - 6:00 PM
            <br />
            Sat-Sun: 8:00 AM - 5:00 PM
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950 dark:text-stone-100">Social</h3>
          <div className="mt-3 flex gap-4">
            <a
              className="font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
              href="#contact"
            >
              Instagram
            </a>
            <a
              className="font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
              href="#contact"
            >
              Facebook
            </a>
            <a
              className="font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
              href="#contact"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
