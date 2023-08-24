
import UserAuthForm from "@/components/ui/UserAuthForm"

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login Your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter Username to login.
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}
