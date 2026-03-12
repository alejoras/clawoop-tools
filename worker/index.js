export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (!key) {
      return new Response('clawoop-state API', { headers });
    }

    if (request.method === 'GET') {
      const value = await env.STATE.get(key);
      return new Response(value || '{}', {
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'PUT') {
      const body = await request.text();
      await env.STATE.put(key, body);
      return new Response('ok', { headers });
    }

    return new Response('Not found', { status: 404, headers });
  },
};
