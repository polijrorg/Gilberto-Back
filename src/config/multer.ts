import multer from 'multer';
import path from 'path';

// Diretório temporário para armazenar arquivos enviados
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

// Configuração do Multer para armazenamento em disco
const storage = multer.diskStorage({
  destination: tmpFolder,
  filename: (req, file, callback) => {
    const fileHash = `${Date.now()}`;
    const fileName = `${fileHash}-${file.originalname.replace(/\s/g, '')}`;
    callback(null, fileName);
  },
});

export default {
  directory: tmpFolder,
  storage,
};
