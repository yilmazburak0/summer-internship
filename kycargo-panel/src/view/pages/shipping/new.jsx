import React, { useState, useEffect } from "react";
import { Row, Col, Card, AutoComplete, Input, Button, List,InputNumber,Select,message,Form } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import AddBoxDialog from "./Dialogs/AddBoxDialog";
import UserCreateEdit from "../system-config/user/modals/userCreateEdit";
import { setModalType, toggleCreateEditModal } from "redux/user/userActions";
import { getWarehouses, setSelectedWarehouse } from "redux/warehouse/warehouseActions";
import modalTypes from "enums/modal";
import { useDispatch, useSelector } from "react-redux";
import { createDelivery } from "redux/delivery/deliveryActions";
import { getUsers } from "redux/user/userActions";

const data = [
];

export default function New() {
  const [options, setOptions] = useState([]);
  const [newDelivery, setnewDelivery] = useState({});
  const [boxList, setPackageList] = useState(data);
  const [addBoxOpen, setAddBoxOpen] = useState(false);
  const [column, setColumn] = useState(2);
  const [price, setPrice] = useState(0);
  const [receiver, setReceiver] = useState({});
  const [sender, setSender] = useState({});
  // const [senderValue, setsenderValue] = useState("");
  const [warehouseId, setwarehouseId] = useState("");
  const dispatch = useDispatch();
  
  const { users } = useSelector((s) => s.user);
  const { warehouses } = useSelector((s) => s.warehouse);

  const UsersOptions = users
  ?.filter((user) => user.role !== 'admin') // Exclude users with role 'admin'
  .map((user) => ({
    label: `${user.profile.firstName} ${user.profile.lastName}(${user.email})`,
    value: JSON.stringify(user),
    key: user._id,
  }));

  const warehousesOptions = warehouses?.map((warehouse) => ({
    label: warehouse.name,
    value: warehouse._id,
    key: warehouse._id,
  }));

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getWarehouses());
  }, []);
  async function openCreateModal() {
    await dispatch(setModalType(modalTypes.CREATE));
    dispatch(toggleCreateEditModal(true));
  }


  function onPackageAdded(newPackage) {
    if (newPackage) setPackageList((prev) => [...prev, newPackage]);
    setAddBoxOpen(false);
  }

  useEffect(() => {
    if (boxList.length > 2) { setColumn(4) }
  }, [boxList])

  function createDeliveryHandle() {
    newDelivery["packages"] = boxList
    newDelivery["totalPrice"] = price
    newDelivery["sender"] = sender
    newDelivery["receiver"] = receiver
    newDelivery["warehouse"] = warehouseId
    dispatch(createDelivery(newDelivery))
    console.log(newDelivery);
    message.success({ content: 'Gönderi Başarıyla Oluşturuldu', className: 'custom-class' ,style: { fontSize: "20px" }, });
    setPackageList([])
    setPrice(0)
    setSender("")
    setReceiver("")
  }

  function onSelectReceiver(values, options) {
    const { profile, email } = JSON.parse(values);
    Object.assign(receiver, { email:email, name:profile.firstName , lastName:profile.lastName });
    };

  function onSelectSender(values, options) {
    const { profile, email } = JSON.parse(values);
    Object.assign(sender, { email:email, name:profile.firstName , lastName:profile.lastName });
    };   

    function warehousesOnChange(values, options) {  
      setwarehouseId(values)
    }  

  return (
    <Card className="hp-border-color-black-40">
      <UserCreateEdit />

      <AddBoxDialog
        open={addBoxOpen}
        onClose={() => setAddBoxOpen(false)}
        onChange={onPackageAdded}
      />
      <Col span={12}  style={{ marginBottom: 16 }}>
      <Select
            showSearch
            placeholder="Depo Seçiniz"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={warehousesOnChange}
            options={warehousesOptions}
         />
          </Col>
      <Col className="hp-mb-16" lg={12} span={20}>
        <h4>Yeni Gönderi Oluştur</h4>
      </Col>
      <Col>
        <Row gutter={[16, 16]}>
          <Col xs={12} className="gutter-row">
            <AutoComplete
              filterOption={true}
              style={{ width: "100%" }}
              options={UsersOptions}
              onSelect={onSelectReceiver}
            >
              <Input
                placeholder="Alıcı"
                suffix={
                  <UserAddOutlined
                    onClick={() => {
                      openCreateModal();
                    }}
                  />
                }
              />
            </AutoComplete>
          </Col>
          <Col xs={12} className="gutter-row">
            <AutoComplete
              filterOption={true}
              style={{ width: "100%" }}
              options={UsersOptions}
              onSelect={onSelectSender}
            >
              <Input
                placeholder="Gönderici"
                suffix={
                  <UserAddOutlined
                    onClick={() => {
                      openCreateModal();
                    }}
                  />
                }
              />
            </AutoComplete>
            <Row justify={"end"} style={{ marginTop: 15 }}>
                <Button type="primary" onClick={() => setAddBoxOpen(true)}>
                  Paket Ekle
                </Button>
              </Row>
          </Col>
          <Row gutter={[16, 16]}>
            <Col>
              <h2>Paketler</h2>
              <List
                grid={{ gutter: 16, column: column }}
                dataSource={boxList}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      title={`${item.name}=${item.height} x ${item.width} x ${item.length}`}
                      size="default"
                      style={{ alignItems:"center" }}
                    >
                      {item.productTypes.map((product, index) => (
                        <Card.Grid style={ {width: '100%',
                        textAlign: 'center'}} hoverable={false} >
                          <p><strong>Ürün Adı:</strong> {product.name}</p>
                          <p><strong>Ağırlık:</strong> {product.weight}</p>
                          <p><strong>Miktar:</strong> {product.quantity}</p>
                        </Card.Grid>
                      ))}
                    </Card>
                  </List.Item>
                )}
              />

            </Col>
          </Row>
        </Row>
      </Col>
      <Col> 
    <Card style={{ marginBottom: 15,marginTop: 15 }}>
      <h2>Genel Özet</h2>  
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div>
            <p><strong>Paketler</strong></p>
            {boxList.map((box, index) => (
              <div key={index}>
                <p><strong>{` ${box.height} x ${box.width} x ${box.length}`}</strong></p>
                {box.productTypes.map((product, productIndex) => (
                  <p key={productIndex}>{product.name}: {product.weight * product.quantity} kg ({product.quantity} adet)</p>
                ))}
              </div>
            ))}
          </div>
        </Col>
        <Col span={8}>
          <div>
            <p><strong>Tüm Ürünlerin Adetleri</strong></p>
            {(() => {
              const productCounts = {};
              boxList.forEach((box) => {
                box.productTypes.forEach((product) => {
                  productCounts[product.name] = (productCounts[product.name] || 0) + product.quantity;
                });
              });
              return Object.entries(productCounts).map(([productName, quantity]) => (
                <p key={productName}>{productName}: {quantity} adet</p>
              ));
            })()}
          </div>
        </Col>
        <Col span={8}>
          <div>
            <p><strong>Tüm Ürünlerin Toplam Ağırlığı</strong></p>
            {boxList.reduce((totalWeight, box) => {
              box.productTypes.forEach((product) => {
                totalWeight += product.weight * product.quantity;
              });
              return totalWeight;
            }, 0)} kg
          </div>
        </Col>
      </Row>
    </Card>
    <h2>Fiyat</h2>
      <Col> 
        <Row gutter={[16, 16]} justify={"start"}>
            <InputNumber addonAfter={"€"} defaultValue={0} onChange={val=>setPrice(val)}/>
        </Row>
      </Col>
</Col>

      <Col>
        <Row gutter={[16, 16]} justify={"end"}>
          <Button type="primary" onClick={createDeliveryHandle}>
            Oluştur
          </Button>
        </Row>
      </Col>
    </Card>
  );
}
