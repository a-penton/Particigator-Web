import { useState, useEffect } from 'react';
import { API } from "../API";
import "./GradeBook.css"

const fetchAdmin = async () => {
  return await API.getAllAdmin();
}

// Shows list of instructors (not currently shown on web, since you login with specific instructor account)
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
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {admin !== null ? 
            admin.map((adminer) => {
              return (
                <tr key={adminer.email}>
                  <td>{adminer.name}</td>
                  <td>{adminer.email}</td>
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
    
    export default AdminList;