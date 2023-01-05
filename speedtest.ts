import { isRoot, Root } from "./types/speedtest.ts";

export default function (cmd: Deno.Command): Root {
  const { success, stdout, stderr } = cmd.outputSync();

  if (!success) {
    const err = new TextDecoder().decode(stderr);
    throw new Error(err);
  }

  const raw = new TextDecoder().decode(stdout);
  const root = JSON.parse(raw);

  if (isRoot(root)) {
    return root;
  }
  throw new Error("root is not Root type");
}

export const cmd = (): Deno.Command => {
  return new Deno.Command("speedtest", {
    args: ["-f", "json"],
  });
};
