import { Command } from "commander";
import { readFileSync, writeFileSync } from "fs";
import { generateGraph, parseAgency } from "agency-lang";
import { spawn } from "child_process";
const program = new Command();

program.name("agency").description("The Agency Language CLI").version("0.0.1");

program
  .command("run")
  .description("Run a .agency file")
  .argument("<filename>", "The .agency file to run")
  /*.option("--first", "display just the first substring")
   */
  /*   .option("-r, --region <string>", "AWS region (eg us-west-2)")
   */ .action(async (filename) => {
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
  });

program
  .command("compile")
  .description("Compile a .agency file")
  .argument("<filename>", "The .agency file to compile")
  .option(
    "-o, --out-file <file>",
    "File to write to (defaults to <filename>.ts"
  );

program.parse();

function printOrWrite(output: string) {
  const options: { outFile?: string } = program.opts();

  if (options.outFile) {
    // write to file
    console.log(`writing to file ${options.outFile}`);
    writeFileSync(options.outFile, output);
  } else {
    console.log(output);
  }
}
