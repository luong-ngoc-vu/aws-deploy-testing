export default function About() {
  return (
    <section className="bg-stone-950 px-4 py-20 text-stone-100 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-md">
          <img
            className="h-full min-h-80 w-full object-cover"
            src="https://images.unsplash.com/photo-1745210358756-e7f7ff40e506?auto=format&fit=crop&w=1000&q=80"
            alt="Cà phê Việt Nam đang được pha bằng phin"
            loading="lazy"
          />
        </div>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
            Về chúng tôi
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Tôn trọng hạt cà phê ngon và những khoảng nghỉ thật chậm.
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            Góc Cà Phê làm việc cùng các nhà rang địa phương, ưu tiên nguồn hạt rõ ràng theo mùa từ
            những nông hộ nhỏ. Barista cân chỉnh từng mẻ pha mỗi ngày, còn quầy bánh thay đổi theo
            trái cây, sữa và nguyên liệu trong nước.
          </p>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Bên trong là những góc ngồi yên tĩnh, bàn chung, ánh sáng dịu và sự hiếu khách đủ gần
            gũi để quán cà phê trong khu phố trở thành phòng khách thứ hai.
          </p>
        </div>
      </div>
    </section>
  )
}
