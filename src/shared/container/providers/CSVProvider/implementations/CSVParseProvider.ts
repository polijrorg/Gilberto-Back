import { injectable } from 'tsyringe';

import { parse } from 'csv-parse';
import path from 'path';
import fs from 'fs';

import multerConfig from '@config/multer';

import ICSVProvider from '../models/ICsvProvider';

@injectable()
export default class CSVParseProvider implements ICSVProvider {
  public async parseDocument<T>(fileName: string, keys: (keyof T)[], hasHeader = true, delimiter = ','): Promise<T[]> {
    const parser = parse({
      delimiter,
    });

    const originalPath = path.resolve(multerConfig.directory, fileName);

    const promise = new Promise<T[]>((resolve, reject) => {
      const parsedData: T[] = [];
      let hasSkipped = false;
      let newKeys = [...keys];

      parser.on('readable', async () => {
        let record = parser.read();

        if (hasHeader && !hasSkipped) {
          newKeys = [];
          for (let i = 0; i < keys.length; i += 1) {
            // eslint-disable-next-line no-loop-func
            const index = keys.findIndex((key) => record[i] === key);
            if (index !== -1) {
              newKeys[index] = keys[i];
            }
          }
          record = parser.read();
          hasSkipped = true;
        }

        while (record !== null) {
          const object: Partial<T> = {};
          for (let i = 0; i < keys.length; i += 1) {
            object[newKeys[i]] = record[i];
          }
          parsedData.push(object as T);
          record = parser.read();
        }
      });

      parser.on('end', () => {
        this.deleteFile(fileName);
        return resolve(parsedData);
      });

      parser.on('error', (err) => reject(err));

      fs.createReadStream(originalPath).pipe(parser);
    });

    return promise;
  }

  private async deleteFile(fileName: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, fileName);
    fs.promises.unlink(originalPath);
  }
}
