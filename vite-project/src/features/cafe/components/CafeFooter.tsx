export default function CafeFooter() {
  return (
    <footer
      className="bg-[#fbf7ef] px-4 py-12 transition-colors sm:px-6 lg:px-8 dark:bg-stone-950"
      id="contact"
    >
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-stone-200 pt-10 md:grid-cols-3 dark:border-stone-700">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-stone-100">
            Góc Cà Phê
          </h2>
          <p className="mt-3 max-w-sm text-stone-600 dark:text-stone-300">
            42 Nguyễn Huệ, phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
            <br />
            hello@hearthandbean.vn
            <br />
            +84 28 3822 1845
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950 dark:text-stone-100">Giờ mở cửa</h3>
          <p className="mt-3 text-stone-600 dark:text-stone-300">
            Thứ 2 - Thứ 6: 7:00 - 18:00
            <br />
            Thứ 7 - Chủ nhật: 8:00 - 17:00
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-950 dark:text-stone-100">Mạng xã hội</h3>
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
