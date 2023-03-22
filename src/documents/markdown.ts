import { writeFileSync } from 'fs';
import { join } from 'path';
import { ContentSection } from '../sections/content-section.js';
import { DocumentSection } from '../sections/section.js';
import { TableOfContentsSection } from '../sections/table-of-contents.js';
import { heading } from '../syntax/heading.js';

export interface MarkdownOptions {
  fileName: string;

  /**
   * The directory the markdown file will be written to
   *
   * @default project root directory
   */
  outDir?: string;

  title: string;
  description?: string;

  /**
   * Include a table of contents in the output
   *
   * @default true
   */
  tableOfContents?: boolean;
}

export class MarkdownDocument {
  private _outDir: string;
  private _tableOfContents: boolean;
  private _sections: Array<DocumentSection> = [];

  constructor(private options: MarkdownOptions) {
    this._outDir = options.outDir ?? process.cwd();
    this._tableOfContents = options.tableOfContents ?? true;
    return this;
  }

  public addSection(section: DocumentSection): this;
  public addSection(title: string, content: string): this;
  public addSection(
    sectionOrTitle: DocumentSection | string,
    content?: string
  ): this {
    console.log(sectionOrTitle, content);
    if (sectionOrTitle instanceof DocumentSection) {
      console.log('Is instance of DocumentSection');
      this._sections.push(sectionOrTitle);
      return this;
    }
    if (!content) {
      throw new Error('Content is required');
    }
    this._sections.push(new ContentSection(sectionOrTitle, content));
    return this;
  }

  protected synthContent() {
    let tableOfContents;
    if (this._tableOfContents) {
      tableOfContents = new TableOfContentsSection({
        sections: this._sections,
      }).synthesize();
    }

    return [
      heading(1, this.options.title),
      this.options.description,
      tableOfContents,
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  public synth() {
    const lines = [this.synthContent()];
    console.log(this._sections);
    for (const component of this._sections) {
      lines.push(component.synthesize());
    }

    writeFileSync(
      join(this._outDir, this.options.fileName),
      lines.join('\n\n')
    );
  }
}

export const createMarkdownDocument = (options: MarkdownOptions) =>
  new MarkdownDocument(options);