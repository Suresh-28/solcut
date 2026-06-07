import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent } from "./site-content-data";

export { defaultContent, type SiteContent };

const EVENT = "solcut:content-updated";

let cache: SiteContent | null = null;
let inflight: Promise<SiteContent> | null = null;

export async function fetchContent(): Promise<SiteContent> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      const remote = (data?.data as Partial<SiteContent> | undefined) ?? {};
      cache = { ...defaultContent, ...remote };
    } catch {
      cache = defaultContent;
    }
    return cache!;
  })();
  return inflight;
}

export function notifyContentUpdated(next?: SiteContent) {
  if (next) cache = next;
  else cache = null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(cache ?? defaultContent);
  useEffect(() => {
    let active = true;
    fetchContent().then((c) => {
      if (active) setContent(c);
    });
    const handler = () => {
      cache = null;
      fetchContent().then((c) => active && setContent(c));
    };
    window.addEventListener(EVENT, handler);
    return () => {
      active = false;
      window.removeEventListener(EVENT, handler);
    };
  }, []);
  return content;
}
