import Jimp from 'jimp';
import bwipjs from 'bwip-js';
import path from 'path';
import { generateFileName } from './common'


const FONT = Jimp.FONT_SANS_32_BLACK;

const prefixOptions = (options = {}) => {
    const rotate = options.rotate || 0;
    const marginTop = options.marginTop || 0;
    const marginLeft = options.marginLeft || 0;
    const marginRight = options.marginRight || 0;
    const marginBottom = options.marginBottom || 0;
    const width = options.width || 0;
    const height = options.height || 0;
    const background = options.background || '';
    return {
        rotate,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        width,
        height,
        background,
    };
};

const applyOptions = (jimp, options) => {
    options = prefixOptions(options);
    let {
        rotate,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        width,
        height,
        background,
    } = options;
    // jimp = jimp.background(0xffffffff);

    if (width && !height)
        height = parseInt((width / jimp.getWidth()) * jimp.getHeight());
    if (height && !width)
        width = parseInt((height / jimp.getHeight()) * jimp.getWidth());
    if (width && height) jimp = jimp.scaleToFit(width, height);
    jimp = jimp.rotate(rotate || 0);
    if (marginTop || marginLeft || marginRight || marginBottom) {
        const container = new Jimp(
            marginLeft + marginRight + jimp.getWidth(),
            marginTop + marginBottom + jimp.getHeight()
        );
        jimp = container.blit(jimp, marginLeft, marginTop);
    }
    if (background && parseInt(background)) {
        jimp = jimp.background(parseInt(background));
        jimp = jimp.rotate(0); // to trigger background change (jimp bug)
    }
    return jimp;
};

const createBarcodeJimp = async (barcode, options = {}) => {
    options.background = 0xffffffff;
    options.includetext = options.includeText || true;
    options.textxalign = options.textAlign || 'center';
    options.textyoffset = options.textGap || 5;
    options.textsize = options.textSize || 10;
    return new Promise((res, rej) => {
        bwipjs.toBuffer(
            {
                bcid: 'code128', // Barcode type
                text: barcode, // Text to encode
                height: 10, // Bar height, in millimeters
                scale: 5, // 3x scaling factor
                guardwhitespace: true,
                inkspread: 0,
                includetext: options.includetext, // Show human-readable text
                textxalign: options.textxalign, // Always good to set this
                textyoffset: options.textyoffset,
                textsize: options.textsize,
            },
            async (err, pngBuffer) => {
                if (err) return rej(err);
                let jimp = await Jimp.read(pngBuffer);
                jimp = applyOptions(jimp, options);
                res(jimp);
            }
        );
    });
};

const createTextJimp = async (text, options = {}) => {
    options = prefixOptions(options);
    const font = await Jimp.loadFont(FONT);
    const width = Jimp.measureText(font, text);
    const height = Jimp.measureTextHeight(font, text, 10500);
    const jimp = new Jimp(width, height);
    jimp.print(font, 0, 0, text);
    return applyOptions(jimp, options);
};

const generateJimp = async (item) => {
    if (item.type === 'barcode')
        return await createBarcodeJimp(item.data, item.options);
    if (item.type === 'text')
        return await createTextJimp(item.data, item.options);
    if (item.type === 'multiple')
        return await combineJimps(item.data, item.options);
};

const combineJimps = async (items, options = {}) => {
    const pngJimps = [];
    for (const item of items) {
        pngJimps.push(await generateJimp(item));
    }

    let totalWidth = pngJimps.reduce((p, c) => (p += c.getWidth()), 0);
    let totalHeight = Math.max(...pngJimps.map((el) => el.getHeight()));

    let container = new Jimp(totalWidth, totalHeight);
    if (options.background && parseInt(options.background))
        container = container.background(parseInt(options.background));
    let widthPoint = 0;
    for (const jimp of pngJimps) {
        container.blit(jimp, widthPoint, 0);
        widthPoint += jimp.getWidth();
    }
    container = applyOptions(container, options);
    return container;
};

const getMergedImage = async (userId, body) => {
    let { items, format, options } = body;

    if (!format) format = 'png';
    format = format.replace('.', '').toLowerCase();

    const jimp = await combineJimps(items, options);

    const fileName = generateFileName(userId);
    await jimp.writeAsync(path.join(__dirname, '../../public/images', fileName + '.' + format));
    return '/images/' + fileName + '.' + format;
};

const getImage = async (userId, body) => {
    let { item, format } = body;
    if (!format) format = 'png';
    format = format.replace('.', '').toLowerCase();

    const jimp = await generateJimp(item);

    const fileName = generateFileName(userId);
    jimp.writeAsync(path.join(__dirname, '../../public/images', fileName + '.' + format));

    return '/images/' + fileName + '.' + format;
};

export { getImage, getMergedImage }