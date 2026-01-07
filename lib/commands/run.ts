import { parseAgency, generateGraph } from "agency-lang";
import { spawn } from "child_process";
import { readFileSync, writeFileSync } from "fs";

export async function commandRun(filename: string) {
  const contents = readFileSync(filename, "utf-8");
  const program = parseAgency(contents);
  if (program.success === false) {
    console.error("Failed to parse .agency file:");
    console.error(program.message);
    process.exit(1);
  }
  const newFilename = filename.replace(/\.agency$/, ".ts");
  const tsCode = generateGraph(program.result);
  writeFileSync(newFilename, tsCode);
  console.log(`Wrote temporary file to ${newFilename}`);
  // now run the file with ts-node
  const child = spawn("node", [newFilename], {
    stdio: "inherit",
  });
  child.on("exit", (code) => {
    // delete the temporary file
    // fs.unlinkSync(newFilename);
    process.exit(code ?? 0);
  });
}
