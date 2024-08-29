import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "~/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import logo from "../../../public/logo.jpg";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <div className="flex h-full items-center justify-center">
          <Image src={logo.src} alt="logo" width={350} height={220} />
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full md:w-[600px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
