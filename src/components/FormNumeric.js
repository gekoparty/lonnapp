import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";

const FormNumeric = ({ id, errors, suffix, value, handleValidation }) => (
  <>
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
  </>
);

export default FormNumeric;
