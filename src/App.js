import { useContext, useEffect } from "react";
import { userContext } from "./contexts/userContext";
import MyRoutes from "./Routes";

function App() {
  const { checkAuth } = useContext(userContext)
  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <div>
      <MyRoutes />
    </div>
  );
}

export default App;
