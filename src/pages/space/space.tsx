import { useEffect } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
// @ts-ignore
import fjGallery from "flickr-justified-gallery";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import { Navbar } from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { useGetSpacesQuery } from "@/api/spaces/spacesApi.ts";

export default function Space() {
  const { data: spaces } = useGetSpacesQuery();

  useEffect(() => {
    if (!spaces?.length) return;

    fjGallery(document.querySelectorAll(".gallery"), {
      itemSelector: ".gallery__item",
      rowHeight: 200,
      gutter: 4,
      lastRow: "justify",
    });
  }, [spaces]);

  return (
    <div>
      <Navbar />
      <main>
        <LightGallery
          elementClassNames="gallery"
          mode="lg-fade"
          plugins={[lgZoom, lgVideo]}
          thumbnail={true}
          zoom={true}
        >
          {spaces &&
            spaces.map((s) => (
              <a
                key={s.id}
                className="gallery__item"
                data-lg-size="1200-900" // or real size if available
                href={s.image}
              >
                <img alt={s.name || "space"} src={s.image} />
              </a>
            ))}
        </LightGallery>
      </main>
      <Footer />
    </div>
  );
}
