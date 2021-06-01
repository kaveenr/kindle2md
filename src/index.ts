import {Command, flags} from '@oclif/command'
import { readFileSync, writeFileSync } from "fs";
import { INotebookFormatter } from './core/fomatter';
import { IDocumentParser } from './core/parser';
import { DEFAULT_TEMPLATE, NotebookFormatter } from './formatter';
import { DocumentParser } from './parser';

class Kindle2Md extends Command {
  static description = 'Converts Kindle exported HTML file to markdown file';

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    outFile: flags.string({char: 'o', description: 'output file'}),
  }

  static args = [{name: 'file', required: true}]

  async run() {
    const {args, flags} = this.parse(Kindle2Md)
    
    const inFile = readFileSync(args.file,"utf-8");

    const parser: IDocumentParser = new DocumentParser()
    const fomatter: INotebookFormatter = new NotebookFormatter(DEFAULT_TEMPLATE);

    const parserResult = await parser.parseDocument(inFile);  
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
