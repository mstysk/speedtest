import {
  assertSpyCall,
  assertSpyCalls,
  stub,
} from "https://deno.land/std@0.170.0/testing/mock.ts";
import speedtest from "./speedtest.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { isRoot } from "./types/speedtest.ts";

Deno.test("speedtest run success", async () => {
  const cmd = new Deno.Command("speedtest", {
    args: ["-f", "json"],
  });
  const file = await Deno.readFile("./tests/_data/speedtest.test.json");
  const body = {
    stdout: file,
    stderr: new Uint8Array(2),
    success: true,
    code: 1,
    signal: null,
  };

  const output = stub(cmd, "outputSync", () => body);
  const root = speedtest(cmd);
  assertEquals(true, isRoot(root));
  assertSpyCall(output, 0, {
    args: [],
    self: cmd,
    returned: body,
  });
  assertSpyCalls(output, 1);
  output.restore();
});

Deno.test("speedtest run failed", async () => {
  const cmd = new Deno.Command("speedtest", {
    args: ["-f", "json"],
  });
  const file = await Deno.readFile("./tests/_data/speedtest.test.json");
  const body = {
    stdout: file,
    stderr: new Uint8Array(2),
    success: false,
    code: 0,
    signal: null,
  };

  const output = stub(cmd, "outputSync", () => body);
  assertThrows(() => speedtest(cmd));
  assertSpyCalls(output, 1);
  output.restore();
});

Deno.test("speedtest run sucess but output is not Root type", async () => {
  const cmd = new Deno.Command("speedtest", {
    args: ["-f", "json"],
  });
  const file = await Deno.readFile("./tests/_data/speedtest.bad.json");
  const body = {
    stdout: file,
    stderr: new Uint8Array(2),
    success: false,
    code: 0,
    signal: null,
  };

  const output = stub(cmd, "outputSync", () => body);
  assertThrows(() => speedtest(cmd));
  assertSpyCalls(output, 1);
  output.restore();
});
