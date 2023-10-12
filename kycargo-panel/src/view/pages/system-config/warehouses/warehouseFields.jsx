import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";


const warehouseFields = [
    {
        title: "Depo Adı",
        dataIndex: "name",
        key: "name",
        render: (text) => <a href="#">{text}</a>,
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Adres",
        dataIndex: "address",
        key: "address",
        render: (address) => <a href="#">{address.city}/{address.country}</a>,
        //componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },
    {
        title: "Depo hacmi (m3)",
        dataIndex: "maxVolume",
        key: "maxVolume",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },
    {
        title: "doluluk yüzdesi (%)",
        dataIndex: "occupancyPercentage",
        key: "occupancyPercentage",
        keyboardType: "numeric",
        //componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    }
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return warehouseFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

export default warehouseFields