import Link from "next/link";
import NotFoundScene from "@/components/NotFoundScene";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-6 text-center md:flex-row md:justify-between md:text-left">
      <div className="order-2 md:order-1">
        <p className="font-display text-sm text-teal">Connection lost</p>
        <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-tight md:text-4xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
          The node you&apos;re looking for isn&apos;t in the network — the link might be broken, or the page may have moved.
        </p>
        <Link href="/" className="btn-bounce mt-8 inline-block rounded-full bg-coral px-6 py-3 text-sm font-medium text-ink hover:bg-coral-dim">
          Back to home
        </Link>
      </div>
      <div className="order-1 mb-6 md:order-2 md:mb-0">
        <NotFoundScene />
      </div>
    </section>
  );
}