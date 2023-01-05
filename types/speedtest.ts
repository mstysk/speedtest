export interface Root {
  type: string;
  timestamp: string;
  ping: Ping;
  download: Download;
  upload: Upload;
  isp: string;
  interface: Interface;
  server: Server;
  result: Result;
}

export interface Ping {
  jitter: number;
  latency: number;
  low: number;
  high: number;
}

export interface Download {
  bandwidth: number;
  bytes: number;
  elapsed: number;
  latency: Latency;
}

export interface Latency {
  iqm: number;
  low: number;
  high: number;
  jitter: number;
}

export interface Upload {
  bandwidth: number;
  bytes: number;
  elapsed: number;
  latency: Latency2;
}

export interface Latency2 {
  iqm: number;
  low: number;
  high: number;
  jitter: number;
}

export interface Interface {
  internalIp: string;
  name: string;
  macAddr: string;
  isVpn: boolean;
  externalIp: string;
}

export interface Server {
  id: number;
  host: string;
  port: number;
  name: string;
  location: string;
  country: string;
  ip: string;
}

export interface Result {
  id: string;
  url: string;
  persisted: boolean;
}

export const isRoot = (root: Root): root is Root =>
  typeof root.type === "string" &&
  typeof root.timestamp === "string" &&
  isPing(root.ping) &&
  isDownload(root.download) &&
  isUpload(root.upload) &&
  typeof root.isp === "string" &&
  isInterface(root.interface) &&
  isServer(root.server) &&
  isResult(root.result);

export const isPing = (ping: Ping): ping is Ping =>
  typeof ping.jitter === "number" &&
  typeof ping.latency === "number" &&
  typeof ping.low === "number" &&
  typeof ping.high === "number";

export const isDownload = (download: Download): download is Download =>
  typeof download.bandwidth === "number" &&
  typeof download.bytes === "number" &&
  typeof download.elapsed === "number" &&
  isLatency(download.latency);

export const isLatency = (latency: Latency): latency is Latency =>
  typeof latency.iqm === "number" &&
  typeof latency.low === "number" &&
  typeof latency.high === "number" &&
  typeof latency.jitter === "number";

export const isUpload = (upload: Upload): upload is Upload =>
  typeof upload.bandwidth === "number" &&
  typeof upload.bytes === "number" &&
  typeof upload.elapsed === "number" &&
  isLatency(upload.latency);

export const isInterface = (interfaces: Interface): interfaces is Interface =>
  typeof interfaces.internalIp === "string" &&
  typeof interfaces.name === "string" &&
  typeof interfaces.macAddr === "string" &&
  typeof interfaces.isVpn === "boolean" &&
  typeof interfaces.externalIp === "string";

export const isServer = (server: Server): server is Server =>
  typeof server.id === "number" &&
  typeof server.host === "string" &&
  typeof server.port === "number" &&
  typeof server.name === "string" &&
  typeof server.location === "string" &&
  typeof server.country === "string" &&
  typeof server.ip === "string";

export const isResult = (result: Result): result is Result =>
  typeof result.id === "string" &&
  typeof result.url === "string" &&
  typeof result.persisted === "boolean";
