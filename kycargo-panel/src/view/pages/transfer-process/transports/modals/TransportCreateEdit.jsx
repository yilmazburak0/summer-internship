import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Form, Input, Checkbox, Button, Modal,Select,DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createTransport, updateTransport, deleteTransport } from "redux/transport/transportActions";
import { getVehicles } from "redux/vehicle/vehicleActions";
import transportfields from "../transportfields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function TransportCreateEdit() {

    
    const [vehicleName, setvehicleName] = useState("");
    const [transportDate, setTransportDate] = useState("");
    const { createEditModalOpen, selectedTransport, createEditModalType } = useSelector(s => s.transport)
    const { vehicles } = useSelector(s => s.vehicle)
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const vehicleOptions = vehicles?.map((vehicle) => ({
        label: `Araç ismi: ${vehicle.name} / Araç türü: ${vehicle.type}`,
        value: vehicle.name,
        key: vehicle._id,
      }));

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedTransport)
    }, [selectedTransport])

    useEffect(() => {
        dispatch(getVehicles())
    }, [])

    useEffect(() => {
        console.log(vehicles);
    }, [vehicles])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {


        if (createEditModalType === modalTypes.CREATE) {
            //dispatch(createTransport(values))
            console.log(values);
        }
        else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedTransport?._id, ...values }
            dispatch(updateTransport(updatedValues))
        }

    }
    let values={};
    function onOk() {
        console.log("ok");
        values["vehicleName"] = vehicleName
        values["transportDate"] = transportDate
        if (createEditModalType === modalTypes.CREATE) {
            // values["transportNo"] = transportNo
            console.log(values);
            dispatch(createTransport(values))
            values={}
        }
        else if (createEditModalType === modalTypes.EDIT) {
            console.log(selectedTransport);
            const updatedValues = {
                _id: selectedTransport?._id, 
                vehicleName: values["vehicleName"] ? vehicleName: selectedTransport.vehicleName , 
                transportDate: values["transportDate"] ? transportDate: selectedTransport.transportDate
            }
            console.log(updatedValues);
            dispatch(updateTransport(updatedValues))
            values={}
        }
        
      }
    
    function vehicleTypeOnChange(values,options) {
        setvehicleName(values)
    }
    function transportDateOnChange({_d}) {
        setTransportDate(_d.toLocaleDateString())
    }

    useEffect(() => {
        form.setFieldsValue(selectedTransport)
    }, [selectedTransport])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {
            console.log("edit");
        }

    }, [createEditModalType])

    return (

        <Modal
            title={selectedTransport?.name || "Yeni Sefer Ekle"}
            width={1000}
            onOk={onOk}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deleteTransport(selectedTransport?._id))}
                        >
                            Sil
                        </Button>
                    </Col>
                    }


                    <Col>
                        <Button type="primary" className="hp-btn-outline hp-hover-bg-primary-1" onClick={() =>onOk()}>
                            Kaydet
                        </Button>

                    </Col>
                </Row>
            }

        >
            <Form
                form={form}
                layout="vertical"
                //initialValues={fields}
                onFinish={onFinish}
            >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label={"Araç Tipi"}
              name="vehicleName"
              rules={[
                {
                  required: true,
                  message: `Araç Tipi alanı boş bırakılamaz!`,
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder={`*Araç Tipi`}
                options={vehicleOptions}
                onChange={vehicleTypeOnChange}
              />
            </Form.Item>
            <Col span={12} >
                        <Form.Item
                            valuePropName={'date'}
                            label={"Sefer Tarihi"}
                            name="transportDate"
                            rules={[{ required: true, message: `Sefer Tarihi alanı boş bırakılamaz!` }]}
                            
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD.MM.YYYY'}
                                allowClear
                                placeholder={"Sefer Tarihi"}
                                onChange={transportDateOnChange}
                            />
                        </Form.Item>

                    </Col>
          </Col>
          </Row>
            </Form>


        </Modal>
    );
}

