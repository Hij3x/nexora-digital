/* =========================================================
   NEXORA — SUPABASE CONNECTION
========================================================= */

/*
    Paste YOUR Supabase information below.

    Safe for browser:
    ✓ Project URL
    ✓ Publishable key

    NEVER put these here:
    ✗ Database password
    ✗ Secret key
    ✗ Service role key
*/


const NEXORA_SUPABASE_URL =
    "https://ksbdualsuyncotulswum.supabase.co";


const NEXORA_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_1U8nGWfDORe2Vgn0glx3XA_P2n73w-v";



/* =========================================================
   VALIDATE CONFIGURATION
========================================================= */

if (
    NEXORA_SUPABASE_URL.includes("PASTE_") ||
    NEXORA_SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")
) {

    console.warn(
        "Nexora: Supabase has not been configured yet."
    );

}



/* =========================================================
   CREATE CLIENT
========================================================= */

const nexoraSupabase =
    window.supabase.createClient(
        NEXORA_SUPABASE_URL,
        NEXORA_SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {

                persistSession: true,

                autoRefreshToken: true,

                detectSessionInUrl: true

            }
        }
    );


console.log(
    "Nexora: Supabase client initialized."
);