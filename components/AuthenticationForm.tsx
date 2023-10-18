"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { AuthFlow } from "@/lib/types";
import { useSearchParams } from "next/navigation";

function AuthenticationForm() {
  const [authenticationFlow, setAuthenticationFlow] =
    useState<AuthFlow>("signin");

  function onAuthFlowChange(flow: AuthFlow) {
    setAuthenticationFlow(flow);
  }

  return (
    <div>
      <Tabs className="w-[400px]" value={authenticationFlow}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="signin"
            onClick={() => onAuthFlowChange("signin")}
          >
            Signin
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            onClick={() => onAuthFlowChange("signup")}
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SigninForm toggleAuthenticationFlow={onAuthFlowChange} />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm toggleAuthenticationFlow={onAuthFlowChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthenticationForm;
