import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components";
import { SubmitButton } from "@/components";

const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [yup.ref("oldPassword")],
      "New password must be different from current password"
    ),
});

const ChangePassword = () => {
  // Initialize form
  const form = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Change Password</h1>
          <p className="text-dark-200">Enter your current and new password</p>
        </section>

        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="oldPassword"
          label="Current Password"
          placeholder="Enter current password"
          type="password"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="newPassword"
          label="New Password"
          placeholder="Enter new password"
          type="password"
        />

        <SubmitButton loading={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default ChangePassword;
