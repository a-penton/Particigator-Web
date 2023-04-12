import { useState, useEffect } from 'react';
import { API } from "../API";
import "./UsersList.css"

const fetchAdmin = async () => {
  return await API.getAllAdmin();
}

const AdminList = () => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdmin();
        setAdmin(data);
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
            <th>Email</th>
            {/* <th>Students</th> */}
          </tr>
      {admin !== null ? 
        admin.map((adminer) => {
          return (
            <tr>
              <td>{adminer.name}</td>
              <td>{adminer.email}</td>
              {/* <td>{adminer.students.map((student) => {
                return (
                    <div>
                        <p>{student}</p>
                    </div>
                )
              })}</td> */}
            </tr>
          )
        }) : null}
      </table>
    </div>
    </div>
  );
  }
    
    export default AdminList;