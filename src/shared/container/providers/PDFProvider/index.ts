import { container } from 'tsyringe';
import IPDFProvider from './models/IPDFProvider';
import PDFMakeProvider from './implementations/PDFMakeProvider';

container.registerSingleton<IPDFProvider>('PDFProvider', PDFMakeProvider);
