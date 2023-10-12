import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";


const packageFields = [
    {
        title: "Paket Türü",
        dataIndex: "type",
        key: "type",
        render: (text) => <a href="#">{text}</a>,
        componentType: inputTypes.DROPDOWN,
        options: [
            { key: 1, label: 'Karton Kutu', value: 'Karton Kutu' },
            { key: 2, label: 'Palet', value: 'Palet' },
            { key: 3, label: 'Plastik Kutu', value: 'Plastik Kutu' },
            { key: 4, label: 'Cam Kutu', value: 'Cam Kutu' },
        ],
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Paket Adı",
        dataIndex: "name",
        key: "name",
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Paket Boyu",
        dataIndex: "length",
        key: "length",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: "",
        colVisible:false
    },
    {
        title: "Paketin Yükseklik ",
        dataIndex: "height",
        key: "height",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        required: true,
        editable: true,
        value: "",
        colVisible:false
    },
    {
        title: "Paketin Eni",
        dataIndex: "width",
        key: "width",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        required: true,
        editable: true,
        value: "",
        colVisible:false
    },
    {
        title: "Paketin Hacmi",
        dataIndex: "volume",
        render: (text,record) =>  <span>{record.length} x {record.height} x {record.width}</span>,
        key: "volume",
        keyboardType: "numeric",
        // componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        required: true,
        editable: true,
        value: "",
        colVisible:true
    }
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return packageFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

export default packageFields