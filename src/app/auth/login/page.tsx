import dynamic from "next/dynamic";

const Login = dynamic(() => import("./_components"));

const LoginPage = async () => {
  return <Login />;
};

export default LoginPage;
