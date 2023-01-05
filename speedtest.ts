import { isRoot, Root } from "./types/speedtest.ts";

export default async (): Promise<Root> => {
  const cmd = Deno.run({
    cmd: ["speedtest", "-f", "json"],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await cmd.status();

  if (code === 0) {
    const output = await cmd.output();
    const raw = new TextDecoder().decode(output);
    const root = JSON.parse(raw);
    if (isRoot(root)) {
      return root;
    }
    throw new Error("root is not Root type");
  } else {
    const raw = await cmd.stderrOutput();
    const error = new TextDecoder().decode(raw);
    throw new Error(error);
  }
};
