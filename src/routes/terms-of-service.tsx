import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Solcut" },
      { name: "description", content: "Terms of Service for Solcut Studio. Read our terms and conditions for using our website and services." },
      { property: "og:title", content: "Terms of Service — Solcut" },
      { property: "og:description", content: "Terms of Service for Solcut Studio." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </motion.div>

        <div className="space-y-12">
          <Section title="1. Acceptance of Terms">
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the Solcut Studio website and services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
          </Section>

          <Section title="2. Description of Services">
            <p className="text-muted-foreground leading-relaxed">
              Solcut Studio provides design services including but not limited to brand identity design, website design, motion design, and digital product design. The specific scope of work will be defined in a separate agreement or proposal for each project.
            </p>
          </Section>

          <Section title="3. Intellectual Property">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Our Content:</strong> All content on this website, including text, graphics, logos, images, and software, is the property of Solcut Studio and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                <strong className="text-foreground">Client Work:</strong> Upon full payment, clients receive ownership rights to the final deliverables as specified in the project agreement. We reserve the right to display completed work in our portfolio and promotional materials unless otherwise agreed in writing.
              </p>
            </div>
          </Section>

          <Section title="4. User Conduct">
            <p className="text-muted-foreground leading-relaxed mb-4">When using our Services, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>Use the Services for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </Section>

          <Section title="5. Project Engagement">
            <p className="text-muted-foreground leading-relaxed">
              Project timelines, deliverables, and payment terms are defined in individual project proposals or contracts. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
          </Section>

          <Section title="6. Payment Terms">
            <p className="text-muted-foreground leading-relaxed">
              Payment terms are outlined in project proposals. Typically, a deposit is required to commence work, with the balance due upon project completion or according to agreed milestones. Late payments may incur additional fees.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Solcut Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services. Our total liability shall not exceed the amount you paid us for the specific service giving rise to the claim.
            </p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p className="text-muted-foreground leading-relaxed">
              The Services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that the Services will be uninterrupted, timely, secure, or error-free.
            </p>
          </Section>

          <Section title="9. Termination">
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever. Upon termination, your right to use the Services will cease immediately.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. Material changes will be notified by posting the updated Terms on this page with a revised date. Your continued use of the Services after any changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="12. Contact Information">
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
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
