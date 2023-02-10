import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/signup';
import SetPassword from './pages/signup/SubPages/SetPassword';
import SignWithEmail from './pages/signup/SubPages/SignWithEmail';
import VerifyOtp from './pages/signup/SubPages/VerifyOtp';
import Homepage from './pages/Homepage';
import SignUpLoading from './pages/signup/SubPages/Loading';
import ForgotPassword from './pages/ForgotPassword';
import PasswordMail from './pages/ForgotPassword/SubPages/CheckMail';
import ResetPassword from './pages/ForgotPassword/SubPages/ResetPassword';
import SignInWithEmail from './pages/SignIn/SubPages/SignWithEmail';
import Dashboard from './user/pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<AuthLayout />} path="/">
          <Route path="signin" element={<SignIn />} />
          <Route path="signin_with_email" element={<SignInWithEmail />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signup_with_email" element={<SignWithEmail />} />
          <Route path="signup_verify_otp" element={<VerifyOtp />} />
          <Route path="signup_set_password" element={<SetPassword />} />
          <Route path="signup_loading" element={<SignUpLoading />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="forgot_password_mail" element={<PasswordMail />} />
          <Route path="change_password" element={<ResetPassword />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );//856e64a6-d84a-4956-ace2-10c3adc167dc 793227a4-2a5d-40b2-80dd-1eb2c3521c0e 67b0472f-9c8a-43df-a211-374ec1dc5ed1
}

export default App;
