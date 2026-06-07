import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "404 — Page not found · SOLCUT" },
      { name: "description", content: "The page you are looking for does not exist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground grid place-items-center px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">[ Error 404 ]</p>
        <h1 className="font-display text-[20vw] md:text-[12vw] leading-none">
          Not <span className="italic text-accent">found</span>.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-md mx-auto">
          The page you are looking for has moved, or never existed.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 bg-accent text-accent-foreground rounded-full px-6 py-3 text-sm uppercase tracking-wider hover:opacity-90"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
