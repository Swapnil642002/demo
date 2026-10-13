import Link from "next/link";
import { ButtonLink } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">Error 404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
        Page not found
      </h1>
      <span aria-hidden="true" className="mt-5 block rule-gold" />
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
        The page you are looking for may have been moved or removed. Try one of the links
        below, or use the navigation to find what you need.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/courses" variant="outline">
          Browse courses
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>

      <nav aria-label="Suggested pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-600">
          <li>
            <Link href="/admissions" className="link-underline hover:text-navy-800">
              Admissions
            </Link>
          </li>
          <li>
            <Link href="/faculty" className="link-underline hover:text-navy-800">
              Faculty
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="link-underline hover:text-navy-800">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/notices" className="link-underline hover:text-navy-800">
              Notices
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="link-underline hover:text-navy-800">
              Privacy
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
