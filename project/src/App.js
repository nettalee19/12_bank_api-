
import react from 'react';
import axios from "axios";

function App() {
  const [users, setUsers] = react.useState('');
  

    react.useEffect(() => {
      axios.get('http://localhost:5000').then((req) =>{
        console.log(req)
        setUsers(req.data.success.dbb.users)

      })
 
    }, [])

  return (
    <div className="App">
      <h1>Bank Accounts:</h1>
      {users.map(user =>{
        return <>
          <p>ID: {user.id}</p>
          <p>Cash:{user.cash}</p>
          <p>Credit:{user.credit}</p>
        <hr></hr>
        </>
      })}
      {/* <p>ID: {users.id}</p>
      <p>Cash:{users.cash}</p>
      <p>Credit:{users.credit}</p> */}
      
      {/* {users.map(user =>{
        return <> 
        <p>User Id : {user.id}</p>
        <p>User cash : {user.cash}</p>
        <p>User credit : {user.credit}</p>
      
        
       </>
      })} */}
      
    </div>
  );
}

export default App;
