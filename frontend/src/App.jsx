import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./features/auth/context/authContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoute />
    </AuthProvider>
  );
};

export default App;
