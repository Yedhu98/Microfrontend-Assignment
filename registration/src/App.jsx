import React from "react";
import ReactDOM from "react-dom";

import employeeService from "../../common/services";
import "./index.css";

/**
 *
 * @param {{name; label; type: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['type']}} param0
 * @returns
 */
const FieldSet = ({ name, type, label, value, ...rest }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type={type} name={name} id={name} value={value} {...rest} />
  </div>
);

const RegistrationPage = () => {
  const initialData = {
    dob: "",
    email: "",
    username: "",
    password: "",
  };
  const [data, setData] = React.useState(initialData);
  const [status, setStatus] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    employeeService
      .addEmployee(data)
      .then(() => {
        setData(initialData);
        alert('Employee Added Successfully!');
      })
      .catch(e => {
        alert(e.message);
      })
      .finally(() => {
        setStatus("");
      });
  }

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <FieldSet name="dob" type="date" label="Birthday" value={data.dob} /> <br></br>
      <FieldSet name="email" type="email" label="Email" value={data.email} /> <br></br>
      <FieldSet name="username" label="Username" value={data.username} /> <br></br>
      <FieldSet
        name="password"
        type="password"
        label="Password"
        value={data.password}
        autoComplete="new-password"
      />
<br></br>
      <div>
        <button class ="style-1" type="submit" disabled={status.status === "loading"}>
          Register
        </button>
      </div>
    </form>
  );
};

export { RegistrationPage };

export default () => {
  ReactDOM.render(<RegistrationPage />, document.getElementById("app"));
};
