import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { defaultContent, type SiteContent } from "./site-content-data";

function getAdminPass(): string {
  const pass = process.env.ADMIN_PASS;
  if (!pass) throw new Error("Server misconfigured: ADMIN_PASS not set");
  return pass;
}

function checkPass(provided: string) {
  if (provided !== getAdminPass()) throw new Error("Unauthorized");
}

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    checkPass(data.password);
    return { ok: true };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      password: z.string().min(1).max(200),
      data: z.unknown(),
    }),
  )
  .handler(async ({ data }) => {
    checkPass(data.password);
    const merged = { ...defaultContent, ...(data.data as Partial<SiteContent>) };
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert({ id: 1, data: merged, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const resetSiteContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    checkPass(data.password);
    const { error } = await supabaseAdmin.from("site_content").delete().eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
