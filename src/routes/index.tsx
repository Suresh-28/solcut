import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import heroShape from "@/assets/hero-shape.jpg";
import { useLenis } from "@/hooks/use-lenis";
import { Reveal, RevealStagger } from "@/components/reveal";
import { useSiteContent, type SiteContent } from "@/lib/site-content";

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

function Index() {
  useLenis();
  const content = useSiteContent();
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

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
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
      />
      <Cursor />
      <Nav />
      <Hero hero={content.hero} />
      <Marquee marquee={content.marquee} />
      <Work work={content.work} />
      <About about={content.about} />
      <Services services={content.services} />
      <Pricing />
      <Testimonials testimonials={content.testimonials} />
      <Contact contact={content.contact} />
      <Footer time={time} footer={content.footer} contact={content.contact} social={content.social} />
    </main>
  );
}

function Cursor() {
  const x = useSpring(0, { stiffness: 400, damping: 35 });
  const y = useSpring(0, { stiffness: 400, damping: 35 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest?.("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);
  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden md:block"
    >
      <motion.div
        animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent mix-blend-difference"
      />
    </motion.div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 mix-blend-difference"
    >
      <div className={`flex items-center justify-between px-6 md:px-10 transition-[padding] duration-500 ${scrolled ? "py-3" : "py-5"} text-foreground`}>
        <a href="#top" className="font-display text-xl tracking-tight">SOLCUT®</a>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
          {[["Work","#work"],["Studio","#about"],["Services","#services"],["Pricing","#pricing"],["Contact","#contact"]].map(([l,h]) => (
            <a key={l} href={h} className="relative group">
              <span className="group-hover:text-accent transition-colors">{l}</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent group-hover:w-full transition-[width] duration-500" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="text-sm uppercase tracking-wider border border-foreground/40 rounded-full px-4 py-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
          Start a project
        </a>
      </div>
    </motion.header>
  );
}

function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = hero.headlineLines;

  return (
    <section id="top" ref={ref} className="relative min-h-[100vh] overflow-hidden grain">
      <motion.img
        src={heroShape}
        alt=""
        width={1920}
        height={1080}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover opacity-80 animate-blob"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />

      <motion.div style={{ y: titleY, opacity: fade }} className="relative z-10 px-6 md:px-10 pt-40 md:pt-48 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8"
        >
          {hero.eyebrow}
        </motion.p>
        <h1 className="font-display text-foreground text-[18vw] md:text-[14vw] leading-[0.82]">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${li === headline.length - 1 ? "text-accent italic" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl"
        >
          <p className="md:col-span-2 text-lg md:text-xl text-foreground/80 max-w-2xl text-balance">
            {hero.intro}
          </p>

          <div className="flex items-end justify-start md:justify-end">
            <a href="#work" className="group inline-flex items-center gap-3 text-sm uppercase tracking-wider">
              <motion.span
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 rounded-full border border-foreground/50 grid place-items-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-colors"
              >
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>↓</motion.span>
              </motion.span>
              Selected work
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee({ marquee }: { marquee: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const items = marquee.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div ref={ref} className="border-y border-border py-6 overflow-hidden bg-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <motion.div key={k} style={{ x }} className="flex shrink-0">
            {items.map((it, i) => (
              <span key={i} className={`font-display text-5xl md:text-7xl px-8 ${it === "✦" ? "text-accent" : "text-foreground"}`}>
                {it}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Work({ work }: { work: SiteContent["work"] }) {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">{work.eyebrow}</p>
          <h2 className="font-display text-5xl md:text-7xl">{work.title}<br /><span className="italic text-accent">{work.titleItalic}</span>.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#contact" className="hidden md:inline text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">All projects →</a>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
        {work.projects.map((p, i) => (
          <ProjectCard key={p.n + i} p={p} offset={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, offset }: { p: SiteContent["work"]["projects"][number]; offset: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={p.url || "#"}
      target={p.url ? "_blank" : undefined}
      rel={p.url ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`group block ${offset ? "md:mt-32" : ""}`}
    >
      <div className="relative overflow-hidden bg-surface aspect-[4/5]">
        <motion.img
          src={p.img}
          alt={p.title}
          loading="lazy"
          width={1200}
          height={1500}
          style={{ y: imgY }}
          animate={{ scale: hover ? 1.08 : 1.12 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          animate={{ opacity: hover ? 0.3 : 0 }}
          className="absolute inset-0 bg-background"
        />
        <span className="absolute top-4 left-4 text-xs uppercase tracking-wider text-foreground/90 bg-background/40 backdrop-blur px-3 py-1 rounded-full">
          {p.n} / {p.year}
        </span>
        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-accent text-accent-foreground grid place-items-center font-display text-sm uppercase"
            >
              {p.url ? "View" : "Soon"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-baseline justify-between mt-5 overflow-hidden">
        <h3 className="font-display text-2xl md:text-3xl transition-colors group-hover:text-accent">
          <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5">{p.title}</span>
        </h3>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">{p.tag}</span>
      </div>
    </motion.a>
  );
}

function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{about.eyebrow}</p>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal>
            <p className="font-display text-3xl md:text-6xl leading-[1.05] text-balance">
              {about.body} <span className="text-accent italic">{about.bodyItalic}</span>
            </p>
          </Reveal>
          <RevealStagger className="grid sm:grid-cols-3 gap-8 mt-20">
            {about.stats.map((s) => (
              <motion.div
                key={s.l}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="border-t border-border pt-6"
              >
                <Counter to={parseInt(s.k) || 0} />
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{s.l}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <div ref={ref} className="font-display text-6xl text-accent tabular-nums">{String(n).padStart(2, "0")}</div>;
}

function Services({ services }: { services: SiteContent["services"] }) {
  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{services.eyebrow}</p>
        </Reveal>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl">{services.title}<br /><span className="italic text-accent">{services.titleItalic}</span>.</h2>
        </Reveal>
      </div>
      <ul>
        {services.items.map((s, i) => (
          <ServiceRow key={s.k + i} s={s} i={i} />
        ))}
      </ul>
    </section>
  );
}

function ServiceRow({ s, i }: { s: SiteContent["services"]["items"][number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hover, setHover] = useState(false);
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative border-t border-border last:border-b overflow-hidden"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 1 }}
        className="absolute inset-0 bg-accent/10"
      />
      <div className="relative grid md:grid-cols-12 gap-8 py-8 md:py-10 items-baseline px-2 -mx-2">
        <span className="md:col-span-2 text-muted-foreground text-sm tracking-wider">{s.k}</span>
        <h3 className="md:col-span-5 font-display text-3xl md:text-5xl transition-colors duration-300" style={{ color: hover ? "var(--accent)" : undefined }}>
          <motion.span animate={{ x: hover ? 12 : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="inline-block">
            {s.t}
          </motion.span>
        </h3>
        <p className="md:col-span-5 text-foreground/70 text-lg max-w-md">{s.d}</p>
      </div>
    </motion.li>
  );
}

const PRICING_FEATURES = [
  { t: "Free Host Domain", d: "Get a professional domain name on us" },
  { t: "Hosting", d: "Fast & secure web hosting" },
  { t: "Mobile Responsive", d: "Looks perfect on all devices" },
  { t: "WhatsApp Integration", d: "Direct connect with your customers" },
  { t: "Social Media Setup", d: "Connect your social media profiles" },
  { t: "SEO Friendly Content", d: "Optimized content to rank better" },
  { t: "Support", d: "30 Days free support after delivery" },
];

const PRICING_TIERS = [
  {
    name: "Single Landing Page",
    price: "10,999",
    highlight: "Modern, responsive & conversion-focused design",
    featured: false,
  },
  {
    name: "5 Page Website",
    price: "15,999",
    highlight: "Up to 5 unique pages for your business",
    featured: true,
  },
  {
    name: "10 Page Website",
    price: "21,999",
    highlight: "Up to 10 unique pages for your business",
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">[ Pricing ]</p>
        </Reveal>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl">
            Business website,<br />
            <span className="italic text-accent">we've got the strategy</span>.
          </h2>
          <p className="mt-6 text-foreground/70 text-lg max-w-2xl">
            Three fixed-price packages. Everything you need to launch a fast,
            polished site that converts — domain, hosting, design and support included.
          </p>
        </Reveal>
      </div>

      <RevealStagger className="grid md:grid-cols-3 gap-6">
        {PRICING_TIERS.map((tier) => (
          <motion.div
            key={tier.name}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              tier.featured
                ? "border-accent bg-accent/5"
                : "border-border bg-surface/40"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-8 bg-accent text-accent-foreground text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                Most popular
              </span>
            )}
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {tier.name}
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl md:text-6xl">₹{tier.price}</span>
              <span className="text-muted-foreground text-sm">/-</span>
            </div>
            <p className="mt-3 text-foreground/70">{tier.highlight}</p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                What you get
              </p>
              <ul className="space-y-3">
                {PRICING_FEATURES.map((f) => (
                  <li key={f.t} className="flex gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <div>
                      <div className="text-foreground text-sm font-medium">{f.t}</div>
                      <div className="text-muted-foreground text-xs">{f.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
                tier.featured
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border border-foreground/40 hover:bg-accent hover:text-accent-foreground hover:border-accent"
              }`}
            >
              Get started →
            </a>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}

function Testimonials({ testimonials }: { testimonials: SiteContent["testimonials"] }) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{testimonials.eyebrow}</p>
        </Reveal>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl">{testimonials.title}<br /><span className="italic text-accent">{testimonials.titleItalic}</span>.</h2>
        </Reveal>
      </div>
      <RevealStagger className="grid md:grid-cols-3 gap-8">
        {testimonials.items.map((t, i) => (
          <motion.figure
            key={t.a + i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="border-t border-border pt-6"
          >
            <blockquote className="font-display text-xl md:text-2xl leading-snug text-foreground/90">
              "{t.q}"
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-wider text-muted-foreground">
              <span className="text-foreground">{t.a}</span> · {t.r}
            </figcaption>
          </motion.figure>
        ))}
      </RevealStagger>
    </section>
  );
}

function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div className="relative">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">{contact.eyebrow}</p>
        </Reveal>
        <h2 className="font-display text-[14vw] md:text-[11vw] leading-[0.95] text-balance">
          {contact.headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em]">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === contact.headlineLines.length - 1 ? "text-accent italic" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal>
          <p className="mt-8 max-w-xl text-foreground/70 text-lg">
            {contact.note}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div ref={ref} className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticCTA email={contact.email} />
            <a href={`mailto:${contact.email}`} className="text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">Book a call →</a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <ContactForm email={contact.email} />
        </Reveal>
      </div>
    </section>
  );
}

function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry — ${form.name || "Website"}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <form onSubmit={onSubmit} className="mt-16 grid md:grid-cols-2 gap-5 max-w-3xl border-t border-border pt-10">
      <label className="block">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Your name</div>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-foreground"
        />
      </label>
      <label className="block">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</div>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-foreground"
        />
      </label>
      <label className="block md:col-span-2">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Tell us about your project</div>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-foreground resize-none"
        />
      </label>
      <div className="md:col-span-2 flex items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground rounded-full px-6 py-3 text-sm uppercase tracking-wider hover:opacity-90"
        >
          Send enquiry <span>→</span>
        </button>
        {sent && <span className="text-sm text-muted-foreground">Opening your mail client…</span>}
      </div>
    </form>
  );
}

function MagneticCTA({ email }: { email: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      ref={ref}
      href={`mailto:${email}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group inline-flex items-center gap-4 bg-accent text-accent-foreground rounded-full pl-7 pr-3 py-3 text-lg font-medium normal-case tracking-wide hover:gap-6 transition-[gap]"
    >
      {email}
      <motion.span whileHover={{ rotate: 45 }} className="w-10 h-10 rounded-full bg-background text-foreground grid place-items-center">→</motion.span>
    </motion.a>
  );
}

function Footer({ time, footer, contact }: { time: string; footer: SiteContent["footer"]; contact: SiteContent["contact"] }) {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="grid md:grid-cols-4 gap-8 text-sm text-muted-foreground">
        <div>
          <div className="font-display text-foreground text-xl">SOLCUT®</div>
          <p className="mt-3">{footer.tagline}</p>
        </div>
        <div>
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Contact</div>
          <p><a className="hover:text-accent" href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p className="mt-1">{footer.note}</p>
        </div>
        <div>
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Sitemap</div>
          <ul className="space-y-1">
            <li><a className="hover:text-accent" href="#work">Work</a></li>
            <li><a className="hover:text-accent" href="#services">Process</a></li>
            <li><a className="hover:text-accent" href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <div className="uppercase tracking-wider text-foreground/70 mb-3">Local time</div>
          <p className="font-mono tabular-nums text-foreground">{time || "--:--:-- LIS"}</p>
          <div className="mt-3 flex flex-wrap justify-end gap-3 text-xs">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-accent transition-colors">Cookies</Link>
          </div>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} Solcut Studio</p>
        </div>
      </div>
    </footer>
  );
}
