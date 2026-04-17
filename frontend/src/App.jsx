import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./features/auth/context/authContext";
import { Toaster } from "react-hot-toast";
import { InterviewProvider } from "./features/interview/context/interview.context";
const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoute />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
