import React from "react";
import ReactDOM from "react-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./styles.css";

const init = {email: '', password: '', passwordConf: '',  firstName: '', lastName: ''};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
}

const validations = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConf: Yup.string()
    .required("Please confirm your password")
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
    })
});

const FieldFragment = (type, labelName, name='') => {
  name = name === '' ? type : name;
  return(
    <React.Fragment>
      <label name={name}>{labelName}:</label>
      <Field type={type} name={name} />
      <ErrorMessage name={name} component="div" />
    </React.Fragment>
  )
}

const SignupForm = () => <div>
  <h1>Formik example</h1>
  <Formik
    initialValues={init}
    onBlur={Formik.handleBlur}
    onChange={Formik.handleChange}
    validationSchema={validations}
    onSubmit={handleSubmit}>
    <Form>
      {FieldFragment('firstName', 'First Name')}
      {FieldFragment('lastName', 'Last Name')}
      {FieldFragment('email', 'Email')}
      {FieldFragment('password', 'Password')}
      {FieldFragment('password', 'Confirm Password', 'passwordConf')}
      <button type="submit">Submit</button>
    </Form>
  </Formik>

</div>

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
