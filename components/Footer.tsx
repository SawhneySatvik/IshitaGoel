import Link from "next/link";
import { profile } from "@/lib/data";
import WordmarkShader from "@/components/footer/WordmarkShader";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <WordmarkShader />
      <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-6 pt-4 text-sm text-muted">
        <Link href="/" data-cursor="" className="link-underline pb-0.5 hover:text-ink">
          Home
        </Link>
        <Link href="/blog" data-cursor="" className="link-underline pb-0.5 hover:text-ink">
          Writing
        </Link>
        <Link href="/notes" data-cursor="" className="link-underline pb-0.5 hover:text-ink">
          Notes
        </Link>
        <Link href="/reading" data-cursor="" className="link-underline pb-0.5 hover:text-ink">
          Reading
        </Link>
        <a href="/feed.xml" data-cursor="" className="link-underline pb-0.5 hover:text-ink">
          RSS
        </a>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-serif italic">
          Set in Fraunces, Newsreader &amp; Inter. Built with Next.js.
        </p>
        <a href="#top" data-cursor="" className="link-underline pb-0.5 text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
