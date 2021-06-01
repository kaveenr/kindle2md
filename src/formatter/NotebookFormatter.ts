import { TemplateDelegate, compile } from "handlebars";
import { INotebookFormatter } from "../core/fomatter";
import { KindleNotebook, } from "../core/parser";

export default class NotebookFormatter implements INotebookFormatter {

    private readonly outTemplate: TemplateDelegate;

    constructor(templateSrc: string) {
        this.outTemplate = compile(templateSrc);
    }

    format(notebook: KindleNotebook): string {
        return this.outTemplate(notebook);
    }

}