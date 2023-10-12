import React, { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { textButton } from "./code.js";

import { Card, Row, Col, Button } from "antd";
import { RiCodeSSlashLine } from "react-icons/ri";

export default function TextButtons() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);

  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }

  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col className="hp-mb-16" lg={12} span={20}>
          <h4>Text Buttons</h4>
          <p className="hp-p1-body">
            There are text button in Yoda.
          </p>
        </Col>

        <Col lg={12} span={4} className="hp-text-right">
          <Button
            onClick={toggleChecked}
            type="text"
            icon={<RiCodeSSlashLine className="hp-text-color-black-80" />}
          />
        </Col>

        <Col span={24}>
          <Button type="text" className="hp-text-color-primary-1 hp-hover-bg-primary-4 hp-mr-16 hp-mb-16">
            Primary Button
          </Button>

          <Button type="text" className="hp-text-color-secondary-1 hp-hover-bg-secondary-4 hp-mr-16 hp-mb-16">
            Secondary Button
          </Button>

          <Button type="text" className="hp-text-color-danger-1 hp-hover-bg-danger-4 hp-mr-16 hp-mb-16">
            Danger Button
          </Button>

          <Button type="text" className="hp-text-color-info-1 hp-hover-bg-info-4 hp-mr-16 hp-mb-16">
            Info Button
          </Button>

          <Button type="text" className="hp-text-color-success-1 hp-hover-bg-success-4 hp-mr-16 hp-mb-16">
            Success Button
          </Button>

          <Button type="text" className="hp-text-color-warning-1 hp-hover-bg-warning-4 hp-mr-16 hp-mb-16">
            Warning Button
          </Button>

          <Button type="text" className="hp-text-color-black-100 hp-hover-bg-black-10 hp-mr-16 hp-mb-16">
            Dark Button
          </Button>
        </Col>
      </Row>

      {checkedCode && (
        <SyntaxHighlighter
          language="javascript"
          className={`show-code hp-mt-24 ${codeClass && "show-code-active"}`}
          style={monoBlue}
        >
          {textButton}
        </SyntaxHighlighter>
      )}
    </Card>
  );
}
