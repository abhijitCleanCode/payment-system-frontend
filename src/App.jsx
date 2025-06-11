import { Outlet, Route, Routes } from "react-router-dom";

// pages
import { AdminRegistration, Home, Login } from "./pages";
import { AuthLayout } from "./components";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/sidebar/AppSidebar";
// import { Sidebar } from "lucide-react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />

        {/* AuthLayout wraps the page where authentication is required */}
        <Route
          path="/"
          element={
            <AuthLayout authentication>
              {/* a flexible layout for sidebar and main content */}
              <div className="flex min-h-screen">
                <SidebarProvider>
                  <AppSidebar />
                  <main className="flex-1 overflow-auto">
                    <SidebarTrigger className="" />
                    <Outlet />
                  </main>
                </SidebarProvider>
              </div>
            </AuthLayout>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
