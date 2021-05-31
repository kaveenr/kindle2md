import { TemplateDelegate, compile } from "handlebars";
import { KindleNotebook } from "../parser/models";
import { INotebookFormatter } from "./INotebookFormatter";

export default class NotebookFormatter implements INotebookFormatter {

    private readonly outTemplate: TemplateDelegate;

    constructor(templateSrc: string) {
        this.outTemplate = compile(templateSrc);
    }

    format(notebook: KindleNotebook): string {
        return this.outTemplate(notebook);
    }

}