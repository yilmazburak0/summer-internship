import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Form, Button, Modal,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createUser, updateUser, deleteUser } from "redux/user/userActions";
import useGetInputFields from "../userFields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function UserCreateEdit() {

    const { createEditModalOpen, selectedUser, createEditModalType } = useSelector(s => s.user)
    const [form] = Form.useForm();
    const { inputFields } = useGetInputFields();

    const dispatch = useDispatch()

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedUser)
    }, [selectedUser])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {


        if (createEditModalType === modalTypes.CREATE) {
            dispatch(createUser(values))
            message.success({
                content: 'Kullanıcı Başarıyla Oluşturuldu',
                className: 'custom-class',
                style: {
                  fontSize: "20px"
                },
              });
        }
        else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedUser?._id, ...values }
            dispatch(updateUser(updatedValues))
        }

    }


    return (

        <Modal
            title={selectedUser?.name || "Yeni Kullanıcı Ekle"}
            width={800}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deleteUser(selectedUser?._id))}
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
                    {inputFields.map(inputField => (inputRenderer(inputField)))}
                </Row>

            </Form>


        </Modal>
    );
}

