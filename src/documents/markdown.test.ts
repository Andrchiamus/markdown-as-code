import { createMarkdownDocument } from './markdown.js';
import { Roadmap } from '../sections/roadmap.js';

describe('Markdown Document', () => {
  it('should synthesize a basic document', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection(new Roadmap().add({ text: 'Item 1' }));

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection('Custom Section', 'Some markdown content');

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should throw an error if content is undefined', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    // Cast to string so it will compile
    const undefinedContent = undefined as unknown as string;

    expect(() =>
      markdownDoc.addSection('Custom Section', undefinedContent)
    ).toThrowError();
  });
});