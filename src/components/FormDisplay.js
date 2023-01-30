import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NumericFormat } from "react-number-format";

const FormDisplay = ({ label, id, type = "text", value = "", readOnly = false, errors, handleValidation, suffix }) => {
  if (type === "numeric") {
    return (
      <>
        <Form.Group as={Row} className="mb-3" controlId={id}>
          <Form.Label column>{label}</Form.Label>
          <Col>
            <NumericFormat
              customInput={Form.Control}
              min={0}
              className="text-end"
              allowNegative={false}
              allowLeadingZeros={false}
              isInvalid={!!errors[id]}
              defaultValue={value}
              suffix={suffix}
              onValueChange={(values) => {
                const { floatValue } = values;
                handleValidation(id, floatValue);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">{errors[id]}</Form.Control.Feedback>
          </Col>
        </Form.Group>
      </>
    );
  } else {
    return (
      <Form.Group as={Row} className="mb-3" controlId={id}>
        <Form.Label column>{label}</Form.Label>
        <Col>
        <NumericFormat
                  customInput={Form.Control}
                  type={"text"}
                  readOnly
                  decimalScale={2}
                  thousandSeparator={true}
                  className="text-end"
                  value={value}
                  suffix={suffix}
                ></NumericFormat>
        </Col>
      </Form.Group>
    );
  }
};

export default FormDisplay;