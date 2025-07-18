import React, { useState, useEffect } from "react";
const Report = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [labName, setLabName] = useState("");
  const [date, setDate] = useState("");
  const [reportFile, setReportFile] = useState(null);
  // Mock JSON data
  const mockReports = [
    {
      date: "2025-04-10",
      testName: "Complete Blood Count",
      labName: "MedLife Diagnostics",
      status: "Completed",
      file: "path_to_report_file_1.pdf", // Added mock file path
    },
    {
      date: "2025-04-12",
      testName: "Urine Test",
      labName: "PathCare Labs",
      status: "Pending",
      file: null, // No file for mock data
    },
    {
      date: "2025-04-15",
      testName: "Chest X-Ray",
      labName: "Apollo Labs",
      status: "In Review",
      file: "path_to_report_file_2.pdf", // Added mock file path
    },
  ];
  useEffect(() => {
    setReports(mockReports);
  }, []);
  const handleAddReport = () => {
    if (reportFile) {
      const newReport = { date, testName, labName, status: "Completed", file: reportFile };
      setReports([...reports, newReport]);
      setIsModalOpen(false);
    } else {
      alert("Please upload a report file.");
    }
  };
  const handleSendToDoctor = (report) => {
    alert(`Report for "${report.testName}" sent to doctor!`);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setReportFile(file);
    }
  };
  const handleDownload = (file) => {
    if (file) {
      const link = document.createElement("a");
      link.href = file; // URL of the file
      link.download = file.split("/").pop(); // Extract file name from URL
      link.click();
    } else {
      alert("No report file available for download.");
    }
  };
  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      {/* Shift Add Report button to the right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200"
        >
          Add Report
        </button>
      </div>
      {/* Report Table */}
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Test Name</th>
            <th className="px-6 py-3 text-left">Lab Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {reports.map((report, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-slate-50 transition duration-200">
              <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.testName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.labName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.status}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => handleDownload(report.file)}
                  className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 transition duration-150"
                >
                  Download
                </button>
                <button
                  onClick={() => handleSendToDoctor(report)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-150"
                >
                  Send to Doctor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for Adding Report */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] animate-fadeIn space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
              Add Report
            </h2>
            <div className="space-y-6">
              {/* Test Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                <input
                  type="text"
                  placeholder="Enter Test Name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* Lab Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Name</label>
                <input
                  type="text"
                  placeholder="Enter Lab Name"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Report</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {reportFile && (
                  <p className="text-sm text-gray-500 mt-2">File selected: {reportFile.name}</p>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReport}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
              >
                Add Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Report;
