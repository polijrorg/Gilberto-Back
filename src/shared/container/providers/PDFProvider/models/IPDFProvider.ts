import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

interface IPDFProvider {
  createPDFtoFile(docDefinition: TDocumentDefinitions, fileName: string, options?: BufferOptions): Promise<string>;
  createPDFtoBase64(docDefinition: TDocumentDefinitions, options?: BufferOptions): Promise<string>;
}

export default IPDFProvider;
