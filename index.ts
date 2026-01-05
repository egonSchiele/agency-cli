import { Command } from "commander";
import { writeFileSync } from "fs";
const program = new Command();

program.name("agency").description("The Agency Language CLI").version("0.0.1");

program
  .command("run")
  .description("Run a .agency file")
  .argument("<filename>", "The .agency file to run")
  /*.option("--first", "display just the first substring")
   */
  /*   .option("-r, --region <string>", "AWS region (eg us-west-2)")
   */ .action(async (options) => {
    console.log("Running agency file... TBD");
    /* printOrWrite(await init(options)); */
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
