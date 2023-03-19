import 'bootstrap/dist/css/bootstrap.css';


import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerLists';
import { Provider } from './components/customers/CustomerContext';
import { CustomerAction } from './components/customers/CustomerAction';

function App() {
  const data = CustomerAction();
  return (
    <Provider value={data}>
      <div className="">
        <h1 className='bg-warning'>HS REACT MAIN </h1>
        <div className="wrapper">
          <section className="left-side">
            {/* <Form /> */}
            <CustomerForm />

          </section>
          <section className="right-side">
            {/* <UserList /> */}
            <CustomerList />
            
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;