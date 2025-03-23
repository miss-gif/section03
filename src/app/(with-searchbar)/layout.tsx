import Searchbar from "@/app/(with-searchbar)/searchbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
