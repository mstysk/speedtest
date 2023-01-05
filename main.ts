import speedtest from "./speedtest.ts";
import { post } from "./machinist.ts";
import { metrics } from "./machinist.ts";
import { isString } from "./types/utils.ts";

try {
  const apiKey = Deno.env.get("API_KEY");

  if (!isString(apiKey)) {
    console.error("No such API KEY");
    Deno.exit(1);
  }

  const root = await speedtest();

  const resPing = post({
    agent: "ping",
    metrics: metrics("speedtest.ping", root.ping),
  }, apiKey);

  const resDownload = post({
    agent: "download",
    metrics: metrics("speedtest.download", root.download.latency),
  }, apiKey);

  const resUpload = post({
    agent: "upload",
    metrics: metrics("speedtest.upload", root.upload.latency),
  }, apiKey);

  Promise.all([resPing, resDownload, resUpload]).then((values) => {
    console.log(values);
  });
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
