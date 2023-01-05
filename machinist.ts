const MACHINIST_ENDPOINT = "https://gw.machinist.iij.jp/endpoint";
import { Latency, Ping } from "./types/speedtest.ts";
import { Params, Metoric } from "./types/machinist.ts";

export const post = async (params: Params, apiKey: string) => {
  const res = await fetch(MACHINIST_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(body(params)),
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

const body = (params: Params) => {
  const metorics = params.metorics.map((metoric) => {
    return {
      name: metoric.name,
      namespace: metoric.namespace,
      data_point: {
        value: metoric.value,
      },
    };
  });
  return {
    agent: params.agent,
    metrics: metorics,
  };
};

export const metorics = (namespace: string, obj: Ping | Latency) => {
  return Object.entries(obj).map(([key, value]): Metoric => {
    return {
      namespace,
      name: key,
      value,
    };
  }).filter((metoric: Metoric) => ["high", "low"].includes(metoric.name));
};
