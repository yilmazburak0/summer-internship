import React, { useState, useEffect } from "react";
import { Row, Col, Card, AutoComplete, Input, Button, List,InputNumber,Select,message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { setModalType, toggleCreateEditModal } from "redux/user/userActions";
import modalTypes from "enums/modal";
import { useDispatch, useSelector } from "react-redux";
import { createDelivery } from "redux/delivery/deliveryActions";
import { getUsers } from "redux/user/userActions";


export default function deliveryDetails({ id }) {
  const dispatch = useDispatch();
  const { deliveries } = useSelector(s => s.delivery) 
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState({});
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => { setOpen(false) };

  const handleCancel = () => { setOpen(false) };

  useEffect(() => {
    findDeliveryById(id)
  }, [])

  useEffect(() => {
    console.log(delivery);
}, [delivery])
  
  function findDeliveryById(deliveryId) {
    for (const delivery of deliveries) {
        if (delivery._id === deliveryId) {
            setDelivery(delivery)
        }
    }
}

  return (
    <></>
    // <Modal
    //         title={"Gönderi Detayı"}
    //         width={1000}
    //         open={open} onOk={handleOk} onCancel={handleCancel}
    //         footer={
    //         <Card style={{ marginBottom: 15,marginTop: 15 }}>
    //             <h2>Genel Özet</h2>  
    //             <Row gutter={[16, 16]}>
    //                 <Col span={8}>
    //                 <div>
    //                     <p><strong>Paketler</strong></p>
    //                     {boxList.map((box, index) => (
    //                     <div key={index}>
    //                         <p><strong>{` ${box.height} x ${box.width} x ${box.length}`}</strong></p>
    //                         {box.productTypes.map((product, productIndex) => (
    //                         <p key={productIndex}>{product.name}: {product.weight * product.quantity} kg ({product.quantity} adet)</p>
    //                         ))}     
    //                     </div>
    //                     ))}
    //                 </div>
    //                 </Col>
    //                 <Col span={8}>
    //                 <div>
    //                     <p><strong>Tüm Ürünlerin Adetleri</strong></p>
    //                     {(() => {
    //                     const productCounts = {};
    //                     boxList.forEach((box) => {
    //                         box.productTypes.forEach((product) => {
    //                         productCounts[product.name] = (productCounts[product.name] || 0) + product.quantity;
    //                         });
    //                     });
    //                     return Object.entries(productCounts).map(([productName, quantity]) => (
    //                         <p key={productName}>{productName}: {quantity} adet</p>
    //                     ));
    //                     })()}
    //                 </div>
    //                 </Col>
    //                 <Col span={8}>
    //                 <div>
    //                     <p><strong>Tüm Ürünlerin Toplam Ağırlığı</strong></p>
    //                     {boxList.reduce((totalWeight, box) => {
    //                     box.productTypes.forEach((product) => {
    //                         totalWeight += product.weight * product.quantity;
    //                     });
    //                     return totalWeight;
    //                     }, 0)} kg
    //                 </div>
    //                 </Col>
    //             </Row>
    //         </Card>
    // }
    //     >
    //     </Modal>
  );
}
