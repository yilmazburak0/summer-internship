import React, { useState, useEffect } from "react";

import { Table, Tag, Space, Row, Col, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouses, setModalType, setSelectedWarehouse, toggleCreateEditModal } from "redux/warehouse/warehouseActions";
import vehicleFields, { getColumns } from "./warehouseFields";
import WarehouseCreateEdit from "./modals/warehouseCreateEdit";
import modalTypes from "enums/modal";
import Search from "view/components/search/search";

export default function Warehouse() {
    const [filter, setFilter] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const { warehouses, loading, totalWarehouseCount } = useSelector(s => s.warehouse)
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
        dispatch(fetchWarehouses({ filter }))
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

    useEffect(() => {
        console.log(warehouses);
     }, [warehouses]); //eslint-disable-line
 


    return (
        <Card className="hp-border-color-black-40">
            <WarehouseCreateEdit />
            <Row>
                <Col className="hp-mb-16" lg={12} md={12}>
                    <h4>Depolar</h4>
                </Col>

                <Col style={{ flexDirection: 'column', alignItems: 'flex-end', display: 'flex' }} lg={12} md={12}>
                    <Button type="primary" onClick={() => {
                        openCreateModal()
                    }}  >
                        Depo Ekle
                    </Button>

                </Col>
                <Col span={24}>
                    <Search
                        onChange={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        onRow={(record) => {
                            return {
                                onDoubleClick: async () => {
                                    await dispatch(setSelectedWarehouse(record))
                                    await dispatch(setModalType(modalTypes.EDIT))
                                    dispatch(toggleCreateEditModal(true))
                                },
                            };
                        }}
                        loading={loading}
                        pagination={{ onChange: onPageChange, current: pageIndex, pageSize, total: totalWarehouseCount, showSizeChanger: true }}
                        columns={getColumns(user.role)}
                        dataSource={warehouses}
                    />
                </Col>
            </Row>


        </Card>
    );
}
