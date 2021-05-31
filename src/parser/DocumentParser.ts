import { load } from "cheerio";
import IDocumentParser from "./IDocumentParser";
import { DivSectionsEnum, KindleNotebook, KindleNotebookHighlightItem, KindleNotebookSections } from "./models";

export default class DocumentParser implements IDocumentParser {

    async parseDocument(htmlContent: string): Promise<KindleNotebook> {
        const $ = load(htmlContent);

        let result: KindleNotebook = {
            title: $("div.bookTitle").text().trim(),
            authors: $("div.authors").text().trim(),
            citation: $("div.citation").text().trim() || undefined,
            sections: []
        }

        const filterFields = Object.values(DivSectionsEnum)
            .map(f=> `div.${f}`).join(", ");

        const applicableDivs = $(filterFields);

        let workingSection: KindleNotebookSections | undefined = undefined;
        let workingItems: KindleNotebookHighlightItem[] = [];
        let workingHighlight: KindleNotebookHighlightItem | undefined = undefined;

        for (let divIndex = 0; divIndex < applicableDivs.length; divIndex++) {
            const currentDiv = $(applicableDivs[divIndex]);
            // Check If Current Is Section
            if (currentDiv.attr('class') == DivSectionsEnum.sectionHeading) {
                // Check If Section Is Marked
                // If so append to result sections
                if (workingSection != undefined) {
                    result.sections.push({
                        ...workingSection,
                        items: workingItems
                    });
                }
                // Set Current Section
                workingSection = {
                    heading: currentDiv.text().trim(),
                    items: []
                }
            }
            // Check if note heading
            if (currentDiv.attr('class') == DivSectionsEnum.noteHeading) {
                workingHighlight = {
                    color: currentDiv.find("span").text().trim(),
                    location: currentDiv.text().trim().split("-")[1].trim()
                }
            }
            // Check if note heading
            if (currentDiv.attr('class') == DivSectionsEnum.noteText) {
                if (workingHighlight) {
                    workingHighlight.text = currentDiv.text().trim();
                    workingItems.push(workingHighlight);
                }
            }
        }

        return result;
    }

}