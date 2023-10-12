import React, { useState, useEffect } from "react";

import { Table, Tag, Space, Row, Col, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles, setModalType, setSelectedVehicle, toggleCreateEditModal } from "redux/vehicle/vehicleActions";
import vehicleFields, { getColumns } from "./vehicleFields";
import VehicleCreateEdit from "./modals/VehicleCreateEdit";
import modalTypes from "enums/modal";
import Search from "view/components/search/search";
const data = [
    {
        key: "1",
        name: "İstanbul 1. Tır",
        type: 'truck',
        plate: "52 ABS 786",
        volume: 524,
        weightCapacity: 4000,
        status: "active",
        createdAt: Date.now()
    },
    {
        key: "2",
        name: "İstanbul 2. Tır",
        type: 'truck',
        plate: "52 ABS 786",
        volume: 680,
        weightCapacity: 2000,
        status: "passive"
    },
    {
        key: "3",
        name: "İstanbul 3. Tır",
        type: 'minivan',
        plate: "52 AJK 786",
        volume: 420,
        weightCapacity: 3000,
        status: "active"
    }
];

export default function Vehicles() {
    const [filter, setFilter] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const { vehicles, loading, totalVehicleCount } = useSelector(s => s.vehicle)
    const { user } = useSelector(s => s.auth)

    const dispatch = useDispatch()

    const onPageChange = (newPageIndex, newPageSize) => {
        setPageIndex(newPageIndex);
        setPageSize(newPageSize);
    };

    const getFilteredProducts = (pageIndex) => {
        //    { condition: '=', value: "new", dataField: 'status' },    
        filter.page = { number: parseInt(pageIndex), size: parseInt(pageSize) };
        //filter.searchText = "test 21"
        //filter.fields = [{ condition: '=', value: "passive", dataField: 'status' }]
        filter.sort = '-createdAt';
        dispatch(fetchVehicles({ filter }))
    };

    useEffect(() => {
       // onPageChange(1, pageSize);
        getFilteredProducts(1);
    }, [filter]); //eslint-disable-line

    useEffect(() => {
        getFilteredProducts(pageIndex);
    }, [pageIndex, pageSize]); //eslint-disable-line


    async function openCreateModal() {
        await dispatch(setModalType(modalTypes.CREATE))
        dispatch(toggleCreateEditModal(true))
    }


    return (
        <Card className="hp-border-color-black-40">
            <VehicleCreateEdit />
            <Row>
                <Col className="hp-mb-16" lg={12} md={12}>
                    <h4>Araçlar</h4>
                </Col>

                <Col style={{ flexDirection: 'column', alignItems: 'flex-end', display: 'flex' }} lg={12} md={12}>
                    <Button type="primary" onClick={() => {
                        openCreateModal()
                    }}  >
                        Araç Ekle
                    </Button>

                </Col>
                <Col span={24}>
                    <Search
                        onChange={setFilter}
                        statusOptions={[
                            { value: 'passive', text: 'Pasif' },
                            { value: 'active', text: 'Aktif' },
                            { value: 'repair', text: 'Bakımda' }
                        ]}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        onRow={(record) => {
                            return {
                                onDoubleClick: async () => {
                                    await dispatch(setSelectedVehicle(record))
                                    await dispatch(setModalType(modalTypes.EDIT))
                                    dispatch(toggleCreateEditModal(true))
                                },
                            };
                        }}
                        loading={loading}
                        pagination={{ onChange: onPageChange, current: pageIndex, pageSize, total: totalVehicleCount, showSizeChanger: true }}
                        columns={getColumns(user.role)}
                        dataSource={vehicles}
                    />
                </Col>
            </Row>


        </Card>
    );
}
