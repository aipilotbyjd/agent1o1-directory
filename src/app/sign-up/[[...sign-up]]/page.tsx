import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
