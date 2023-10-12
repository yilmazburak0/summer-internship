import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";


const productFields = [
    {
        title: "Ürün Adı",
        dataIndex: "name",
        key: "name",
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.FULL_WIDTH,
        editable: true,
        required: true,
        value: ''
    }
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return productFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

export default productFields