export const generateBarcodeObject = (index, item, text) => {
    if (index === 0)
        return [
            {
                type: 'text',
                data: text,
                options: {
                    rotate: 90,
                    width: 500,
                    marginLeft: 40,
                    marginTop: 20,
                },
            },
            {
                type: 'barcode',
                data: item,
                options: {
                    rotate: 90,
                    marginTop: 20,
                    width: 500,
                    textSize: 16,
                },
            },
        ];
    else if (index === 1)
        return [
            {
                type: 'text',
                data: text,
                options: {
                    rotate: 90,
                    width: 500,
                    marginLeft: 110,
                    marginTop: 20,
                },
            },
            {
                type: 'barcode',
                data: item,
                options: {
                    rotate: 90,
                    marginTop: 20,
                    width: 500,
                    textSize: 16,
                },
            },
        ];
    else
        return [
            {
                type: 'text',
                data: text,
                options: {
                    rotate: 90,
                    width: 500,
                    marginLeft: 110,
                    marginTop: 20,
                },
            },
            {
                type: 'barcode',
                data: item,
                options: {
                    rotate: 90,
                    marginTop: 20,
                    width: 500,
                    textSize: 16,
                },
            },
        ];
};
