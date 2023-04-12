import { useState, useEffect } from 'react';
import { API } from "../API";
import "./UsersList.css"

const fetchUsers = async () => {
  return await API.getAllUsers();
}

const UsersList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
    {isLoading ? <p>Loading...</p> : null}
    {error ? <p>Error: {error.message}</p> : null}
    <div className="Tabling">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users !== null ? 
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                </tr>
              )
            }) : null
          }
        </tbody>
      </table>
    </div>
    </div>
  );
  }
    
    export default UsersList;