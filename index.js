import { Router } from 'itty-router';
import { co2 } from '@tgwf/co2';

// Create a new router
const router = Router();

router.get("/", () => {
  return new Response("Hello, world! This is your carbon calculator.")
});

router.get("/co2/:bytes/:model/:country/:greenHosting", ({params}) => {
  console.log(params);
  const { bytes, model, country, greenHosting } = params;

  const emissions = new co2(model);
  const result = emissions.perByte(bytes);

  return new Response(JSON.stringify({model,result}), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
});

router.all("*", () => new Response("404, not found!", { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
});