import { personal } from "../data/portfolio";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">Tentang Saya</h2>
        <div className="glass-card">
          <p>{personal.bio}</p>
        </div>
      </div>
    </section>
  );
}
