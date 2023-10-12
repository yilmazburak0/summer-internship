import React from "react";

import { Row, Col } from "antd";

import PageContent from "../../../../layout/components/content/page-content";

export default function Import(props) {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <PageContent
          title="Araç Yükleme"
          breadcrumb={[
            {
              title: "Pages",
            },
            {
              title: "Blank Page",
            }
          ]}
        />
      </Col>
    </Row>
  );
}
