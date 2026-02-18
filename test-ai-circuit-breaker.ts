import { checkAiBudgetAndQuota } from "./lib/ai/quota";

// Mock Supabase Client
const mockSupabase = {
    from: (table: string) => ({
        select: (query: string) => ({
            eq: (col: string, val: any) => ({
                eq: (col2: string, val2: any) => ({
                    single: async () => {
                        if (table === "ai_usage_log") return { data: { request_count: 5 }, error: null };
                        return { data: null, error: null };
                    }
                }),
                then: async (cb: any) => {
                    if (table === "ai_usage_log") return cb({ data: [{ request_count: 4999 }], error: null });
                    return cb({ data: [], error: null });
                }
            })
        }),
        upsert: async (data: any) => ({ error: null })
    })
} as any;

async function runTest() {
    console.log("🧪 Test 1 : Vérification du quota utilisateur (en dessous de la limite)");
    const res1 = await checkAiBudgetAndQuota(mockSupabase, "user-123");
    console.log("Result 1:", res1.allowed ? "✅ Autorisé" : "❌ Bloqué", "| Restant:", res1.remaining);

    console.log("\n🧪 Test 2 : Simulation dépassement budget global (Circuit-Breaker)");
    const mockSupabaseLimit = {
        ...mockSupabase,
        from: (table: string) => ({
            ...mockSupabase.from(table),
            select: (query: string) => ({
                eq: (col: string, val: any) => ({
                    then: async (cb: any) => cb({ data: [{ request_count: 5000 }], error: null })
                })
            })
        })
    } as any;

    const res2 = await checkAiBudgetAndQuota(mockSupabaseLimit, "user-456");
    console.log("Result 2:", res2.allowed ? "✅ Autorisé" : "❌ Bloqué (CIRCUIT-BREAKER)", "| Error:", res2.error);
}

runTest().catch(console.error);
