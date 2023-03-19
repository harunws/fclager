import { useEffect, useState } from "react";

export const CustomerAction = () => {
  let [customers, setCustomers] = useState([]);

    //userLength is for showing the Data Loading message.
  let [customerLength, setCustomerLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/fclager/v_02/customers_api/customer_all.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setCustomers(data.customers.reverse());
          setCustomerLength(true);
        } else {
          setCustomerLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertCustomer = (newCustomer) => {
    fetch("http://localhost/fclager/v_02/customers_api/customer_create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.customer_id) {
          setCustomers([
            {
              customer_id: data.customer_id,
              ...newCustomer,
            },
            ...customers,
          ]);
          setCustomerLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (customer_id) => {
   customers =customers.map((customer) => {
      if (customer.customer_id === customer_id) {
        customer.isEditing = true;
        return customer;
      }
      customer.isEditing = false;
      return customer;
    });
    setCustomers(customers);
  };

  // Cance the edit mode.
  const cancelEdit = (customer_id) => {
    customers = customers.map((customer) => {
      if (customer.customer_id === customer_id) {
        customer.isEditing = false;
        return customer;
      }
      return customer;
    });
    setCustomers(customers);
  };

  // Updating a user.
  const updateCustomer = (customerData) => {
    fetch("http://localhost/fclager/v_02/customers_api/customer_update.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          customers = customers.map((customer) => {
            if (customer.customer_id === customerData.customer_id) {
              customer.isEditing = false;
              customer.customer_name = customerData.customer_name;
              customer.customer_email = customerData.customer_email;
              return customer;
            }
            return customer;
          });
          setCustomers(customers);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteCustomer = (theID) => {
      // filter outing the user.
    let customerDeleted = customers.filter((customer) => {
      return customer.customer_id !== theID;
    });
    fetch("http://localhost/fclager/v_02/customers_api/customer_delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer_id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setCustomers(customerDeleted);
          if (customers.length === 1) {
            setCustomerLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    customers,
    editMode,
    cancelEdit,
    updateCustomer,
    insertCustomer,
    deleteCustomer,
    customerLength,
  };
};