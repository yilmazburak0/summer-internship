import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Form, Input, Checkbox, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createProduct, updateProduct, deleteProduct } from "redux/products/productsActions";
import productFields from "../productFields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function ProductCreateEdit() {

    const { createEditModalOpen, selectedProduct, createEditModalType } = useSelector(s => s.products)
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedProduct)
    }, [selectedProduct])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {


        if (createEditModalType === modalTypes.CREATE) {
            dispatch(createProduct(values))
        }
        else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedProduct?._id, ...values }
            dispatch(updateProduct(updatedValues))
        }

    }


    return (

        <Modal
            title={selectedProduct?.name || "Yeni Ürün Ekle"}
            width={1000}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deleteProduct(selectedProduct?._id))}
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
                    {productFields.map(inputField => (inputRenderer(inputField)))}
                </Row>

            </Form>


        </Modal>
    );
}

