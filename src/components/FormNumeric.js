import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NumericFormat } from "react-number-format";

const FormNumeric = ({
  label,
  controlId,
  id,
  errors,
  suffix,
  value,
  handleValidation,
}) => (
  <Form.Group as={Row} className="mb-3" controlId={controlId}>
    <Form.Label column>{label}</Form.Label>
    <Col>
      <NumericFormat
        customInput={Form.Control}
        min={0}
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
);

export default FormNumeric;
