import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function FormInput({ label, id, type = "text", value = "", onChange, isInvalid, error, readOnly = false }) {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={id}>
        <Form.Label column>{label}</Form.Label>
        <Col>
          <Form.Control
            className="bg-light text-end"
            type={type}
            value={value}
            onChange={onChange}
            isInvalid={isInvalid}
            disabled={type === "text"}
            readOnly={readOnly}
          ></Form.Control>
          {isInvalid && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Col>
      </Form.Group>
    </>
  );
}
