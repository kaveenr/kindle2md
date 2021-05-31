import { KindleNotebook } from "./models";

export default interface IDocumentParser {
    parseDocument(htmlContent: string) : Promise<KindleNotebook>;
}