import { useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";

// form imports
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// custom form components
import { CustomFormField, SubmitButton } from "@/components";
import { Key, Mail, UserRound } from "lucide-react";
import { SelectItem } from "../ui/select";

const adminRegistrationSchema = yup.object({
  name: yup.string().required("Name is required"),
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

const FormAdminRegistration = () => {
  //! potential improvement, make it global
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // define form
  const form = useForm({
    resolver: yupResolver(adminRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit(data))}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Admin account set up</h1>
          <p className="text-dark-200">
            Ready to take control? Add admin details below
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Name"
          placeholder="Jhon Doe"
          IconComponent={UserRound}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="jhondoe@email.com"
          IconComponent={Mail}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Password"
          placeholder="**********"
          type="password"
          IconComponent={Key}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="role"
          label="Role"
          placeholder="Assign role"
        >
          {["Admin"].map((role, index) => (
            <SelectItem key={index} value={role}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{role}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="isActive"
          label="Active"
        /> */}

        <SubmitButton>Save</SubmitButton>
      </form>
    </Form>
  );
};

export default FormAdminRegistration;
