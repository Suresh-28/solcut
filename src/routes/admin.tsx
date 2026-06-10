import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  defaultContent,
  fetchContent,
  notifyContentUpdated,
  type SiteContent,
} from "@/lib/site-content";
import {
  saveSiteContent,
  resetSiteContent,
  verifyAdminPassword,
} from "@/lib/site-content.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Solcut" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPage,
});

function AdminPage() {
  // Password is held only in memory for the current session. No client-side
  // credentials, no sessionStorage auth flag — every privileged action
  // re-verifies the password against the server.
  const [password, setPassword] = useState<string | null>(null);

  if (!password) return <Login onSuccess={(p) => setPassword(p)} />;
  return <Editor password={password} onLogout={() => setPassword(null)} />;
}

function Login({ onSuccess }: { onSuccess: (password: string) => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const verify$ = useServerFn(verifyAdminPassword);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      // Username is cosmetic — the server only validates the password.
      if (!u.trim()) {
        setErr("Enter a username");
        return;
      }
      await verify$({ data: { password: p } });
      onSuccess(p);
    } catch {
      setErr("Invalid credentials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-background text-foreground px-6">
      <form onSubmit={submit} className="w-full max-w-sm border border-border rounded-lg p-8 bg-card">
        <h1 className="font-display text-3xl mb-1">Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to edit site content.</p>
        <label className="block text-xs uppercase tracking-wider mb-2">Username</label>
        <input
          value={u}
          onChange={(e) => setU(e.target.value)}
          autoComplete="username"
          className="w-full mb-4 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <label className="block text-xs uppercase tracking-wider mb-2">Password</label>
        <input
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          autoComplete="current-password"
          className="w-full mb-4 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {err && <p className="text-destructive text-sm mb-4">{err}</p>}
        <button
          disabled={busy}
          className="w-full rounded-full bg-accent text-accent-foreground py-2.5 text-sm uppercase tracking-wider hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function Editor({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [c, setC] = useState<SiteContent>(defaultContent);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const save$ = useServerFn(saveSiteContent);
  const reset$ = useServerFn(resetSiteContent);

  useEffect(() => {
    fetchContent().then(setC);
  }, []);

  const update = (patch: Partial<SiteContent>) => setC((prev) => ({ ...prev, ...patch }));

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      await save$({ data: { password, data: c } });
      notifyContentUpdated(c);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e: any) {
      setErr(e?.message ?? "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!confirm("Reset all content to defaults?")) return;
    setBusy(true);
    setErr(null);
    try {
      await reset$({ data: { password } });
      setC(defaultContent);
      notifyContentUpdated(defaultContent);
      setSavedAt(null);
    } catch (e: any) {
      setErr(e?.message ?? "Reset failed");
    } finally {
      setBusy(false);
    }
  };


  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur px-6 md:px-10 py-4 flex items-center justify-between">
        <div>
          <div className="font-display text-xl">SOLCUT® / Admin</div>
          <div className="text-xs text-muted-foreground">
            Edit homepage content {savedAt && `· saved ${savedAt}`}
            {err && <span className="text-destructive ml-2">· {err}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-wider px-3 py-2 border border-border rounded-full hover:bg-muted">View site →</a>
          <button disabled={busy} onClick={reset} className="text-xs uppercase tracking-wider px-3 py-2 border border-border rounded-full hover:bg-muted disabled:opacity-50">Reset</button>
          <button disabled={busy} onClick={save} className="text-xs uppercase tracking-wider px-4 py-2 bg-accent text-accent-foreground rounded-full hover:opacity-90 disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
          <button onClick={onLogout} className="text-xs uppercase tracking-wider px-3 py-2 border border-border rounded-full hover:bg-muted">Logout</button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-10 max-w-5xl mx-auto space-y-12">
        <Section title="Hero">
          <Field label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => update({ hero: { ...c.hero, eyebrow: v } })} />
          <ListField
            label="Headline lines (last line is accented italic)"
            items={c.hero.headlineLines}
            onChange={(items) => update({ hero: { ...c.hero, headlineLines: items } })}
          />
          <TextArea label="Intro" value={c.hero.intro} onChange={(v) => update({ hero: { ...c.hero, intro: v } })} />
        </Section>

        <Section title="Marquee">
          <Field label="Items (comma separated, use ✦ as separator dots)" value={c.marquee} onChange={(v) => update({ marquee: v })} />
        </Section>

        <Section title="Work">
          <Field label="Eyebrow" value={c.work.eyebrow} onChange={(v) => update({ work: { ...c.work, eyebrow: v } })} />
          <Field label="Title" value={c.work.title} onChange={(v) => update({ work: { ...c.work, title: v } })} />
          <Field label="Title (italic accent)" value={c.work.titleItalic} onChange={(v) => update({ work: { ...c.work, titleItalic: v } })} />
          <RepeaterField
            label="Projects"
            items={c.work.projects}
            blank={{ n: "", title: "", tag: "", year: "", img: "", url: "" }}
            fields={[
              { key: "n", label: "No." },
              { key: "title", label: "Title" },
              { key: "tag", label: "Tag" },
              { key: "year", label: "Year" },
              { key: "img", label: "Image", image: true },
              { key: "url", label: "Project URL" },
            ]}
            onChange={(items) => update({ work: { ...c.work, projects: items } })}
          />
        </Section>

        <Section title="About">
          <Field label="Eyebrow" value={c.about.eyebrow} onChange={(v) => update({ about: { ...c.about, eyebrow: v } })} />
          <TextArea label="Body" value={c.about.body} onChange={(v) => update({ about: { ...c.about, body: v } })} />
          <TextArea label="Body (italic accent)" value={c.about.bodyItalic} onChange={(v) => update({ about: { ...c.about, bodyItalic: v } })} />
          <RepeaterField
            label="Stats"
            items={c.about.stats}
            blank={{ k: "", l: "" }}
            fields={[
              { key: "k", label: "Number" },
              { key: "l", label: "Label" },
            ]}
            onChange={(items) => update({ about: { ...c.about, stats: items } })}
          />
        </Section>

        <Section title="Services">
          <Field label="Eyebrow" value={c.services.eyebrow} onChange={(v) => update({ services: { ...c.services, eyebrow: v } })} />
          <Field label="Title" value={c.services.title} onChange={(v) => update({ services: { ...c.services, title: v } })} />
          <Field label="Title (italic accent)" value={c.services.titleItalic} onChange={(v) => update({ services: { ...c.services, titleItalic: v } })} />
          <RepeaterField
            label="Steps"
            items={c.services.items}
            blank={{ k: "", t: "", d: "" }}
            fields={[
              { key: "k", label: "No." },
              { key: "t", label: "Title" },
              { key: "d", label: "Description", textarea: true },
            ]}
            onChange={(items) => update({ services: { ...c.services, items } })}
          />
        </Section>

        <Section title="Testimonials">
          <Field label="Eyebrow" value={c.testimonials.eyebrow} onChange={(v) => update({ testimonials: { ...c.testimonials, eyebrow: v } })} />
          <Field label="Title" value={c.testimonials.title} onChange={(v) => update({ testimonials: { ...c.testimonials, title: v } })} />
          <Field label="Title (italic accent)" value={c.testimonials.titleItalic} onChange={(v) => update({ testimonials: { ...c.testimonials, titleItalic: v } })} />
          <RepeaterField
            label="Quotes"
            items={c.testimonials.items}
            blank={{ q: "", a: "", r: "" }}
            fields={[
              { key: "q", label: "Quote", textarea: true },
              { key: "a", label: "Author" },
              { key: "r", label: "Role" },
            ]}
            onChange={(items) => update({ testimonials: { ...c.testimonials, items } })}
          />
        </Section>

        <Section title="Contact">
          <Field label="Eyebrow" value={c.contact.eyebrow} onChange={(v) => update({ contact: { ...c.contact, eyebrow: v } })} />
          <ListField
            label="Headline lines (last line is accented italic)"
            items={c.contact.headlineLines}
            onChange={(items) => update({ contact: { ...c.contact, headlineLines: items } })}
          />
          <TextArea label="Note" value={c.contact.note} onChange={(v) => update({ contact: { ...c.contact, note: v } })} />
          <Field label="Email" value={c.contact.email} onChange={(v) => update({ contact: { ...c.contact, email: v } })} />
        </Section>

        <Section title="Footer">
          <Field label="Tagline" value={c.footer.tagline} onChange={(v) => update({ footer: { ...c.footer, tagline: v } })} />
          <Field label="Note" value={c.footer.note} onChange={(v) => update({ footer: { ...c.footer, note: v } })} />
        </Section>

        <Section title="Social links">
          <RepeaterField
            label="Social profiles (platform: whatsapp, instagram, linkedin, github, facebook, youtube, dribbble, behance)"
            items={c.social ?? []}
            blank={{ platform: "", url: "" }}
            fields={[
              { key: "platform", label: "Platform" },
              { key: "url", label: "URL" },
            ]}
            onChange={(items) => update({ social: items })}
          />
        </Section>


        <div className="flex justify-end gap-2 pb-20">
          <button disabled={busy} onClick={reset} className="text-xs uppercase tracking-wider px-4 py-2 border border-border rounded-full hover:bg-muted disabled:opacity-50">Reset</button>
          <button disabled={busy} onClick={save} className="text-xs uppercase tracking-wider px-6 py-2 bg-accent text-accent-foreground rounded-full hover:opacity-90 disabled:opacity-50">{busy ? "Saving…" : "Save changes"}</button>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border rounded-lg p-6 bg-card">
      <h2 className="font-display text-2xl mb-6">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring";

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground">{label}</div>
      <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground">{label}</div>
      <textarea rows={3} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ListField({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground">{label}</div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls}
              value={it}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="px-3 text-xs border border-border rounded-md hover:bg-muted"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 text-xs uppercase tracking-wider px-3 py-1.5 border border-border rounded-full hover:bg-muted"
      >
        + Add line
      </button>
    </div>
  );
}

type FieldSpec = { key: string; label: string; textarea?: boolean; image?: boolean };

function RepeaterField<T extends Record<string, string>>({
  label,
  items,
  blank,
  fields,
  onChange,
}: {
  label: string;
  items: T[];
  blank: T;
  fields: FieldSpec[];
  onChange: (items: T[]) => void;
}) {
  const setField = (i: number, key: string, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  return (
    <div>
      <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground">{label}</div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-background">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">#{i + 1}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-xs px-2 py-1 border border-border rounded hover:bg-muted"
              >
                Remove
              </button>
            </div>
            {fields.map((f) => {
              const val = (item as any)[f.key] ?? "";
              return (
                <div key={f.key}>
                  <div className="text-[10px] uppercase tracking-wider mb-1 text-muted-foreground">{f.label}</div>
                  {f.image ? (
                    <div className="space-y-2">
                      {val && (
                        <img src={val} alt="" className="h-28 w-28 object-cover rounded-md border border-border" />
                      )}
                      <div className="flex gap-2 items-center">
                        <label className="text-xs uppercase tracking-wider px-3 py-1.5 border border-border rounded-full hover:bg-muted cursor-pointer">
                          {val ? "Replace image" : "Upload image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => setField(i, f.key, String(reader.result));
                              reader.readAsDataURL(file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        {val && (
                          <button
                            type="button"
                            onClick={() => setField(i, f.key, "")}
                            className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-muted"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <input
                        className={inputCls}
                        placeholder="…or paste an image URL"
                        value={val.startsWith("data:") ? "" : val}
                        onChange={(e) => setField(i, f.key, e.target.value)}
                      />
                    </div>
                  ) : f.textarea ? (
                    <textarea
                      rows={2}
                      className={inputCls}
                      value={val}
                      onChange={(e) => setField(i, f.key, e.target.value)}
                    />
                  ) : (
                    <input
                      className={inputCls}
                      value={val}
                      onChange={(e) => setField(i, f.key, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, { ...blank }])}
        className="mt-3 text-xs uppercase tracking-wider px-3 py-1.5 border border-border rounded-full hover:bg-muted"
      >
        + Add item
      </button>
    </div>
  );
}
