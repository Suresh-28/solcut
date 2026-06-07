import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { defaultContent, type SiteContent } from "./site-content-data";

const ADMIN_PASS = "solcut@2010";

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      password: z.string().min(1),
      data: z.unknown(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) {
      throw new Error("Unauthorized");
    }
    const merged = { ...defaultContent, ...(data.data as Partial<SiteContent>) };
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert({ id: 1, data: merged, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const resetSiteContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string().min(1) }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    const { error } = await supabaseAdmin.from("site_content").delete().eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
