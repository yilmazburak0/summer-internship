import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";


const transportFields = [
    {
        title: "Sefer Numarası",
        dataIndex: "transportNo",
        key: "transportNo",
        keyboardType: "numeric",
        //componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    }
    ,{
        title: "Araç Adı",
        dataIndex: "vehicleName",
        key: "vehicleName",
        render: (text) => <a href="#">{text}</a>,
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: '',
        options: [
            { key: 1, label: 'TIR', value: 'truck' },
            { key: 2, label: 'Minibüs', value: 'minivan' }
        ],
    },
    {
        title: "Sefer Tarihi",
        dataIndex: "transportDate",
        key: "transportDate",
        componentType: inputTypes.DATETIME,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ""
    },
    
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return transportFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

export default transportFields