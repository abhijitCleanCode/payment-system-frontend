import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// form imports
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// custom form components
import { CustomFormField, SubmitButton } from "@/components";

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormFieldType = {
  INPUT: "input",
  TEXTAREA: "textarea",
  PHONE_INPUT: "phoneInput",
  CHECKBOX: "checkbox",
  DATE_PICKER: "datePicker",
  SELECT: "select",
  SKELETON: "skeleton",
};

const Login = () => {
  //! potential improvement, make it global
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  // define form
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // vrify on initial load
  // useEffect(() => {
  //   if (isLoginPage) {
  //     navigate("/");
  //   }
  // }, [isLoginPage]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-200">Please sign in to continue</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="jhonndoe@email.com"
          // iconSrc={}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Password"
          // iconSrc={}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="forgotPassword?"
          label="Forgot Password?"
        />

        <SubmitButton>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default Login;
