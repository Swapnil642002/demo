import Image from "next/image";
import Link from "next/link";
import { site, contact } from "@/data/site";
import { courses } from "@/data/courses";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-navy-900 text-ivory-200">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt=""
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover"
            />
            <div>
              <p className="font-serif text-base font-bold text-ivory-50">Shri Shaktimayi</p>
              <p className="text-xs text-ivory-300">Ayurvedic Pharmacy &amp; Nursing College</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-300">
            {site.legalName} was established in {site.foundedYear} by {site.founder} in Azamgarh,
            Uttar Pradesh.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline hover:text-ivory-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
            Programmes
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`} className="link-underline hover:text-ivory-50">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admissions" className="link-underline hover:text-ivory-50">
                Admissions &amp; eligibility
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="link-underline hover:text-ivory-50">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
            Reach out
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="leading-relaxed text-ivory-300">{contact.fullAddress}</p>
            <p>
              <a href={`tel:${contact.phoneE164}`} className="link-underline font-medium text-ivory-50 hover:text-gold-300">
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="link-underline font-medium text-ivory-50 hover:text-gold-300">
                {contact.email}
              </a>
            </p>
            <p>
              <a
                href={contact.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-gold-300 hover:text-gold-400"
              >
                Get directions →
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ivory-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Content on this site is pending final approval by the college.{" "}
            <Link href="/privacy" className="link-underline text-gold-300">
              Privacy &amp; legal notices
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
