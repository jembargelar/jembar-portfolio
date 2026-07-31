import { personal } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="section">
      <h2>Tentang Saya</h2>
      <p>
        Halo, saya <strong>{personal.name}</strong>, berdomisili di <strong>{personal.location}</strong>.
      </p>
      <p>{personal.bio}</p>
      <p>
        Saya berorientasi pada efisiensi, kerapihan pengarsipan, serta menyukai pemanfaatan teknologi baru untuk membangun sistem administrasi yang efektif.
      </p>
    </section>
  );
}
