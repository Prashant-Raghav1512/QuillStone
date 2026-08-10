import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { handleQuery } from './server/handleQuery.js';

// Serves /api/queries during `vite dev`, so the contact form works locally
// without deploying anywhere.
function apiDevMiddleware(databaseUrl: string | undefined): Plugin {
  return {
    name: 'local-api-queries',
    configureServer(server) {
      server.middlewares.use('/api/queries', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        let body = {};
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
          return;
        }
        const result = await handleQuery(body, databaseUrl);
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.json));
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // GitHub Pages serves this project from /QuillStone/, not the domain root.
    base: command === 'build' ? '/QuillStone/' : '/',
    plugins: [react(), apiDevMiddleware(env.DATABASE_URL)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
