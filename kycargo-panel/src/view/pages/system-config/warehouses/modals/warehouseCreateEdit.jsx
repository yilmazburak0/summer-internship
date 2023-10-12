import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Form, Input, Checkbox, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createWarehouse, updateWarehouse, deleteWarehouse } from "redux/warehouse/warehouseActions";
import warehouseFields from "../warehouseFields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function VehicleCreateEdit() {

    const { createEditModalOpen, selectedWarehouse, createEditModalType } = useSelector(s => s.warehouse)
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedWarehouse)
    }, [selectedWarehouse])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {


        if (createEditModalType === modalTypes.CREATE) {
            dispatch(createWarehouse(values))
        }
        else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedWarehouse?._id, ...values }
            dispatch(updateWarehouse(updatedValues))
        }

    }


    return (

        <Modal
            title={selectedWarehouse?.name || "Yeni Depo Ekle"}
            width={1000}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deleteWarehouse(selectedWarehouse?._id))}
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
                //initialValues={fields}
                onFinish={onFinish}
            >
                <Row gutter={[16, 2]} >
                    {warehouseFields.map(inputField => (inputRenderer(inputField)))}
                </Row>

            </Form>
        </Modal>
    );
}

