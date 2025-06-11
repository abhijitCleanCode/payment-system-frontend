import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// form imports
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Key, Mail } from "lucide-react";
// custom form components
import {
  CustomFormField,
  LoaderButtonAction,
  SubmitButton,
} from "@/components";
// api
import { useLoginMutation } from "@/services/api/authApiSlice";
import { setCredentials } from "@/services/state/authSlice";

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

const FormSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoginPage = location.pathname === "/login";

  // define form
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const handleLogin = async function (data) {
    try {
      const response = await login(data).unwrap();

      console.log(
        "src :: components :: login :: FormSignIn :: handleLogin :: response: ",
        response
      );

      if (response.success || response.statusCode === 200) {
        dispatch(setCredentials({ ...response }));

        form.reset();

        // redirect
        navigate("/");
      }
    } catch (error) {
      console.log(
        "src :: components :: login :: FormSignIn :: handleLogin :: error: ",
        error
      );
    }
  };

  // verify on initial load

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleLogin(data))}
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
          IconComponent={Mail}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          IconComponent={Key}
        />

        {/* <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="forgotPassword?"
          label="Forgot Password?"
        /> */}

        <SubmitButton>
          {isLoading ? (
            <LoaderButtonAction className="opacity-100" />
          ) : (
            "Get Started"
          )}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default FormSignIn;
