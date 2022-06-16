import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function FormInput(props) {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={props.id}>
        <Form.Label column>{props.label}</Form.Label>
        <Col>
          <Form.Control 
          
            className="bg-light text-end"
            type={props.type}
            value={props.number}
            disabled
          ></Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}
