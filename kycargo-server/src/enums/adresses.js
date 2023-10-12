export const senderInfo = [
  {
    id: 1,
    name: 'Elay lojistik',
    address: 'Adalet Mah. 1645/7 Sok. No:25/B Bayraklı/İzmir',
    bankInfo: 'Garanti Bankası Karşıyaka Şb.',
    bankBranchCode: '92',
    swiftCode: 'TGBATRIS',
    ibanNo: 'TR12 0006 2001 5960 0009 0979 15',
    accountNo: '1596-909-7915',
  },
  {
    id: 2,
    name: 'Gönder Satalım',
    address: '',
    bankInfo: '',
    bankBranchCode: '',
    swiftCode: '',
    ibanNo: '',
    accountNo: ''
  },
];

export const receiverInfo = [
  {
    id: 1,
    name: 'Bynintu B.V',
    address: 'Kattenkruidweg 35 3541RT UTRECHT-NEDERLAND',
    deliveryAddress: 'HC GROUP Fahrenheitstraat 11 6003 DC Weert Nederland',
    taxNumber: 'NL862409664B01',
  },
  {
    id: 2,
    name: 'Blnded Businesse B.V',
    address: 'De Limiet 15F003 4131NR Vianen-Nederland',
    taxNumber: 'NL860025718B01',
  },
];

export let warehouseInfo;
if (process.env.NODE_ENV === 'production') {
  warehouseInfo = [
    {
      id: 1,
      name: 'Hollanda',
      warehouseId: '62e5233f5e2c5bf355481956',
    },
  ];
} else {
  warehouseInfo = [
    {
      id: 1,
      name: 'Hollanda',
      warehouseId: '62e5233f5e2c5bf355481956',
    },
  ];
}

Object.freeze(senderInfo);
Object.freeze(receiverInfo);
Object.freeze(warehouseInfo);
