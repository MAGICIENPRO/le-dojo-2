/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🔗 Sous-dossier pour intégration avec magicienpro.fr
    basePath: '/dojo',
    trailingSlash: true,

    reactStrictMode: true,

    // 🔒 Headers de sécurité (Agent Sécurité — P0)
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Empêche le clickjacking (iframe embedding)
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // Empêche le XSS par MIME sniffing
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Force HTTPS pendant 1 an
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    // Contrôle du referrer
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Bloque les fonctionnalités non utilisées
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), payment=()',
                    },
                    // No-Index (Expert SEO — P0)
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow',
                    },
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval requis en dev — à retirer en prod
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https://*.supabase.co",
                            "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.mistral.ai",
                            "frame-ancestors 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
