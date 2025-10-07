import { useEffect, useState } from "react";
import { getTimeZones } from "@vvo/tzdb";
import { formatTimeZoneLabel } from "@/utils/formatTimeZoneLabel";

const Dashboard = () => {
  useEffect(() => {
    const zones = getTimeZones();

    // zones.map((zone) => console.log(formatTimeZoneLabel(zone)));
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
