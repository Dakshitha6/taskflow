import LoginComponent from "@/components/LoginForm";
import withAuth from "@/hoc/withAuth";

 function LoginPage() {


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200 px-[16px]">
      <LoginComponent/>
    </div>
  );
}

export default withAuth(LoginPage);
