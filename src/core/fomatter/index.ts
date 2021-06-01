import { KindleNotebook } from "../parser";

export interface INotebookFormatter {
    format(notebook: KindleNotebook): string;
}