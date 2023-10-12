import React, { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Table, Tag, Space, Row, Col, Card, Button } from "antd";
import { RiCodeSSlashLine } from "react-icons/ri";

export default function All() {
    const [checkedCode, setCheckedCode] = useState(false);
    const [codeClass, setCodeClass] = useState(false);

    function toggleChecked() {
        setTimeout(() => setCodeClass(!codeClass), 100);
        setCheckedCode(!checkedCode);
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a href="#">{text}</a>,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        return (
                            <Tag className="hp-mb-md-8" color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a href="#">Invite {record.name}</a>
                    <a href="#">Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["designer"],
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
    ];

    return (
        <Card className="hp-border-color-black-40">
            <Row>
                <Col className="hp-mb-16" lg={12} span={20}>
                    <h4>Tüm Gönderiler</h4>
                </Col>


                <Col span={24}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />
                </Col>
            </Row>

        
        </Card>
    );
}
