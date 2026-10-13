import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { gallery } from "@/data/people";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of the campus, facilities and student activities at Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Campus & student life"
        intro={`${gallery.length} photographs published by the college. Select any image to open the viewer.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Photos"
            title="A look inside the campus"
            intro="Use the arrow keys to move between images and Escape to close the viewer."
          />
        </Reveal>

        <div className="mt-10">
          <GalleryLightbox items={gallery} />
        </div>

        <p className="mt-10 rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
          <strong>Captions needed:</strong> these images were migrated from the existing
          website, which provides no captions. Alt text describes only what is visible.
          Please supply event names, dates and locations so each photograph can be captioned
          accurately.
        </p>
      </section>
    </>
  );
}
