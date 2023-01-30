import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function FormResult({ label, id, type = "text", value = "", readOnly = false }) {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={id}>
        <Form.Label column>{label}</Form.Label>
        <Col>
          <Form.Control
            className="bg-light text-end"
            type={type}
            value={value}
            disabled={type === "text"}
            readOnly={readOnly}
          ></Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}
