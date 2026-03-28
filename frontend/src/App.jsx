import AppRoute from "./routes/appRoute";
import { AuthProvider } from "./features/auth/context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
};

export default App;
