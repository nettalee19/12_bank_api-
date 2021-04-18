
import react from 'react';
import axios from "axios";

function App() {
  const [email, setEmail] = react.useState('');
  const [id, setId] = react.useState('');

    react.useEffect(() => {
        axios.get('http://localhost:8000/').then((req) => {
            console.log(req);
            setEmail(req.data.success)
            // setEmail(req.data.success.email)
            // setId(req.data.success.id)
            
        })
    }, [])

    // const [users, setUsers] = react.useState([]);

    // const getUser = async() =>{
    //   const request = await axios.get('http://localhost:8001/')

    //   setUsers(request.data)
    // }

  return (
    <div className="App">
      
      <h1>{email}</h1>
      <h1>{id}</h1>
    {/* <button onClick={getUser}>users</button>
      {
        users.map( p =>{
          return <h1>id: {p.id} name: {p.name} cash: {p.cash} credit: {p.credit}</h1>
        })
      } */}
    </div>
  );
}

export default App;
