import ErrorResponse from 'helpers/errorResponse';
import Axios from 'axios';
import errors from 'enums/errors';
import JSZip from 'jszip'
import path from 'path';
import fs from 'fs'
import { generateBarcodeObject } from 'helpers/barcode';
import { getImage as getImageHelper, getMergedImage as getMergedImageHelper } from '../helpers/imageEditor';

export const getImage = async (req, res) => {
  if (req.body.item) {
    let url = await getImageHelper(req.user.shortId, req.body);
    //url = `${req.protocol}://${req.get('host')}${url}`;
    url = `https://${req.get('host')}${url}`;
    console.log('url', url);
    res.send(url);
  } else {
    const respData = 'wrong req. example body :' + JSON.stringify(exampleData);
    res.status(400).send(respData);
  }
};

export const getMergedImage = async (req, res) => {
  console.log('convertFromUrl');
  if (req.body.items) {
    let url = await getMergedImageHelper(req.user.shortId, req.body);
    //url = `${req.protocol}://${req.get('host')}${url}`;
    url = `https://${req.get('host')}${url}`;
    console.log('url', url);
    res.send(url);
  } else {
    const respData = 'wrong req. example body :' + JSON.stringify(exampleData);
    res.status(400).send(respData);
  }
};

export const getMultipleBarcodes = async (req, res) => {
  const { data, fileName } = req.body
  if (data?.lenght < 1) throw new ErrorResponse(errors.RECORD_NOT_FOUND, "data is empty.")

  //const tempDir = createTempFolder()
  var zip = new JSZip();

  for (const item of data) {
    const items = [
      ...generateBarcodeObject(0, item.barcode, `Gönder Satalim (${item.modelCode})`),
      ...generateBarcodeObject(1, item.barcode, `Gönder Satalim (${item.modelCode})`),
      ...generateBarcodeObject(2, item.barcode, `Gönder Satalim (${item.modelCode})`)
    ]
    const sendData = { items, format: '.png', options: { background: '0xffffffff' } }
    const imgUrl = await getMergedImageHelper(req.user.shortId, sendData);
    const imgPath = path.join(__dirname, '../../public', imgUrl)
    const imgBuffer = fs.readFileSync(imgPath)
    zip.file(`${item.barcode}.png`, imgBuffer);
    fs.rm(imgPath, () => { })
  }

  const buf = await zip.generateAsync({ type: 'base64' })
  //const filePath = `${tempDir}/${fileName}.zip`
  //fs.writeFileSync(filePath,buf)
  res.send(buf)

};

export const pdfToUrl = async (req, res) => {
  res.send(await Axios.post('https://bproservis.com/convertFromUrl', req.body).data);
};
