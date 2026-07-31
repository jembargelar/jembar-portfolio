import { personal } from "../data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10"
    >
      <div className="flex-1">

        <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm">
          Administrative & Data Entry Specialist
        </span>

        <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
          {personal.name}
        </h1>

        <h2 className="text-2xl text-blue-400 mt-3">
          {personal.title}
        </h2>

        <p className="text-gray-300 mt-6 leading-8 max-w-xl">
          {personal.about}
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">

          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition"
          >
            Lihat Portfolio
          </a>

          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Hubungi Saya
          </a>

        </div>

      </div>

      <div className="flex-1 flex justify-center">

        <img
          src="/hero.png"
          alt={personal.name}
          className="w-72 md:w-96 rounded-3xl shadow-2xl"
        />

      </div>

    </section>
  );
}

