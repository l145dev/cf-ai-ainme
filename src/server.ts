// this is where the Cloudflare worker will be located in (Backend)

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return new Response("Hello World!", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
