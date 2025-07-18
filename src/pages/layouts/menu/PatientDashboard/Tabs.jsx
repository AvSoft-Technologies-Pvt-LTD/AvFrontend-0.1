import React, { useState } from "react";
import MedicalRecords from "./MedicalRecord";
import Prescriptions from "./Prescriptions";
import Reports from "./Reports";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("medical");

  const renderContent = () => {
    switch (activeTab) {
      case "medical": return <MedicalRecords />;
      case "prescription": return <Prescriptions />;
      case "report": return <Reports />;
      default: return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "medical"
              ? "bg-slate-800 text-white"
              : "bg-slate-200 text-slate-800"
          }`}
          onClick={() => setActiveTab("medical")}
        >
          Medical History
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "prescription"
              ? "bg-slate-800 text-white"
              : "bg-slate-200 text-slate-800"
          }`}
          onClick={() => setActiveTab("prescription")}
        >
          Prescriptions
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "report"
              ? "bg-slate-800 text-white"
              : "bg-slate-200 text-slate-800"
          }`}
          onClick={() => setActiveTab("report")}
        >
          Labs/Scans Reports
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Tabs;
