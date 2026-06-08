import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NumericFormat } from "react-number-format";
import PropTypes  from "prop-types";

const FormDisplay = ({
  value,
  label,
  id,
  type = "text",
  name,
  onChange,
  defaultChecked = false,
  checked,
  errors = {},
  handleValidation,
  suffix,
  highlight = false,
}) => {

  if (type === "numeric") {
    return (
        <Form.Group as={Row} className="form-row" controlId={id}>
          <Form.Label column sm={6}>{label}</Form.Label>
          <Col sm={6}>
            <NumericFormat
              customInput={Form.Control}
              min={0}
              className="text-end"
              allowNegative={false}
              allowLeadingZeros={false}
              isInvalid={!!errors[id]}
              value={value}
              suffix={suffix}
              onValueChange={(values) => {
                const { floatValue } = values;
                handleValidation(id, floatValue);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors[id]}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
    );
  } else if (type === "text") {
    return (
      <Form.Group
        as={Row}
        className={`form-row result-row${highlight ? " total-row" : ""}`}
        controlId={id}
      >
        <Form.Label column sm={6}>{label}</Form.Label>
        <Col sm={6}>
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
  } else {
    const radioStateProps =
      checked === undefined ? { defaultChecked } : { checked };

    return (
      <Form.Check
        inline
        {...radioStateProps}
        onChange={onChange}
        label={label}
        name={name}
        type={type}
        id={id}
      />
    );
  }
};

export default FormDisplay;

FormDisplay.propTypes = {
    formData: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    errors: PropTypes.object,
    handleValidation: PropTypes.func,
    suffix: PropTypes.string,
    highlight: PropTypes.bool


}
