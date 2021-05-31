import {Command, flags} from '@oclif/command'
import { readFileSync, writeFileSync } from "fs";
import { DEFAULT_TEMPLATE, INotebookFormatter, NotebookFormatter } from './formatter';
import { DocumentParser, IDocumentParser } from './parser';

class Kindle2Md extends Command {
  static description = 'Converts Kindle exported HTML file to markdown file';

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    outFile: flags.string({char: 'o', description: 'output file'}),
  }

  static args = [{name: 'file', required: true}]

  static parser: IDocumentParser = new DocumentParser();

  async run() {
    const {args, flags} = this.parse(Kindle2Md)
    
    const inFile = readFileSync(args.file,"utf-8");
    const parserResult = await Kindle2Md.parser.parseDocument(inFile);

    const fomatter: INotebookFormatter = new NotebookFormatter(DEFAULT_TEMPLATE);
    const outFile = fomatter.format(parserResult);

    if (flags.outFile) {
        this.log(`Writing to file ${flags.outFile}`);
        writeFileSync(flags.outFile, outFile, "utf-8");
        return;
    }
    this.log(outFile);
  }
}

export = Kindle2Md
