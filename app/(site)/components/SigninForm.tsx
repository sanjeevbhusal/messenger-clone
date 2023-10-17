import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
} from "react-icons/ai";
import { RiGoogleLine } from "react-icons/ri";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AuthFlow } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

type formSchemaType = z.infer<typeof formSchema>;

interface SigninFormProps {
  toggleAuthenticationFlow: (flow: AuthFlow) => void;
}

function SigninForm({ toggleAuthenticationFlow }: SigninFormProps) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
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
      { type: "signin" }
    );

    if (response?.ok) {
      toast({
        title: "User login successful",
        description: "You are being redirected...",
      });
      setIsLoading(false);
      router.push("/dashboard");
      return;
    }

    switch (response?.error) {
      case "User Notfound Error": {
        form.setError("email", {
          message: "Email doesnot exist",
        });
        break;
      }
      case "Password Invalid Error": {
        form.setError("password", {
          message: "Password is invalid",
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
            <CardTitle>Signin</CardTitle>
            <CardDescription>
              Login to your account to start using messenger.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
                        className="p-2 cursor-pointer bg-gray-100 right-0 absolute top-0 bottom-0"
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
              {isLoading ? <Loader2 className="animate-spin" /> : "Signin"}
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
              <Button variant={"outline"} className="px-10">
                <span>
                  <RiGoogleLine size={20} />
                </span>
                <span className="inline-block ml-1">Google</span>
              </Button>
              <Button variant={"outline"} className="px-10">
                <span>
                  <AiOutlineGithub size={20} />
                </span>
                <span className="inline-block ml-1">Github</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Do not have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => toggleAuthenticationFlow("signup")}
              >
                Signup
              </span>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default SigninForm;
