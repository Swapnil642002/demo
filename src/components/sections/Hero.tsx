import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const heroSlides = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Shri Shaktimayi Ayurvedic Pharmacy and Nursing College campus building",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Students and faculty at Shri Shaktimayi in Azamgarh",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Institutional facilities at Shri Shaktimayi Ayurvedic Pharmacy and Nursing College",
  },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-navy-900">
      {/* Single static image — no autoplay video, no parallax. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroSlides[0].src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/78" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
        />
      </div>

      <div className="container-page py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase sm:text-sm">
              Est. 2015 · Azamgarh, Uttar Pradesh
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="hero-heading"
              className="mt-5 font-serif text-3xl leading-[1.12] font-bold text-ivory-50 text-balance-tight sm:text-5xl lg:text-6xl"
            >
              Shaping pharmacists and nurses for tomorrow&rsquo;s healthcare
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <span aria-hidden="true" className="mt-6 block rule-gold" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-200 sm:text-lg">
              Shri Shaktimayi Ayurvedic Pharmacy &amp; Nursing College offers two diploma
              programmes — General Nursing and Midwifery, and D.Pharma in Ayurveda — taught
              with a focus on practical, hands-on healthcare training.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/admissions" variant="gold" className="px-7 py-4 text-base">
                Apply for admission
              </ButtonLink>
              <ButtonLink href="/courses" variant="outlineLight" className="px-7 py-4 text-base">
                Explore courses
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-ivory-500/30 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-ivory-300 uppercase">Programmes</dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-300">2</dd>
              </div>
              <div>
                <dt className="text-xs text-ivory-300 uppercase">Established</dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-300">2015</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs text-ivory-300 uppercase">Location</dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-300">Azamgarh</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ivory-400">
              Figures above are structural facts about the institution, not performance
              statistics.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Secondary hero imagery, lazy-loaded below the fold. */}
      <div className="hidden border-t border-ivory-500/20 sm:block">
        <div className="container-page grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
          {heroSlides.slice(1).map((s) => (
            <div key={s.src} className="relative aspect-[16/7] overflow-hidden rounded-lg">
              <Image
                src={s.src}
                alt={s.alt}
                width={1000}
                height={563}
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 33vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="flex items-center justify-center rounded-lg border border-ivory-500/30 px-4 text-center">
            <Link
              href="/gallery"
              className="text-sm font-semibold text-gold-300 link-underline hover:text-gold-400"
            >
              View full gallery →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
