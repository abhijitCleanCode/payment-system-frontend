import React from "react";
import { FormAdminRegistration } from "@/components/adminRegistration";

const AdminRegistration = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <FormAdminRegistration />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-200 xl:text-left"></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminRegistration;
