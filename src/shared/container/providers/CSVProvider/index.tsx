import { container } from 'tsyringe';

import ICSVProvider from './models/ICsvProvider';
import CSVParseProvider from './implementations/CSVParseProvider';

const providers = {
  default: CSVParseProvider,
};

container.registerSingleton<ICSVProvider>('CSVProvider', providers.default);
