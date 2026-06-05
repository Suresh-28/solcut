import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import heroShape from "@/assets/hero-shape.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import { useLenis } from "@/hooks/use-lenis";
import { Reveal, RevealStagger } from "@/components/reveal";

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
  { n: "01", title: "Northwind Capital", tag: "Financial advisory", year: "2025", img: work1 },
  { n: "02", title: "Field & Foundry", tag: "Furniture studio", year: "2025", img: work2 },
  { n: "03", title: "Tertia Labs", tag: "Developer tooling", year: "2024", img: work3 },
  { n: "04", title: "Marin & Co.", tag: "Brand / Web", year: "2024", img: work4 },
];

const services = [
  { k: "01", t: "Discovery", d: "We map your customer, your offer, and the proof points that already convert in conversation." },
  { k: "02", t: "Design", d: "Minimal layouts, opinionated typography, no template tells. Every section earns its place." },
  { k: "03", t: "Build", d: "Hand-coded with modern stacks. 95+ Lighthouse, accessible by default, edited without us." },
  { k: "04", t: "Iterate", d: "We ship in two weeks then watch the data. Headlines, sections, and flows tuned in public." },
];

const testimonials = [
  { q: "Solcut turned a two-month redesign into a two-week one — and the inbound finally matches the room.", a: "Hema Rao", r: "Partner, Northwind Capital" },
  { q: "Our customers said the site felt like the studio. That's the highest compliment.", a: "Marin Idris", r: "Founder, Field & Foundry" },
  { q: "Fast, opinionated, and the only studio I've worked with that ships on the date they quote.", a: "Jordan Lee", r: "CEO, Tertia Labs" },
];

function Index() {
  useLenis();
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
          {[["Work","#work"],["Studio","#about"],["Services","#services"],["Contact","#contact"]].map(([l,h]) => (
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

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = ["We build", "websites that", "win contracts."];

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
          [ Independent web studio — est. 2026 ]
        </motion.p>
        <h1 className="font-display text-foreground text-[18vw] md:text-[14vw] leading-[0.82]">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${li === 2 ? "text-accent italic" : ""}`}
              >
                {li === 1 ? (
                  <span className="inline-flex items-center gap-4 md:gap-8">
                    websites
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 12 }}
                      className="inline-block w-[0.7em] h-[0.7em] rounded-full bg-accent align-middle"
                    />
                    that
                  </span>
                ) : line}
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
            Solcut is a small team designing and shipping fast, minimal websites for founders and studios who treat their landing page like a sales engineer.
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

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const items = ["Landing pages", "✦", "Brand sites", "✦", "E-commerce", "✦", "Web apps", "✦", "SEO", "✦", "Performance", "✦", "Animation", "✦", "CMS", "✦"];
  return (
    <div ref={ref} className="border-y border-border py-6 overflow-hidden bg-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <motion.div key={k} style={{ x }} className="flex shrink-0">
            {items.map((it, i) => (
              <span key={i} className={`font-display text-5xl md:text-7xl px-8 ${it === "★" ? "text-accent" : "text-foreground"}`}>
                {it}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">[ Selected work ]</p>
          <h2 className="font-display text-5xl md:text-7xl">Brands we've<br /><span className="italic text-accent">put online</span>.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#contact" className="hidden md:inline text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">All projects →</a>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
        {projects.map((p, i) => (
          <ProjectCard key={p.n} p={p} offset={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, offset }: { p: typeof projects[number]; offset: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      ref={ref}
      href="#"
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
              View
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

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">[ Studio note ]</p>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal>
            <p className="font-display text-3xl md:text-6xl leading-[1.05] text-balance">
              A website is the only employee that works while you sleep — <span className="text-accent italic">ours show up rested.</span> Most agencies disappear for two months. We commit to a fixed timeline and ship something you can put in front of a customer by Friday week two.
            </p>
          </Reveal>
          <RevealStagger className="grid sm:grid-cols-3 gap-8 mt-20">
            {[
              { k: "02", l: "Weeks to ship, end to end" },
              { k: "95", l: "Lighthouse score, baseline" },
              { k: "24", l: "Hour reply window" },
            ].map((s) => (
              <motion.div
                key={s.k}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="border-t border-border pt-6"
              >
                <Counter to={parseInt(s.k)} />
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

function Services() {
  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <Reveal className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">[ Process ]</p>
        </Reveal>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl">Four steps,<br /><span className="italic text-accent">two weeks</span>.</h2>
        </Reveal>
      </div>
      <ul>
        {services.map((s, i) => (
          <ServiceRow key={s.k} s={s} i={i} />
        ))}
      </ul>
    </section>
  );
}

function ServiceRow({ s, i }: { s: typeof services[number]; i: number }) {
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

function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div className="relative">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">[ Let's talk ]</p>
        </Reveal>
        <h2 className="font-display text-[14vw] md:text-[11vw] leading-[0.95] text-balance">
          {["Got something", "worth making?"].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em]">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 1 ? "text-accent italic" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal delay={0.3}>
          <div ref={ref} className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticCTA />
            <a href="#" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-accent">Book a call →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      ref={ref}
      href="mailto:hello@solcut.studio"
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group inline-flex items-center gap-4 bg-accent text-accent-foreground rounded-full pl-7 pr-3 py-3 text-lg font-medium uppercase tracking-wider hover:gap-6 transition-[gap]"
    >
      hello@solcut.studio
      <motion.span whileHover={{ rotate: 45 }} className="w-10 h-10 rounded-full bg-background text-foreground grid place-items-center">→</motion.span>
    </motion.a>
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
