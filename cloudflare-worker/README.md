# Free live chatbot (Cloudflare Worker)
1. dash.cloudflare.com -> Workers & Pages -> Create -> Create Worker -> name it `nisuv-chat` -> Deploy.
2. Click Edit code, delete everything, paste all of `worker.js`, click Deploy.
3. Worker -> Settings -> Bindings -> Add -> Workers AI -> Variable name: `AI` -> Save/Deploy.
4. Open https://nisuv-chat.<your-subdomain>.workers.dev/health  -> should show {"status":"ok"}.
5. Put that URL (no trailing slash) in .github/workflows/deploy.yml as NEXT_PUBLIC_API_URL, push to GitHub.
6. In worker.js, make sure ALLOWED_ORIGINS has your real domain.
