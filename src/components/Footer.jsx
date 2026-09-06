import { useEffect, useState } from "react";
import { getHeroContent } from "../api/publicData";

export default function Footer() {
  const [heroName, setHeroName] = useState(
    "Jembar Gelar Kusumah Wibawa"
  );

  useEffect(() => {
    let mounted = true;

    getHeroContent().then(({ data }) => {
      if (mounted && data?.name) {
        setHeroName(data.name);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} {heroName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

