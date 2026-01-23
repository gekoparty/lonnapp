import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

const FormDisplay = ({
  value,
  label,
  id,
  type = "text",
  name,
  onChange,
  defaultChecked = false,
  readOnly = false,
  errors = {},
  handleValidation,
  suffix,
  compact = false,
}) => {
  // Compact mode: used for “hero” values (no label / spacing)
  const Wrapper = compact ? React.Fragment : ({ children }) => children;

  const control = (() => {
    if (type === "numeric") {
      return (
        <InputGroup>
          <NumericFormat
            customInput={Form.Control}
            min={0}
            className="text-end"
            allowNegative={false}
            allowLeadingZeros={false}
            isInvalid={!!errors[id]}
            value={value}
            onValueChange={(values) => {
              const { floatValue } = values;
              handleValidation?.(id, floatValue);
            }}
            required
          />
          {suffix ? <InputGroup.Text className="text-muted">{suffix.trim()}</InputGroup.Text> : null}
          <Form.Control.Feedback type="invalid">{errors[id]}</Form.Control.Feedback>
        </InputGroup>
      );
    }

    if (type === "text") {
      return (
        <InputGroup>
          <NumericFormat
            customInput={Form.Control}
            type="text"
            readOnly
            decimalScale={2}
            thousandSeparator
            className="text-end"
            value={value}
          />
          {suffix ? <InputGroup.Text className="text-muted">{suffix.trim()}</InputGroup.Text> : null}
        </InputGroup>
      );
    }

    return (
      <Form.Check
        inline
        defaultChecked={defaultChecked}
        onChange={onChange}
        label={label}
        name={name}
        type={type}
        id={id}
      />
    );
  })();

  if (compact) return <Wrapper>{control}</Wrapper>;

  return (
    <Form.Group as={Row} className="mb-3 align-items-center" controlId={id}>
      {label ? (
        <Form.Label column sm={6} className="text-muted">
          {label}
        </Form.Label>
      ) : null}
      <Col sm={label ? 6 : 12}>{control}</Col>
    </Form.Group>
  );
};

export default FormDisplay;

FormDisplay.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  readOnly: PropTypes.bool,
  errors: PropTypes.object,
  handleValidation: PropTypes.func,
  suffix: PropTypes.string,
  compact: PropTypes.bool,
};
