import { FlickeringGrid } from "@/components/global/flickering";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <FlickeringGrid
        className="relative inset-0 z-0 size-full "
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.05}
        height={1800}
        width={2400}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background z-10 from-50%"></div>
    </div>
  );
};

export default Dashboard;
