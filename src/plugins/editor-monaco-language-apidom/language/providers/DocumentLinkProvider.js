import Provider from './Provider.js';

class DocumentLinkProvider extends Provider {
  async #getLinks(vscodeDocument) {
    const worker = await this.worker(vscodeDocument.uri);
    return worker.doLinks(vscodeDocument.uri.toString());
  }

  async provideDocumentLinks(vscodeDocument) {
    try {
      const links = await this.#getLinks(vscodeDocument);
      const linksWithNonEmptyRanges = links.filter(
        (link) => !this.protocolConverter.asRange(link.range).isEmpty
      );

      return this.protocolConverter.asDocumentLinks(linksWithNonEmptyRanges);
    } catch {
      return undefined;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async resolveDocumentLink(link) {
    return link;
  }
}

export default DocumentLinkProvider;
