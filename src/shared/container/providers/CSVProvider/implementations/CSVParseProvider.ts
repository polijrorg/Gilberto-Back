/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'tsyringe';
import { parse } from 'csv-parse';
import path from 'path';
import fs from 'fs';

import multerConfig from '@config/multer';
import ICSVProvider from '../models/ICsvProvider';

@injectable()
export default class CSVParseProvider implements ICSVProvider {
  public async parseDocument<T>(
    fileName: string,
    keys: (keyof T)[],
    hasHeader = true,
    delimiter = ',',
  ): Promise<T[]> {
    const parser = parse({
      delimiter,
      from_line: hasHeader ? 2 : 1, // Skip header line if present
    });

    const originalPath = path.resolve(multerConfig.directory, fileName);

    const promise = new Promise<T[]>((resolve, reject) => {
      const parsedData: T[] = [];
      let header: string[] = [];
      let hasSkipped = !hasHeader;

      parser.on('readable', () => {
        let record = parser.read();

        if (hasHeader && !hasSkipped) {
          header = record;
          hasSkipped = true;
          return;
        }

        while (record !== null) {
          const object: Partial<T> = {};
          for (let i = 0; i < keys.length; i += 1) {
            object[keys[i]] = record[i];
          }
          parsedData.push(object as T);
          record = parser.read();
        }
      });

      parser.on('end', () => {
        this.deleteFile(fileName);
        resolve(parsedData);
      });

      parser.on('error', (err) => {
        this.deleteFile(fileName);
        reject(err);
      });

      fs.createReadStream(originalPath).pipe(parser);
    });

    return promise;
  }

  private async deleteFile(fileName: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, fileName);
    try {
      await fs.promises.unlink(originalPath);
    } catch (error) {
      console.error(`Error deleting file ${fileName}:`, error);
    }
  }
}
