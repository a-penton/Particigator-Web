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
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
      {users !== null ? 
        users.map((user) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.id}</td>
            </tr>
          )
        }) : null}
      </table>
    </div>
    </div>
  );
  }
    
    export default UsersList;