export interface KindleNotebookHighlightItem {
    color: string;
    location: string;
    text?: string;
}
export interface KindleNotebookSections {
    heading: string;
    items: KindleNotebookHighlightItem[];
}
export interface KindleNotebook {
    title: string;
    authors: string;
    citation?: string;
    sections: KindleNotebookSections[]
}

export enum DivSectionsEnum {
    sectionHeading="sectionHeading",
    noteHeading="noteHeading",
    noteText="noteText"
}