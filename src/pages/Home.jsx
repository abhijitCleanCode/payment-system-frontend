// import { Outlet } from "react-router-dom";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AppSidebar from "@/components/sidebar/AppSidebar";

const Home = () => {
  return (
    <div className="p-4">
      {/* <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider> */}

      <h1 className="text-2xl">Welcome home!</h1>
      <p className="mt-4">Main content of home page goes here</p>
    </div>
  );
};

export default Home;
