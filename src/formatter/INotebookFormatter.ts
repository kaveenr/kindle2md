import { KindleNotebook } from "../parser/models";

export interface INotebookFormatter {
    format(notebook: KindleNotebook): string;
}