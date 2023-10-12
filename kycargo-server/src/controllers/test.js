import { extractLangFields } from "helpers/product";
import product from '../../public/product.json'
import updateproduct from '../../public/updateproduct.json'

export const excelUp = async (req, res) => {
    let arr = []
    product.map(async pr => {
        const { barcode } = pr
        const product = await Product.findOneAndUpdate({ barcode }, pr)
        console.log(barcode);
    })
    res.send("done");
    /*updateproduct.map(pr => {
        arr.push(extractLangFields(pr))
    })
    res.send(arr);*/
};