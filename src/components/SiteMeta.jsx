import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSiteSettings } from "../api/publicData";

export default function SiteMeta() {
  const { i18n } = useTranslation();

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await getSiteSettings();

      if (!mounted || !data) return;

      const isEn = i18n.language === "en";

      document.title =
        (isEn
          ? data.site_title_en || data.site_title_id
          : data.site_title_id || data.site_title_en) ||
        data.site_name ||
        "JEMBAR.DEV";

      const description =
        (isEn
          ? data.seo_description_en ||
            data.seo_description_id
          : data.seo_description_id ||
            data.seo_description_en) ||
        "";

      let meta = document.querySelector(
        'meta[name="description"]'
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }

      meta.content = description;

      if (data.favicon_url) {
        let icon = document.querySelector(
          'link[rel="icon"]'
        );

        if (!icon) {
          icon = document.createElement("link");
          icon.rel = "icon";
          document.head.appendChild(icon);
        }

        icon.href = data.favicon_url;
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [i18n.language]);

  return null;
}
