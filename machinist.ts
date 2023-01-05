const MACHINIST_ENDPOINT = "https://gw.machinist.iij.jp/endpoint";
import { Latency, Ping } from "./types/speedtest.ts";
import { Body, Metric } from "./types/machinist.ts";

export const post = async (body: Body, apiKey: string) => {
  const res = await fetch(MACHINIST_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error.toString());
  }
  return await res.json();
};

export const metrics = (namespace: string, obj: Ping | Latency) => {
  return Object.entries(obj).map(([key, value]): Metric => {
    return {
      namespace,
      name: key,
      data_point: {
        value,
      },
    };
  }).filter((metoric: Metric) => ["high", "low"].includes(metoric.name));
};
