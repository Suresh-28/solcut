import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Solcut" },
      { name: "description", content: "Cookie Policy for Solcut Studio. Learn how we use cookies and similar technologies on our website." },
      { property: "og:title", content: "Cookie Policy — Solcut" },
      { property: "og:description", content: "Cookie Policy for Solcut Studio." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </motion.div>

        <div className="space-y-12">
          <Section title="1. What Are Cookies">
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies can be "persistent" (stored until they expire or you delete them) or "session" (deleted when you close your browser).
            </p>
          </Section>

          <Section title="2. How We Use Cookies">
            <p className="text-muted-foreground leading-relaxed mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li><strong className="text-foreground">Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</li>
              <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong className="text-foreground">Performance Cookies:</strong> Used to enhance the performance and functionality of our website.</li>
              <li><strong className="text-foreground">Preference Cookies:</strong> Enable the website to remember information that changes the way it behaves or looks.</li>
            </ul>
          </Section>

          <Section title="3. Types of Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-muted-foreground border border-border rounded-lg">
                <thead className="text-xs uppercase bg-surface text-foreground/70">
                  <tr>
                    <th className="px-4 py-3 border-b border-border">Category</th>
                    <th className="px-4 py-3 border-b border-border">Purpose</th>
                    <th className="px-4 py-3 border-b border-border">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">Essential</td>
                    <td className="px-4 py-3">Website functionality and security</td>
                    <td className="px-4 py-3">Session / Persistent</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">Analytics</td>
                    <td className="px-4 py-3">Visitor behaviour and site performance</td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Preferences</td>
                    <td className="px-4 py-3">Remember your settings and choices</td>
                    <td className="px-4 py-3">Up to 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="4. Third-Party Cookies">
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services that place cookies on your device. These services include analytics providers and other tools that help us improve our website. We do not control these cookies, and you should review the privacy policies of these third parties for more information.
            </p>
          </Section>

          <Section title="5. Managing Your Cookie Preferences">
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can control and manage cookies in various ways. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>View cookies stored on your device</li>
              <li>Delete individual cookies or all cookies</li>
              <li>Block cookies from specific websites or all websites</li>
              <li>Set preferences for different types of cookies</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </Section>

          <Section title="6. Browser-Specific Instructions">
            <div className="space-y-2 text-muted-foreground leading-relaxed">
              <p>Here are links to manage cookies in popular browsers:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
              </ul>
            </div>
          </Section>

          <Section title="7. Changes to This Policy">
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our use of cookies, please contact us at{" "}
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
