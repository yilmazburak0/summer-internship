import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";


const vehicleFields = [
    {
        title: "Araç Adı",
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
        title: "Araç Tipi",
        dataIndex: "type",
        key: "type",
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        options: [
            { key: 1, label: 'TIR', value: 'truck' },
            { key: 2, label: 'Minibüs', value: 'minivan' }
        ],
        value: ""
    },
    {
        title: "Plaka",
        dataIndex: "plate",
        key: "plate",
        componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        role: [userRole.ADMIN, userRole.DEVELOPER],
        value: ""
    },
    {
        title: "Araç hacmi (m3)",
        dataIndex: "volume",
        key: "volume",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },
    {
        title: "Taşıma Kapasitesi (kg)",
        dataIndex: "weightCapacity",
        key: "volume",
        keyboardType: "numeric",
        componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        value: ""
    },
    {
        title: "Araç Durumu",
        dataIndex: "status",
        key: "status",
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        options: [
            { key: 1, label: 'Aktif', value: 'active' },
            { key: 2, label: 'Pasif', value: 'passive' },
            { key: 3, label: 'Tamirde', value: 'repair' }
        ],
        value: ""
    }
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return vehicleFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

export default vehicleFields