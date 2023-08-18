import { Router } from 'itty-router';
import { co2 } from '@tgwf/co2';

const router = Router();

router.get("/", () => {
  return new Response("Welcome to Carbon Calculator ...");
});

router.get("/co2/:kb/:model/:country", ({params}) => {
  const { kb, model, country } = params;
  
  const bytes = kb * 1000;
  const greenHost = false;
  const options = {
    gridIntensity: {
      device: { country: `${country}` },
    },
  };

  const co2Emission = new co2({ model: `${model}`, results: "segment"});
  estimatedCO2 = co2Emission.perVisitTrace(bytes, greenHost);

  return new Response(JSON.stringify({ model, estimatedCO2 }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
});

router.all("*", () => new Response("Bad request", { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
});