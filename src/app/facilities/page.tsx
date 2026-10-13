import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { facilities } from "@/data/facilities";

export const metadata: Metadata = {
  title: "Campus Facilities",
  description:
    "Campus facilities and practical learning environments at Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh — laboratories, library, clinical exposure and sports.",
  alternates: { canonical: "/facilities" },
};

export default function FacilitiesPage() {
  const unconfirmed = facilities.filter((f) => !f.confirmed);

  return (
    <>
      <PageHeader
        eyebrow="Campus"
        title="Facilities & practical learning"
        intro="Both programmes are built around supervised practical work, supported by the campus and its attached hospital setting."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Campus" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => (
            <Reveal key={facility.id} delay={(i % 3) * 0.08} as="article">
              <article className="surface h-full overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3] bg-ivory-200">
                  <Image
                    src={facility.image.src}
                    alt={facility.image.alt}
                    width={facility.image.width}
                    height={facility.image.height}
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                  {facility.confirmed ? (
                    <span className="absolute top-3 left-3 rounded-full bg-success-700 px-2.5 py-1 text-[11px] font-semibold text-white">
                      Confirmed
                    </span>
                  ) : null}
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="font-serif text-lg font-bold text-navy-900">
                    {facility.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {facility.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {unconfirmed.length > 0 ? (
          <div className="mt-10 rounded-xl border border-gold-500 bg-ivory-100 p-6">
            <h2 className="font-serif text-lg font-bold text-navy-900">
              Awaiting confirmation
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {unconfirmed.length} of {facilities.length} facility descriptions are adapted
              from the existing website and have not been confirmed by the college. They are
              marked without the &ldquo;Confirmed&rdquo; badge. Please verify each one —
              particularly whether a library, sports facility and simulation/lab capacity
              exist as described — before launch.
            </p>
          </div>
        ) : null}
      </section>

      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="See it for yourself"
            title="Visit the campus"
            intro="Photos of the campus are available in the gallery, and directions are on the contact page."
            align="center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/gallery" variant="gold">
              View gallery
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Get directions
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
