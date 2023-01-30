import Form from 'react-bootstrap/Form';



const FormRadio = ({ onChange, label, name, type, id, defaultChecked }) => (
    <Form.Check
      inline
      defaultChecked={defaultChecked}
      onChange={onChange}
      label={label}
      name={name}
      type={type}
      id={id}
    />
  )

  export default FormRadio;
