import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthFlow } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineGithub,
} from "react-icons/ai";
import { RiGoogleLine } from "react-icons/ri";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2, "Name cannot be less than 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password cannot be less than 8 characters"),
});

type formSchemaType = z.infer<typeof formSchema>;

interface SignupFormProps {
  toggleAuthenticationFlow: (flow: AuthFlow) => void;
}

function SignupForm({ toggleAuthenticationFlow }: SignupFormProps) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const [unhandledError, setUnhandledError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: formSchemaType) {
    setIsLoading(true);
    setUnhandledError(false);

    const response = await signIn(
      "credentials",
      {
        redirect: false,
        ...values,
      },
      { type: "signup" }
    );

    if (response?.ok) {
      toggleAuthenticationFlow("signin");
      toast({
        title: "User signup successful",
        description: "Please login to access your account",
      });
      setIsLoading(false);
      return;
    }

    switch (response?.error) {
      case "Conflict Error": {
        form.setError("email", {
          message: "This email is already used",
        });
        break;
      }
      default: {
        setUnhandledError(true);
      }
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Login to your account to start using messenger.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={hidePassword ? "password" : "text"}
                        className="pr-12"
                      />
                      <div
                        className="p-2 cursor-pointer bg-gray-100 right-0 absolute top-0"
                        onClick={() => setHidePassword(!hidePassword)}
                      >
                        {hidePassword ? (
                          <AiOutlineEyeInvisible size={20} className="mt-0.5" />
                        ) : (
                          <AiOutlineEye size={20} className="mt-0.5" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  {/* <FormDescription>
               Password must be at least 8 characters
             </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-8">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Signup"}
            </Button>
            {unhandledError ? (
              <Alert variant={"destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Server Error occurred</AlertTitle>
                <AlertDescription>
                  Something went wrong on our Server. Please try again later.
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="w-full flex gap-4 items-center">
              <Separator className="w-1 grow" />
              <p className="text-gray-500 text-xs">OR CONTINUE WITH</p>
              <Separator className="w-1 grow" />
            </div>
            <div className="flex gap-4 w-full items-center justify-between">
              <Button
                type="button"
                variant={"outline"}
                className="px-10"
                onClick={() => signIn("google")}
              >
                <span>
                  <RiGoogleLine size={20} />
                </span>
                <span className="inline-block ml-1">Google</span>
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="px-10"
                onClick={() => signIn("github")}
              >
                <span>
                  <AiOutlineGithub size={20} />
                </span>
                <span className="inline-block ml-1">Github</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => toggleAuthenticationFlow("signin")}
              >
                Login
              </span>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default SignupForm;
