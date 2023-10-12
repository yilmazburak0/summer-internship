import React, { useState, useEffect, useRef } from "react";
// import 'antd/dist/antd.css';
import { Row, Col, Form, Input, Checkbox, Button, Modal,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateEditModal, createPackage, updatePackage, deletePackage } from "redux/package/packageActions";
import packageFields from "../packageFields";
import inputRenderer from "helpers/inputRenderer";
import modalTypes from "enums/modal";


export default function PackageCreateEdit() {

    const { createEditModalOpen, selectedPackage, createEditModalType,packages } = useSelector(s => s.package)
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    function closeModal() {
        form.resetFields()
        dispatch(toggleCreateEditModal(false))
    }


    useEffect(() => {
        form.setFieldsValue(selectedPackage)
    }, [selectedPackage])

    useEffect(() => {
        if (createEditModalType === modalTypes.CREATE) {
            form.resetFields()
        }
        else if (createEditModalType === modalTypes.EDIT) {

        }

    }, [createEditModalType])

    function onFinish(values) {
        if (createEditModalType === modalTypes.CREATE) {
            console.log(values);
            let duplicateFound = false; // Bir yinelemeli döngüde zaten varlık bulunduğunu takip eden bir değişken oluşturun
    
            packages.forEach(pac => {
                if (pac.height === values.height && pac.length === values.length && pac.width === values.width) {
                    duplicateFound = true; // Varlık bulunduğunda, duplicateFound değerini true yapın.
                }
            });
    
            if (duplicateFound) {
                // Eğer bir varlık bulunduysa fonksiyondan çıkın.
                message.warning({
                    content: 'Girilen en boy yüksekliğe sahip paket zaten mevcut',
                    className: 'custom-class',
                    style: {
                      fontSize: "20px"
                    },
                  });
                return;
            }
            // Eğer varlık bulunmadıysa, yeni paketi oluşturun.
            dispatch(createPackage(values));
        } else if (createEditModalType === modalTypes.EDIT) {
            const updatedValues = { _id: selectedPackage?._id, ...values };
            dispatch(updatePackage(updatedValues));
        }
    }
    


    return (

        <Modal
            title={selectedPackage?.name || "Yeni Paket Ekle"}
            width={1000}
            open={createEditModalOpen}
            onCancel={closeModal}
            footer={
                <Row gutter={[8, 8]} justify="end">
                    {createEditModalType === modalTypes.EDIT && <Col>
                        <Button
                            type="primary"
                            className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"
                            onClick={() => dispatch(deletePackage(selectedPackage?._id))}
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
                    {packageFields.map(inputField => (inputRenderer(inputField)))}
                </Row>

            </Form>


        </Modal>
    );
}

