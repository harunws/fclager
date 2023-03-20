import { useState, useContext } from "react";
import { AppContext } from "./CustomerContext";

const CustomerForm = () => {
  const { insertCustomer } = useContext(AppContext);
  const [newCustomer, setNewCustomer] = useState({});

  // Storing the Insert User Form Data.
  const addNewCustomer = (e, field) => {
    setNewCustomer({
      ...newCustomer,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitCustomer = (e) => {
    e.preventDefault();
    insertCustomer(newCustomer);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitCustomer}>
      <h2>Insert Customer V02</h2>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        onChange={(e) => addNewCustomer(e, "customer_first_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />

      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        id="last_name"
        onChange={(e) => addNewCustomer(e, "customer_last_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />

      <label htmlFor="_email">Email</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewCustomer(e, "customer_email")}
        placeholder="Enter email"
        autoComplete="off"
        required
      />

<label htmlFor="_created">Date</label>
      <input
        type="text"
        id="_created"
        onChange={(e) => addNewCustomer(e, "customer_created")}
        placeholder="Enter date"
        autoComplete="off"
        required
      />

      <input type="submit" value="Insert" />
    </form>
  );
};

export default CustomerForm;