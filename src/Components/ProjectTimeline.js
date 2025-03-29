import React from "react";

const timelineData = [
    { date: "Jun 2024", status: "Launch", completed: true },
    { date: "Aug 2024", status: "Excavation", completed: true },
    { date: "Jun 2026", status: "Slabs", completed: true },
    { date: "Dec 2026", status: "Other tasks", completed: false },
    { date: "Mar 2027", status: "Handover", completed: false },
];

const ProjectTimeline = () => {
  return (
    <div className="text-white p-6 rounded-lg">
      <h2 className="text-white font-bold text-lg mb-4">Project Timeline</h2>

      {/* Desktop View - Horizontal Timeline */}
      <div className="hidden md:flex relative items-center justify-between w-full max-w-4xl mx-auto">
        <div className="absolute top-[20%] left-4 right-0 h-1 bg-yellow-400"></div>
        {timelineData.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center relative">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className={`w-4 h-4 rounded-full border-2 absolute
                ${item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"}`}>
              </div>
            </div>
            <div className="mt-2 text-white text-sm">{item.status}</div>
            <div className="mt-1 text-gray-400 text-xs">{item.date}</div>
          </div>
        ))}
      </div>

      {/* Mobile View - Vertical Timeline */}
      <div className="md:hidden flex flex-col relative w-full max-w-xs mx-auto">
        {/* Vertical Line - Now Properly Centered Behind Dots */}
        <div className="absolute left-[115px] transform -translate-x-1/2 top-4 bottom-0 w-1 bg-yellow-400"></div>

        {timelineData.map((item, index) => (
          <div key={index} className="flex items-center relative mb-4">
            {/* Date on the Left */}
            <div className="w-24 text-right pr-4 text-white">{item.date}</div>

            {/* Dot Positioned Exactly Over the Line */}
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className={`w-4 h-4 rounded-full border-2 absolute left-1/2 transform -translate-x-1/2
                ${item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"}`}>
              </div>
            </div>

            {/* Status on the Right */}
            <div className="ml-4 text-white">{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
