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

  const enableEdit = (customer_id, customer_name, customer_email) => {
    setNewData({customer_id, customer_name, customer_email});
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
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(({ customer_id, customer_name, customer_email, isEditing }) => {
          return isEditing === true ? (
            <tr key={customer_id}>
              <td>
                <input
                  type="text"
                  defaultValue={customer_name}
                  onChange={(e) => updateNewData(e, "customer_name")}
                />
              </td>

              <td>
                <input
                  type="email"
                  defaultValue={customer_email}
                  onChange={(e) => updateNewData(e, "customer_email")}
                />
              </td>
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
              <td>{customer_name}</td>
              <td>{customer_email}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(customer_id, customer_name, customer_email)}
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