import React from 'react'

import { Col, Row } from 'antd'

export default function Footer() {
    return (
        <Col className="hp-my-48 hp-px-24">
            <p className="hp-p1-body hp-text-center hp-text-color-black-60 hp-mb-8">COPYRIGHT ©{new Date().getFullYear()} KYCARGO, All rights Reserved</p>

            <Row align="middle" justify="center" gutter={[16]}>
                <Col>
                    <a href="#" className="hp-text-color-black-80 hp-text-color-dark-40">
                        Privacy Policy
                    </a>
                </Col>

                <Col>
                    <a href="#" className="hp-text-color-black-80 hp-text-color-dark-40">
                        Term of use
                    </a>
                </Col>
            </Row>
        </Col>
    )
}
