import { INotebookFormatter } from "./INotebookFormatter";
import NotebookFormatter from "./NotebookFormatter";

const DEFAULT_TEMPLATE = `
# {{title}}
**Authors:** : {{authors}}
**Exported with** : kindle2md
---
{{#each sections}}
## {{heading}}
{{#each items}}
> {{text}}

*highlighted in **{{color}}** from **{{location}}***

{{/each}}

{{/each}}
`;

export {
    INotebookFormatter,
    NotebookFormatter,
    DEFAULT_TEMPLATE
}