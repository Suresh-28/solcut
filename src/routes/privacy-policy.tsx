import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Solcut" },
      { name: "description", content: "Privacy Policy for Solcut Studio. Learn how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — Solcut" },
      { property: "og:description", content: "Privacy Policy for Solcut Studio." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-foreground hover:text-accent transition-colors">
            SOLCUT®
          </Link>
          <Link
            to="/"
            className="text-sm uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back home
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </motion.div>

        <div className="space-y-12">
          <Section title="1. Introduction">
            <p className="text-muted-foreground leading-relaxed">
              Solcut Studio ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, and other contact details you provide through our contact form or project enquiries.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and navigation patterns.</li>
              <li><strong className="text-foreground">Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>Respond to your enquiries and project requests</li>
              <li>Provide and improve our design services</li>
              <li>Communicate with you about projects, updates, or offers</li>
              <li>Analyse website usage and improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Cookies and Tracking Technologies">
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.
            </p>
          </Section>

          <Section title="5. Data Sharing and Disclosure">
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.
            </p>
          </Section>

          <Section title="6. Data Security">
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p className="text-muted-foreground leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </Section>

          <Section title="8. Third-Party Links">
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:connect.solcut@gmail.com" className="text-accent hover:underline">
                connect.solcut@gmail.com
              </a>.
            </p>
          </Section>
        </div>
      </article>

      <footer className="border-t border-border px-6 md:px-10 py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display text-foreground text-xl">SOLCUT®</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-accent transition-colors">Cookie Policy</Link>
          </div>
          <p>© {new Date().getFullYear()} Solcut Studio</p>
        </div>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </motion.section>
  );
}
