import Provider from './Provider.js';

class DocumentHighlightProvider extends Provider {
  async #provideDocumentHighlights(vscodeDocument, position) {
    const worker = await this.worker(vscodeDocument.uri);
    try {
      return await worker.doProvideDocumentHighlights(
        vscodeDocument.uri.toString(),
        this.codeConverter.asPosition(position),
        {}
      );
    } catch (error) {
      return undefined;
    }
  }

  async provideDocumentHighlights(vscodeDocument, position, token) {
    const documentHighlights = await this.#provideDocumentHighlights(
      vscodeDocument,
      position,
      token
    );

    return this.protocolConverter.asDocumentHighlights(documentHighlights);
  }
}

export default DocumentHighlightProvider;
