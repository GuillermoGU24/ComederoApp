// AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";


import { useCheckAuth } from "../Firebase/auth/store/useCheckAuth";
import { CheckingAuth } from "../main/components/CheckingAuth";
import { LoginPage } from "../Firebase/auth/pages/LoginPage";
import RegisterForm from "../Firebase/auth/pages/RegisterForm";
import ComederoPage from "../main/page/ComederoPage";


export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/comedero" element={<ComederoPage />} />
      ) : (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/registro" element={<RegisterForm />} />
        </>
      )}
    </Routes>
  );
};
