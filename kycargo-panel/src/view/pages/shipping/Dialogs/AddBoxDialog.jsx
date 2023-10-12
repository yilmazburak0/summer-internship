import { useState, useEffect, useRef } from "react";
import { Button, Col, Select, Modal, Form, Row, InputNumber,Input } from "antd";
import userRole from "enums/user";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "redux/package/packageActions";
import { getProducts } from "redux/products/productsActions";

import { setNewDelivery } from "redux/delivery/deliveryActions";
import { findAndUpdate } from "helpers/array";

function MultipleInputs({ title, onChange }) {
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    onChange({ name: title, weight, quantity });
  }, [weight, quantity]);

  return (
    <Col span={24}>
      <Row gutter={[24, 16]}>
        <Col span={4} style={{ alignItems: "center", display: "flex" }}>
          {title}
        </Col>
        <Col span={10}>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Adet"
            onChange={(val) => setQuantity(val)}
          />
        </Col>
        <Col span={10}>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Ağırlık"
            onChange={(val) => setWeight(val)}
          />
        </Col>
      </Row>
    </Col>
  );
}
let packageInfo = {};
let productTypes = [];
function AddBoxDialog(props) {
  const [form] = Form.useForm();
  const [productTypesInputList, setProductTypesInputList] = useState([]);
  const [reference, setReference] = useState("");
  const dispatch = useDispatch();

  const { packages } = useSelector((s) => s.package); //paket tipleri
  const { products } = useSelector((s) => s.products); //ürün tipleri
  const { newDelivery } = useSelector((s) => s.delivery);

  const { user } = useSelector((s) => s.auth);

  const packageOptions = packages?.map((pac) => ({
    label: pac.name + " = " + ` ${pac.height} x ${pac.width} x ${pac.length}`,
    value: JSON.stringify(pac),
    key: pac._id,
  }));
  const productTypesOptions = products?.map((product) => ({
    label: product.name,
    value: product.name,
    key: product._id,
  }));

  function onFinish(values) {
    //form databaseye kaydedilcek
  }

  useEffect(() => {
    dispatch(getPackages());
    dispatch(getProducts());
  }, []);

  function productTypesOnChange(values, options) {
    setProductTypesInputList(options);
    //console.log("productTypes", productTypes, options);
    productTypes = productTypes.filter((x) =>
      options.find((o) => o.label == x.name)
    );
    //console.log("filtered", productTypes);
  }
  function packageTypeOnChange(values, options) {
    const { height, length, width, volume,name } = JSON.parse(values);
    Object.assign(packageInfo, { height, length, width, volume, name });
    //console.log(packageInfo);
  }

  function MultipleInputsOnchange(data) {
    findAndUpdate(productTypes, data, "name", true);
    // console.log(productTypes);
  }

  function onOk() {
    let newPackage = { ...packageInfo, productTypes,reference };
    form.resetFields();
    setProductTypesInputList([]);
    packageInfo = {};
    productTypes = [];
    //console.log(newPackage);
    props.onChange?.(newPackage.productTypes.length > 0 ? newPackage : false);
  }
  function referenceHandler({target}) {
    setReference(target.value)
  }  
  return (
    <Modal
      title="Paket Bilgileri"
      open={props?.open}
      onOk={onOk}
      onCancel={props?.onClose}
      width={980}
    >
      <Form
        form={form}
        layout="vertical"
        //initialValues={fields}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
        <Col span={12} style={{ marginBottom: 15 }}>
          <h5>Referans Kodu</h5>
          <Input placeholder="Referans Kodu" onChange={referenceHandler} allowClear />
        </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label={"Paket Tipi"}
              name="packageType"
              rules={[
                {
                  required: true,
                  message: `Paket Tipi alanı boş bırakılamaz!`,
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder={`*Paket Tipi`}
                options={packageOptions}
                onChange={packageTypeOnChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={"Ürün Tipi"}
              name="productType"
              rules={[
                { required: true, message: `Ürün Tipi alanı boş bırakılamaz!` },
              ]}
            >
              <Select
                showSearch
                allowClear
                mode="multiple"
                onChange={productTypesOnChange}
                placeholder={`*Ürün Tipi`}
                options={productTypesOptions}
              />
            </Form.Item>
          </Col>
          {productTypesInputList.map((v, i) => {
            return (
              <MultipleInputs
                key={`mp-${i}`}
                onChange={MultipleInputsOnchange}
                title={v.label}
              />
            );
          })}
        </Row>
      </Form>
    </Modal>
  );
}
export default AddBoxDialog;
