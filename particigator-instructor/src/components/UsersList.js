import { useState, useEffect } from 'react';
import { API } from "../API";

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
    <p>User List:</p>
    {isLoading ? <p>Loading...</p> : null}
    {error ? <p>Error: {error.message}</p> : null}
    {users !== null ? 
      users.map((user) => {
        return (
          <div key={user.id}>
          {/* <p>{user.id}</p> */}
          <p>{user.name}</p>
          </div>
          )
        }) : null
      }
      
      </div>
      );
    }
    
    export default UsersList;