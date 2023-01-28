import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function FormInput({ label, id, value =0 }) {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={id}>
        <Form.Label column>{label}</Form.Label>
        <Col>
          <Form.Control 
            className="bg-light text-end"
            type="text"
            value={value}
            disabled
          ></Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}
