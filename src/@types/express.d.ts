/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    token: {
      id: string,
    },
  }
  namespace Multer {
    export interface File {
      key: string;
      location: string;
    }
    export interface Files {
      [key: string]: File;
    }
  }
}
