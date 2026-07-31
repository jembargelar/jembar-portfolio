import { personal } from "../data/portfolio";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0B1120]/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white">
            {personal.name}
          </h1>
          <p className="text-xs text-blue-400">
            {personal.title}
          </p>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-300">

          <li>
            <a href="#home" className="hover:text-blue-400 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-blue-400 transition">
              About
            </a>
          </li>

          <li>
            <a href="#experience" className="hover:text-blue-400 transition">
              Experience
            </a>
          </li>

          <li>
            <a href="#skills" className="hover:text-blue-400 transition">
              Skills
            </a>
          </li>

          <li>
            <a href="#projects" className="hover:text-blue-400 transition">
              Projects
            </a>
          </li>

          <li>
            <a href="#education" className="hover:text-blue-400 transition">
              Education
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-400 transition">
              Contact
            </a>
          </li>

        </ul>

        {/* Button */}
        <a
          href={personal.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          WhatsApp
        </a>

      </div>
    </nav>
  );
}
