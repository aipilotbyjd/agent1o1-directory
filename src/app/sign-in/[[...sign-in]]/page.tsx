import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
