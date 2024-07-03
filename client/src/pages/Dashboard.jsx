import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();

  // This hook returns the location object, which contains information about the current URL. location.search gives the query string part of the URL (e.g., ?tab=home).

  const [tab, setTab] = useState("");

  // parses the query string from the URL using the URLSearchParams constructor.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // creates a new URLSearchParams object that allows to work with the query string of the URL.
    const tabFromUrl = urlParams.get("tab");
    // extracts the value of the tab query parameter from the URL.
    console.log(tabFromUrl);

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar: Porfile + Sign Out */}
        <DashSidebar />
      </div>

      {/* profile */}

      {tab === "profile" && <DashProfile />}
    </div>
  );
}
