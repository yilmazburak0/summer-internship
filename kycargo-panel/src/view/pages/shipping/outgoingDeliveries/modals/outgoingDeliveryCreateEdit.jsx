import React, { useState, useEffect, useRef } from "react";
// import 'antd/dist/antd.css';
import { Row, Col, Form, Input, Checkbox, Button, Modal,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createDelivery, updateDelivery, deleteDelivery } from "redux/delivery/deliveryActions";
import deliveryFields from "../outgoingDeliveryFields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function outgoingDeliveryCreateEdit() {

    const { createEditModalOpen, selectedDelivery, createEditModalType,deliveries } = useSelector(s => s.delivery)
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedDelivery)
    }, [selectedDelivery])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {
        if (createEditModalType === modalTypes.CREATE) {
            dispatch(createDelivery(values))
        }
        else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedDelivery?._id, ...values }
            dispatch(updateDelivery(updatedValues))
            closeModal()
        }
    }
    


    return (

        <Modal
            title={selectedDelivery?.name || "Durum Değiştir"}
            width={1000}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deleteDelivery(selectedDelivery?._id))}
                        >
                            Sil
                        </Button>
                    </Col>
                    }


                    <Col>
                        <Button type="primary" className="hp-btn-outline hp-hover-bg-primary-1" onClick={() => form.submit()}>
                            Kaydet
                        </Button>

                    </Col>
                </Row>
            }

        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={[16, 2]} >
                    {deliveryFields.map(inputField => (inputRenderer(inputField)))}
                </Row>

            </Form>


        </Modal>
    );
}

