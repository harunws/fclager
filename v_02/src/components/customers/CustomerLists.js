import {useContext, useState} from 'react'
import {AppContext} from './CustomerContext'

const CustomerList = () => {
  const {
    customers,
    customerLength,
    editMode,
    cancelEdit,
    updateCustomer,
    deleteCustomer
  } = useContext(AppContext);

   // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateCustomer(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value
    });
  };

  const enableEdit = (customer_id, customer_first_name, customer_last_name, customer_email) => {
    setNewData({customer_id, customer_first_name, customer_last_name, customer_email});
    editMode(customer_id);
  };

  const deleteConfirm = (customer_id) => {
    if (window.confirm("Are you sure?")){
      deleteCustomer(customer_id);
    }
  };

  return !customerLength ? (
    <p>{customerLength === null ? "Loading..." : "Please insert new customer"} </p>
  ) : (

    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Create Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(({ customer_id, customer_first_name, customer_last_name, customer_email, customer_created, isEditing }) => {
          return isEditing === true ? (
            <tr key={customer_id}>
              <td>
                <input
                  type="text"
                  defaultValue={customer_first_name}
                  onChange={(e) => updateNewData(e, "customer_first_name")}
                />
              </td>

              <td>
                <input
                  type="text"
                  defaultValue={customer_last_name}
                  onChange={(e) => updateNewData(e, "customer_last_name")}
                />
              </td>

              <td>
                <input
                  type="email"
                  defaultValue={customer_email}
                  onChange={(e) => updateNewData(e, "customer_email")}
                />
              </td>

              {/* <td>
                <input
                  type="text"
                  defaultValue={customer_created}
                  onChange={(e) => updateNewData(e, "customer_created")}
                />
              </td> */}

              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn btn-sm"
                  onClick={() => cancelEdit(customer_id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={customer_id}>
              <td>{customer_first_name}</td>
              <td>{customer_last_name}</td>
              <td>{customer_email}</td>
              <td>{customer_created}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(customer_id, customer_first_name, customer_last_name, customer_email)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(customer_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
};

export default CustomerList;