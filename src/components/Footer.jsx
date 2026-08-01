import { personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} {personal.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

