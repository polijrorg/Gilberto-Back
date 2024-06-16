import fs from 'fs';
import path from 'path';
import { Base64Encode } from 'base64-stream';

import PDFMake from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

import fonts from '../../../../../fonts/index';
import IPDFProvider from '../models/IPDFProvider';

export default class PDFMakeProvider implements IPDFProvider {
  async createPDFtoFile(docDefinition: TDocumentDefinitions, fileName: string, options: BufferOptions = {}): Promise<string> {
    // inicia o PDFMake
    const printer = new PDFMake(fonts);

    // cria o caminho onde o arquivo será escrito
    const filepath = path.resolve('tmp', `${fileName}.pdf`);

    const createPDF = async () => new Promise<void>((resolve) => {
      // gera a informação a ser escrita no arquivo
      const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

      // cria um fluxo de escrita ao novo arquivo
      const stream = fs.createWriteStream(filepath);

      // inicia a passagem de informação
      pdfDoc.pipe(stream);

      // acaba a passagem de informação
      pdfDoc.end();
      stream.on('finish', resolve);
    });

    await createPDF();

    return filepath;
  }

  async createPDFtoBase64(docDefinition: TDocumentDefinitions, options: BufferOptions = {}): Promise<string> {
    // inicia o PDFMake
    const printer = new PDFMake(fonts);

    const createPDF = async () => new Promise<string>((resolve) => {
      // gera a informação a ser escrita no arquivo
      const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

      let finalString = ''; // base64 string
      // inicia um fluxo de escrita codificado em base64
      const stream = pdfDoc.pipe(new Base64Encode());

      // acaba o fluxo de escrita
      pdfDoc.end();

      // para cada dado codificado, adiciona-o a string final
      stream.on('data', (chunk) => {
        finalString += chunk;
      });

      // no fim da escrita, devolde a string final
      stream.on('end', () => {
        resolve(finalString);
      });
    });

    return createPDF();
  }
}
