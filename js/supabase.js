const NEXORA_SUPABASE_URL =
    "https://ksbdualsuyncotulswum.supabase.co";

const NEXORA_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_1U8nGWfDORe2Vgn0glx3XA_P2n73w-v";


const nexoraSupabase =
    window.supabase.createClient(
        NEXORA_SUPABASE_URL,
        NEXORA_SUPABASE_PUBLISHABLE_KEY
    );