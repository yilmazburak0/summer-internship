import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import https from 'https';
import path from 'path';

class FireStore {
  constructor() {
    this.storage = new Storage({
      projectId: 'blendedbussines',
      //keyFilename: '../../../blendedbussines-firebase-adminsdk-quhfm-342de6804e.json',
      keyFilename: 'blendedbussines-firebase-adminsdk-quhfm-342de6804e.json',
    });

    this.bucketName = 'blendedbussines.appspot.com';
  }

  async getAllFiles() {
    const allFiles = await this.storage.bucket(this.bucketName).getFiles();

    const [files] = allFiles;
    console.log('count:', files.length);
    const result = files.map((el) => ({
      name: el.name,
    }));

    return result;
  }

  async generateSignedUrl(folder, fileName) {
    // These options will allow temporary read access to the file
    const options = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // one hour
    };

    // Get a v2 signed URL for the file
    const [url] = await this.storage
      .bucket(this.bucketName)
      .file(folder + '/' + fileName)
      .getSignedUrl(options);

    console.log(`The signed url for ${fileName} is ${url}.`);
    return url;
  }

  async deleteFile(folderName, fileName) {
    try {
      await this.storage
        .bucket(this.bucketName)
        .file(folderName + '/' + fileName)
        .delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async createFileFromLocal(folderName, fileName, path) {
    const file = await this.storage.bucket(this.bucketName).upload(path, {
      destination: folderName + '/' + fileName,
    });
    console.log('file : ', file);
    const publicUrl = file[0].publicUrl();
    console.log('public url : ', publicUrl);
    return publicUrl;
  }
  async uploadImage(destination, image) {
    const file = this.storage.bucket(this.bucketName).file(destination);
    await file.save(image);
    return file.publicUrl();
  }
  async createFileFromUrl(folderName, fileName, url) {
    const PdfPath = await this.downloadFileFromUrl(fileName, url);

    const file = await this.storage.bucket(this.bucketName).upload(PdfPath, {
      destination: folderName + '/' + fileName,
    });
    console.log('file : ', file);
    const publicUrl = file[0].publicUrl();

    // dosyayı silme
    fs.rmSync(PdfPath);

    console.log('public url : ', publicUrl);
    return publicUrl;
  }

  downloadFileFromUrl(fileName, url) {
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(path.join(__dirname, 'src/downloadedPdfs'))) {
          fs.mkdirSync(path.join(__dirname, 'src/downloadedPdfs'));
        }

        const PdfPath = 'src/downloadedPdfs/' + fileName;
        const file = fs.createWriteStream(PdfPath);
        https
          .get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
              file.close();
              resolve(PdfPath);
            });
          })
          .on('error', function (err) {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default FireStore;
