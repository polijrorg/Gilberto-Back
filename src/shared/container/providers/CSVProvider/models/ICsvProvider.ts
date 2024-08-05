interface ICSVProvider {
  parseDocument<T>(fileName: string, keys: (keyof T)[], hasHeader?: boolean, delimiter?: string): Promise<T[]>;
  }

export default ICSVProvider;
