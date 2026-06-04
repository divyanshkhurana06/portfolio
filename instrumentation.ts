export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureDb } = await import("@/lib/ensure-db");
    await ensureDb();
  }
}
