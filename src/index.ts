export interface Env {};

export default {
	async fetch(
		request: Request,
		_env: Env,
		_ctx: ExecutionContext,
	): Promise<Response> {
		// ctx.passThroughOnException();
		return handleRequest(request);
	}
}

const handleRequest = async (request: Request): Promise<Response> => {
	const response = await fetch(request);

  if (request.url === "https://connorthomasobrien.com/") {
    return new HTMLRewriter()
			.on("head", new HeadFixer())
			.transform(response);
  }

  return response;
};

class HeadFixer {
	element(e: Element) {
		console.log(e);
		e.append(`
			<script
				type="text/javascript"
				src="https://fe-hpe-script.s3.us-east-2.amazonaws.com/ref/fe_activity_fe-441-hpe-b2b-hybris-high-priority-cosmetic-fixes.js"
			></script>`, { html: true });
		console.log("code injected");
		e.append(`
			<link
				rel="stylesheet"
				type="text/css"
				data-id="foundry-login"
				href="https://cdn.jsdelivr.net/gh/TheEpicSnowWolf/Foundry-VTT-Prettier-Login-Screen@main/foundry_login.css"
			>
		`, { html: true });
		console.log("stylesheet injected");
	}
}
