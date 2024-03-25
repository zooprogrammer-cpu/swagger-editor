import Provider from './Provider.js';

class DocumentHighlightProvider extends Provider {
  // eslint-disable-next-line no-unused-vars
  async #provideDocumentHighlights(vscodeDocument, position, token) {
    const worker = await this.worker(vscodeDocument.uri);
    console.log('#provideDocumentHighlights', vscodeDocument.uri.toString(), position, token);
    try {
      return await worker.doProvideDocumentHighlights(
        vscodeDocument.uri.toString(),
        this.codeConverter.asPosition(position),
        {} // token // this.codeConverter.asCancellationToken(token)
      );
    } catch (error) {
      console.log('DocumentHighlightProvider.#provideDocumentHighlights error', error);
      return undefined;
    }
  }

  async provideDocumentHighlights(vscodeDocument, position, token) {
    console.log(
      'DocumentHighlightProvider.provideDocumentHighlights',
      vscodeDocument,
      position,
      token
    );
    const documentHighlights = await this.#provideDocumentHighlights(
      vscodeDocument,
      position,
      token
    );
    console.log(
      'DocumentHighlightProvider.provideDocumentHighlights documentHighlights',
      documentHighlights
    );
    return this.protocolConverter.asDocumentHighlights(documentHighlights);
  }
}

export default DocumentHighlightProvider;
