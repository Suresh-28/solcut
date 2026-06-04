import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroShape from "@/assets/hero-shape.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLCUT — Independent design studio for brands with edge" },
      { name: "description", content: "Solcut is a design studio building identity, motion and digital products for ambitious brands." },
      { property: "og:title", content: "SOLCUT — Design studio" },
      { property: "og:description", content: "Identity, motion and digital products for ambitious brands." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Hind:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

const projects = [
  { n: "01", title: "Vexa Studios", tag: "Identity / Motion", year: "2025", img: work1 },
  { n: "02", title: "Acidwave", tag: "Brand / Web", year: "2025", img: work2 },
  { n: "03", title: "Monolith&Co", tag: "Art Direction", year: "2024", img: work3 },
  { n: "04", title: "Orbit Labs", tag: "Product / Identity", year: "2024", img: work4 },
];

const services = [
  { k: "01", t: "Brand Identity", d: "Logos, visual systems and guidelines that hold up under pressure." },
  { k: "02", t: "Digital Product", d: "Interfaces, websites and apps engineered for clarity and craft." },
  { k: "03", t: "Motion & Direction", d: "Animation, art direction and campaign systems that move." },
  { k: "04", t: "Strategy", d: "Naming, positioning and messaging anchored in a real point of view." },
];

function Index() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Lisbon", hour12: false };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d) + " LIS");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
      <Contact />
      <Footer time={time} />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-5 text-foreground">
        <a href="#top" className="font-display text-xl tracking-tight">SOLCUT®</a>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
          <a href="#work" className="hover:text-accent transition-colors">Work</a>
          <a href="#about" className="hover:text-accent transition-colors">Studio</a>
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="text-sm uppercase tracking-wider border border-foreground/40 rounded-full px-4 py-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
          Start a project
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" ref={ref} className="relative min-h-[100vh] overflow-hidden grain">
      <img
        src={heroShape}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-80 animate-blob"
        style={{ transform: `translateY(${y * 0.25}px) scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />

      <div className="relative z-10 px-6 md:px-10 pt-40 md:pt-48 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 animate-rise">
          [ Independent design studio — est. 2019 ]
        </p>
        <h1 className="font-display text-foreground text-[18vw] md:text-[14vw] leading-[0.82] animate-rise">
          We build<br />
          <span className="inline-flex items-center gap-4 md:gap-8">
            brands<span className="inline-block w-[0.9em] h-[0.9em] rounded-full bg-accent align-middle" />that
          </span><br />
          <span className="text-accent">cut through.</span>
        </h1>
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl animate-rise" style={{ animationDelay: "0.2s" }}>
          <p className="md:col-span-2 text-lg md:text-xl text-foreground/80 max-w-2xl text-balance">
            Solcut is a small, focused studio. We make identity, motion and digital products for ambitious teams who refuse to look like everyone else.
          </p>
          <div className="flex items-end justify-start md:justify-end">
            <a href="#work" className="group inline-flex items-center gap-3 text-sm uppercase tracking-wider">
              <span className="w-12 h-12 rounded-full border border-foreground/50 grid place-items-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-colors">↓</span>
              Selected work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Identity", "★", "Motion", "★", "Digital", "★", "Strategy", "★", "Art Direction", "★"];
  return (
    <div className="border-y border-border py-6 overflow-hidden bg-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex shrink-0">
            {items.map((it, i) => (
              <span key={i} className={`font-display text-5xl md:text-7xl px-8 ${it === "★" ? "text-accent" : "text-foreground"}`}>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">[ Selected — 2024 / 25 ]</p>
          <h2 className="font-display text-5xl md:text-7xl">Work,<br />in the wild.</h2>
        </div>
        <a href="#contact" className="hidden md:inline text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">All projects →</a>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
        {projects.map((p, i) => (
          <a key={p.n} href="#" className={`group block ${i % 2 === 1 ? "md:mt-32" : ""}`}>
            <div className="relative overflow-hidden bg-surface aspect-[4/5]">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={1500}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
              <span className="absolute top-4 left-4 text-xs uppercase tracking-wider text-foreground/90 bg-background/40 backdrop-blur px-3 py-1 rounded-full">
                {p.n} / {p.year}
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-5">
              <h3 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">{p.title}</h3>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{p.tag}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8">
        <p className="md:col-span-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">[ The Studio ]</p>
        <div className="md:col-span-9">
          <p className="font-display text-3xl md:text-6xl leading-[1.05] text-balance">
            A studio of six. No account managers, no decks for the sake of decks. We sit close to the work and ship things we'd put on our own walls — <span className="text-accent">obsession over scale.</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-20">
            {[
              { k: "06", l: "People in the studio" },
              { k: "42", l: "Brands shaped since 2019" },
              { k: "11", l: "Time zones, one Slack" },
            ].map((s) => (
              <div key={s.k} className="border-t border-border pt-6">
                <div className="font-display text-6xl text-accent">{s.k}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <p className="md:col-span-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">[ What we do ]</p>
        <h2 className="md:col-span-9 font-display text-5xl md:text-7xl">Capabilities.</h2>
      </div>
      <ul>
        {services.map((s) => (
          <li key={s.k} className="group border-t border-border last:border-b">
            <div className="grid md:grid-cols-12 gap-8 py-8 md:py-10 items-baseline transition-colors group-hover:bg-surface/40 px-2 -mx-2">
              <span className="md:col-span-2 text-muted-foreground text-sm tracking-wider">{s.k}</span>
              <h3 className="md:col-span-5 font-display text-3xl md:text-5xl group-hover:text-accent transition-colors">{s.t}</h3>
              <p className="md:col-span-5 text-foreground/70 text-lg max-w-md">{s.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">[ Let's talk ]</p>
        <h2 className="font-display text-[14vw] md:text-[11vw] leading-[0.85] text-balance">
          Got something<br />
          <span className="text-accent italic">worth making?</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href="mailto:hello@solcut.studio"
            className="group inline-flex items-center gap-4 bg-accent text-accent-foreground rounded-full pl-7 pr-3 py-3 text-lg font-medium uppercase tracking-wider hover:gap-6 transition-all"
          >
            hello@solcut.studio
            <span className="w-10 h-10 rounded-full bg-background text-foreground grid place-items-center">→</span>
          </a>
          <a href="#" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">Book a call →</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ time }: { time: string }) {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="grid md:grid-cols-4 gap-8 text-sm text-muted-foreground">
        <div>
          <div className="font-display text-foreground text-xl">SOLCUT®</div>
          <p className="mt-3">Lisbon · Berlin · Remote</p>
        </div>
        <div>
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Contact</div>
          <p>hello@solcut.studio</p>
          <p>+351 920 000 000</p>
        </div>
        <div>
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Social</div>
          <ul className="space-y-1">
            <li><a className="hover:text-accent" href="#">Instagram</a></li>
            <li><a className="hover:text-accent" href="#">Are.na</a></li>
            <li><a className="hover:text-accent" href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Local time</div>
          <p className="font-mono tabular-nums text-foreground">{time || "--:--:-- LIS"}</p>
          <p className="mt-3 text-xs">© {new Date().getFullYear()} Solcut Studio</p>
        </div>
      </div>
    </footer>
  );
}
