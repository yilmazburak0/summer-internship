import { Space, Tag } from "antd";
import userRole from "enums/user";
import { inputTypes, gridTypes } from "helpers/inputRenderer";
import deliveryDetails from "./deliveryDetails"; 
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryId } from "redux/delivery/deliveryActions";

const deliveredDeliveryFields = [
    {
        title: "Alıcı",
        dataIndex: "receiver",
        key: "receiver",
        render: (receiver) => <p>{receiver[0]}</p>,
        //componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Gönderici",
        dataIndex: "sender",
        key: "sender",
        render: (sender) => <p>{sender[0]}</p>,
        //componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Varış Yeri",
        dataIndex: "receiver",
        key: "receiver",
        render: (receiver) => <p>{receiver[2]+"/"+receiver[1]}</p>,
        //componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: ''
    },
    {
        title: "Durum",
        dataIndex: "status",
        key: "status",
        componentType: inputTypes.DROPDOWN,
        gridType: gridTypes.FULL_WIDTH,
        options: [
            { key: 1, label: 'Depoda', value: 'Depoda' },
            { key: 2, label: 'new', value: 'new' },
            { key: 3, label: 'Yolda', value: 'Yolda' },
            { key: 4, label: 'Araca Yüklü', value: 'Araca Yüklü' },
            { key: 5, label: 'Teslim Edildi', value: 'Teslim Edildi' },
            { key: 6, label: 'Araca Yüklü', value: 'Araca' },
        ],
        editable: true,
        required: true,
        value: "",
        colVisible:true
    },
    {
        title: "Paket Sayısı",
        dataIndex: "packages",
        key: "packages",
        render: (packages) => <p>{packages.length}</p>,
        //componentType: inputTypes.NUMERIC_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        required: true,
        editable: true,
        value: "",
        colVisible:true
    },
    {
        title: "id",
        dataIndex: "_id",
        key: "_id",
        //componentType: inputTypes.TEXT_INPUT,
        gridType: gridTypes.HALF_WIDTH,
        editable: true,
        required: true,
        value: "",
        colVisible:false
    },
    // {
    //     title: 'Detay',
    //     key: 'action',
    //     render: (_,record) => (
    //       <Space size="middle">
    //         <button onClick={() => deliveryDetailsHandler(record._id)}>Gönderi Detayı</button>
    //       </Space>
    //     ),
    //   },
];

function renderOrNot(role, userRole) {
    return role ? role.includes(userRole) : true
}
export function getColumns(userRole) {
    return deliveredDeliveryFields.filter(c => c.colVisible !== false && renderOrNot(c?.role, userRole))
}

function deliveryDetailsHandler(id) {
    console.log("here");
    
}

export default deliveredDeliveryFields