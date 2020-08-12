import React from 'react';
 import ReactDOM from 'react-dom';
 import { Formik, Form, useField } from 'formik';
 import styled from '@emotion/styled';
 import * as Yup from 'yup';

 const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input> and also replace ErrorMessage entirely.
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };

 const MyCheckbox = ({ children, ...props }) => {
   // We need to tell useField what type of input this is
   // since React treats radios and checkboxes differently
   // than inputs/select/textarea.
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <>
       <label className="checkbox">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };

 // Styled components ....
 const StyledSelect = styled.select`
   border: blue solid 5px;
 `;

 const StyledErrorMessage = styled.div`
   background-color: red;
 `;

 const StyledLabel = styled.label`
  font-weight: bold;
 `;

 const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <>
       <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
       <StyledSelect {...field} {...props} />
       {meta.touched && meta.error ? (
         <StyledErrorMessage>{meta.error}</StyledErrorMessage>
       ) : null}
     </>
   );
 };

 // And now we can use these
 const SignupForm = (props) => {
  const urlParams = new URLSearchParams(window.location.search)
   return (
     <>
       <h1>Subscribe!</h1>
       <Formik
         initialValues={{
           firstName: urlParams.get('firstName')|| props.firstName || "",
           lastName: urlParams.get('lastName') || props.lastName|| "",
           email: urlParams.get('email') || props.email || "",
           acceptedTerms: urlParams.get('acceptedTerms') || props.acceptedTerms || "", // added for our checkbox
           jobType: urlParams.get('jobType') || props.jobType || "", // added for our select
         }}
         validationSchema={Yup.object({
           firstName: Yup.string()
             .max(15, 'Must be 15 characters or less')
             .required('Required'),
           lastName: Yup.string()
             .max(20, 'Must be 20 characters or less')
             .required('Required'),
           email: Yup.string()
             .email('Invalid email address')
             .required('Required'),
           acceptedTerms: Yup.boolean()
             .required('Required')
             .oneOf([true], 'You must accept the terms and conditions.'),
           jobType: Yup.string()
             .oneOf(
               ['designer', 'development', 'product', 'other'],
               'Invalid Job Type'
             )
             .required('Required'),
         })}
         onSubmit={(values, { setSubmitting }) => {
           setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
             setSubmitting(false);
           }, 400);
         }}
       >
         {({isSubmitting, handleReset}) => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />
            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect>
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
            <button type="reset">Reset</button>
            <button type="button" onClick={handleReset}>Also Reset</button>
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
          )}
       </Formik>
     </>
   );
 };
function App() {
  return <SignupForm firstName="Patrick"/>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
