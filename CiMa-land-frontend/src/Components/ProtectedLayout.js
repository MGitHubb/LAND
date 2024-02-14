import { Navigate, useOutlet } from "react-router-dom";

export default function ProtectedLayout() {
    const outlet = useOutlet();
    
    const token = localStorage.getItem('token');
      if (!token) {
        return <Navigate to="/" />;
      }
    
      return (
        <div>
          {outlet}
        </div>
      );
    };