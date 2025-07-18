// import React, { useState, useEffect, useRef } from "react";
// import { Search, Plus, Loader2, Edit } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const OPT = {
//   OCC: ["Doctor", "Engineer", "Teacher", "Student", "Retired"],
//   DEPT: ["General Medicine", "Surgery", "Cardiology", "Orthopedics", "Pediatrics", "Gynecology"],
//   INS: ["None", "CGHS", "ESIC", "Private Insurance", "Other"],
//   RATE: ["General", "Semi-Private", "Private", "Deluxe", "ICU", "ICCU", "Special Wards"],
//   STATUS: ["Admitted", "Under Treatment", "Discharged"],
//   GENDER: ["Female", "Male", "Other"],
//   BLOOD: ["A+", "B+", "O+", "AB+"],
//   SURGERY: ["No", "Yes"],
// },
// API = {
//   FORM: "https://684be316ed2578be881cdb55.mockapi.io/addpatient",
//   HD: "https://680cc0c92ea307e081d4edda.mockapi.io/personalHealthDetails",
//   FD: "https://6808fb0f942707d722e09f1d.mockapi.io/FamilyData",
//   HS: "https://6808fb0f942707d722e09f1d.mockapi.io/health-summary",
// },
// getDate = () => new Date().toISOString().slice(0, 10),
// getTime = () => new Date().toTimeString().slice(0, 5),
// to24Hour = t => {
//   if (!t.includes("AM") && !t.includes("PM")) return t;
//   let [time, mod] = t.trim().split(" ");
//   let [h, m] = time.split(":").map(Number);
//   if (mod === "PM" && h !== 12) h += 12;
//   if (mod === "AM" && h === 12) h = 0;
//   return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// },
// FIELDS = [
//   ["firstName", "First Name*", "text", 1],
//   ["middleName", "Middle Name", "text"],
//   ["lastName", "Last Name*", "text", 1],
//   ["phone", "Phone Number*", "text", 1],
//   ["email", "Email Address*", "text", 1],
//   ["gender", "Gender*", "select", 1, OPT.GENDER],
//   ["dob", "Date of Birth*", "date", 1],
//   ["bloodGroup", "Blood Group", "select", 0, OPT.BLOOD],
//   ["addressPerm", "Permanent Address*", "textarea", 1],
//   ["addressTemp", "Temporary Address*", "textarea", 1],
//   ["password", "Create Password*", "password", 1],
//   ["confirmPassword", "Confirm Password*", "password", 1],
//   ["occupation", "Occupation*", "suggest", 1, OPT.OCC]
// ],
// IPD = [
//   ["admissionDate", "Admission Date*", "date", 1],
//   ["admissionTime", "Admission Time*", "time", 1],
//   ["status", "Status*", "select", 1, OPT.STATUS],
//   ["wardType", "Ward Type*", "select", 1, OPT.RATE],
//   ["wardNo", "Ward Number", "text"],
//   ["bedNo", "BedNumber", "text"],
//   ["department", "Department*", "select", 1, OPT.DEPT],
//   ["insuranceType", "Insurance Type*", "select", 1, OPT.INS],
//   ["doctorInCharge", "Doctor In Charge", "text"],
//   ["doctorSpecialization", "Doctor Specialization", "text"],
//   ["treatmentPlan", "Treatment Plan", "text"],
//   ["surgeryRequired", "Surgery Required", "select", 0, OPT.SURGERY],
//   ["dischargeDate", "Discharge Date", "date"],
//   ["diagnosis", "Diagnosis", "text"],
//   ["reasonForAdmission", "Reason For Admission", "text"]
// ],
// defaultForm = Object.fromEntries(FIELDS.map(f => [f[0], ""])),
// defaultIPD = Object.fromEntries(IPD.map(f => [f[0], f[0] === "admissionDate" ? getDate() : f[0] === "admissionTime" ? to24Hour(getTime()) : ""]));
// function Field({ f, v, onC, err, occList, setOccList }) {
//   const [k, l, t, , o] = f;
//   if (t === "select")
//     return (
//       <select className={`input-field peer w-full text-xs font-normal ${err ? "border-red-500" : ""}`} value={v ?? ""} onChange={onC}>
//         <option value="" disabled hidden>{l}</option>
//         {o?.map(x => <option key={x}>{x}</option>)}
//       </select>
//     );
//   if (t === "textarea")
//     return <textarea className={`input-field peer w-full text-xs font-normal min-h-[60px] ${err ? "border-red-500" : ""}`} value={v ?? ""} onChange={onC} />;
//   if (t === "time")
//     return <input type="time" className={`input-field peer w-full text-xs font-normal ${err ? "border-red-500" : ""}`} value={v ? to24Hour(v) : ""} onChange={onC} />;
//   if (t === "suggest")
//     return (
//       <div className="floating-input relative" data-placeholder={l}>
//         <input className="input-field peer text-xs px-3 py-2" value={v} placeholder=" " onChange={e => { onC({ target: { value: e.target.value } }); setOccList(o.filter(x => x.toLowerCase().includes(e.target.value.toLowerCase()))); }} autoComplete="off" />
//         {occList.length > 0 && (
//           <ul className="absolute z-10 bg-white border w-full rounded shadow mt-1 max-h-40 overflow-y-auto text-xs">
//             {occList.map((item, i) => (
//               <li key={i} onClick={() => { onC({ target: { value: item } }); setOccList([]); }} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{item}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   return <input type={t} className={`input-field peer w-full text-xs font-normal ${err ? "border-red-500" : ""}`} value={v ?? ""} onChange={onC} />;
// }
// export default function IPDComp() {
//   const [state, set] = useState({
//       ipdPatients: [], filteredIPD: [], loading: true, search: "", searching: false, modalOpen: false, showIpdForm: false, editModalOpen: false,
//       formData: defaultForm, ipdData: defaultIPD, occList: [], aadhaarId: "", readonlyFields: false, selectedPatient: null, personalDetails: null, family: [], vitals: null, saving: false
//     }),
//     [errors, setErrors] = useState({}), [recentPatientId, setRecentPatientId] = useState(null), searchTimeout = useRef();
//   const S = (k, v) => set(s => ({ ...s, [k]: v })), F = (k, v) => set(s => ({ ...s, formData: { ...s.formData, [k]: v } })), I = (k, v) => set(s => ({ ...s, ipdData: { ...s.ipdData, [k]: v } })),
//     validate = (fields, data) => { let errs = {}; fields.forEach(f => { if (f[3] && !data[f[0]]) errs[f[0]] = `${f[1]} is required`; }); setErrors(errs); return Object.keys(errs).length === 0; };
//   useEffect(() => { (async () => { S("loading", true); try { const d = await (await fetch(API.FORM)).json(); S("ipdPatients", d.reverse()); S("filteredIPD", d.reverse()); } catch { toast.error("Failed to fetch patients"); } S("loading", false); })(); }, []);
//   useEffect(() => { S("searching", true); if (searchTimeout.current) clearTimeout(searchTimeout.current); searchTimeout.current = setTimeout(() => { const val = state.search.trim().toLowerCase(); S("filteredIPD", state.ipdPatients.filter(p => (p.id || "").toString().toLowerCase().includes(val) || (p.name || "").toLowerCase().includes(val))); S("searching", false); }, 400); return () => clearTimeout(searchTimeout.current); }, [state.search, state.ipdPatients]);
//   const fetchPatient = async () => { try { const data = await (await fetch(API.FORM)).json(); const found = data.find(p => (p.id || "").toString() === state.aadhaarId.trim()); if (found) { const name = `${found.firstName || ""} ${found.middleName || ""} ${found.lastName || ""}`.replace(/\s+/g, " ").trim(); S("formData", { ...defaultForm, ...found, name, addressPerm: found.permanentAddress || "", addressTemp: found.temporaryAddress || "", email: found.email || "", dob: found.dob || "", occupation: found.occupation || "", bloodGroup: found.bloodGroup || "", password: found.password || "", confirmPassword: found.confirmPassword || "" }); S("readonlyFields", true); S("photoUrl", found.photoUrl || ""); toast.success(`${found.type || "Patient"} details loaded!`); } else toast.info("No patient found with this ID."); } catch { toast.error("Failed to fetch patient"); } };
//   const savePatient = async () => { if (!validate(IPD, state.ipdData)) return; S("saving", true); try { const patientData = { ...state.formData, ...state.ipdData, type: "ipd", name: `${state.formData.firstName} ${state.formData.middleName || ""} ${state.formData.lastName}`.trim(), admissionTime: to24Hour(state.ipdData.admissionTime), admissionDate: state.ipdData.admissionDate, occupation: state.formData.occupation, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), }; const url = state.editModalOpen && state.formData.id ? `${API.FORM}/${state.formData.id}` : API.FORM, method = state.editModalOpen && state.formData.id ? "PUT" : "POST", response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(patientData) }); if (response.ok) { toast.success(state.editModalOpen ? "Patient updated successfully!" : "Patient added successfully!"); resetForm(); handleCloseIpdModal(); const updatedData = await (await fetch(API.FORM)).json(); let newPatient = null; if (!state.editModalOpen) { newPatient = updatedData.find(p => p.createdAt === patientData.createdAt); const newId = newPatient ? newPatient.id : updatedData[updatedData.length - 1]?.id; S("ipdPatients", [newPatient || patientData, ...updatedData.filter(p => (newPatient ? p.id !== newPatient.id : true))]); S("filteredIPD", [newPatient || patientData, ...updatedData.filter(p => (newPatient ? p.id !== newPatient.id : true))]); setRecentPatientId(newId); } else { S("ipdPatients", updatedData.reverse()); S("filteredIPD", updatedData.reverse()); setRecentPatientId(null); } } else throw new Error("Failed to save patient"); } catch { toast.error("Failed to save patient"); } finally { S("saving", false); } };
//   const resetForm = () => { S("formData", defaultForm); S("ipdData", defaultIPD); S("occList", []); S("aadhaarId", ""); S("readonlyFields", false); setErrors({}); };
//   const viewPatientDetails = async a => { S("selectedPatient", a); S("personalDetails", null); S("family", []); S("vitals", null); setRecentPatientId(null); try { const [pd, fd, vs] = await Promise.all([fetch(API.HD).then(r => r.json()), fetch(API.FD).then(r => r.json()), fetch(API.HS).then(r => r.json())]), email = (a.email || "").trim().toLowerCase(); S("personalDetails", pd.find(x => (x.email || "").trim().toLowerCase() === email)); S("family", fd.filter(f => (f.email || "").trim().toLowerCase() === email)); S("vitals", vs.find(x => (x.email || "").trim().toLowerCase() === email) || null); } catch { } };
//   const handleCloseIpdModal = () => { S("modalOpen", false); S("showIpdForm", false); S("editModalOpen", false); S("selectedPatient", null); resetForm(); };
//   const handleEdit = () => {
//     S("editModalOpen", true); S("modalOpen", true); S("showIpdForm", true);
//     S("formData", { ...defaultForm, ...state.selectedPatient, id: state.selectedPatient.id, addressPerm: state.selectedPatient.permanentAddress || "", addressTemp: state.selectedPatient.temporaryAddress || "", email: state.selectedPatient.email || "", dob: state.selectedPatient.dob || "", occupation: state.selectedPatient.occupation || "", bloodGroup: state.selectedPatient.bloodGroup || "", password: state.selectedPatient.password || "", confirmPassword: state.selectedPatient.confirmPassword || "" });
//     S("ipdData", { ...defaultIPD, ...state.selectedPatient });
//     S("photoUrl", state.selectedPatient.photoUrl || ""); S("selectedPatient", null);
//   };
//   const handlePatientFormSubmit = e => { e.preventDefault(); if (validate(FIELDS, state.formData)) S("showIpdForm", true); };
//   const handleIPDFormSubmit = e => { e.preventDefault(); savePatient(); };
//   const renderFields = (fields, values, onChange, errors = {}, occList, setOccList) =>
//     fields.map(f => (
//       <div key={f[0]} className="floating-input relative" data-placeholder={f[1]}>
//         <Field f={f} v={values[f[0]]} onC={e => onChange(f[0], e.target.value)} err={errors[f[0]]} occList={occList} setOccList={setOccList} />
//         {errors[f[0]] && <span className="text-red-500 text-xs">{errors[f[0]]}</span>}
//       </div>
//     ));
//   return (
//     <div className="mt-6">
//       <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//       <div className="flex justify-end items-center mb-6">
//         <div className="flex flex-row items-center gap-2">
//           <div className="relative w-full md:w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input type="text" placeholder="Search by Patient ID or Name..." value={state.search} onChange={e => S("search", e.target.value)} className="pl-8 pr-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-xs" />
//             {state.searching && (<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin w-4 h-4" />)}
//           </div>
//           <button onClick={() => S("modalOpen", true)} className="btn btn-primary whitespace-nowrap px-4 py-3 text-xs flex items-center gap-2"><Plus className="w-4 h-4" /> Add Patient</button>
//         </div>
//       </div>
//       <div className="px-4 min-h-screen bg-gray-50">
//         <div className="bg-white rounded shadow-sm overflow-hidden animate-fadeIn">
//           <div className="overflow-x-auto">
//             <table className="table-container min-w-[700px]">
//               <thead className="bg-gray-100 ">
//                 <tr className="table-head text-xs">
//                   {["ID", "Name", "Admission", "Status", "Diagnosis", "Ward", "Discharge", "Actions"].map(h => (<th key={h} className="px-3 py-3">{h}</th>))}
//                 </tr>
//               </thead>
//               <tbody className="table-body text-xs">
//                 {state.filteredIPD.filter(p => (p.type || "").toLowerCase() === "ipd").map(p => (
//                   <tr key={p.id} className={`tr-style text-center hover:bg-gray-50 ${recentPatientId === p.id ? "blink-row font-extrabold" : ""}`} onMouseEnter={() => { if (recentPatientId === p.id) setRecentPatientId(null); }}>
//                     <td className="px-2 py-1">{p.id}</td>
//                     <td className="px-2 py-1">
//                       <button className="text-blue-700 underline hover:text-blue-900" onClick={() => viewPatientDetails(p)}>
//                         {p.name || `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`.replace(/\s+/g, " ").trim()}
//                       </button>
//                     </td>
//                     <td className="px-2 py-1">{p.admissionDate}</td>
//                     <td className="px-2 py-1">
//                       <span className={`status-badge ${p.status === "Admitted" ? "status-admitted" : p.status === "Under Treatment" ? "status-pending" : "status-discharged"}`}>{p.status}</span>
//                     </td>
//                     <td className="px-2 py-1">{p.diagnosis}</td>
//                     <td className="px-2 py-1">{[p.wardType, p.wardNo, p.bedNo].filter(Boolean).join("-")}</td>
//                     <td className="px-2 py-1">{p.dischargeDate || "-"}</td>
//                     <td className="px-2 py-1"></td>
//                   </tr>
//                 ))}
//                 {state.filteredIPD.filter(p => (p.type || "").toLowerCase() === "ipd").length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="py-4 text-gray-400 text-center text-xs">No patients found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {/* Modal for Add Patient */}
//         {state.modalOpen && !state.showIpdForm && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(14,22,48,0.18)] backdrop-blur-sm">
//             <div className="bg-white rounded-3xl shadow-2xl border-2 border-[var(--accent-color)] p-8 w-full max-w-2xl animate-slideUp">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Add New Patient</h3>
//                 <button onClick={() => S("modalOpen", false)} className="text-gray-500 hover:text-red-600 text-xl">&times;</button>
//               </div>
//               <form className="space-y-6" onSubmit={handlePatientFormSubmit}>
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="floating-input relative flex-1" data-placeholder="Enter PatientId Number">
//                     <input className={`input-field peer ${errors.aadhaarId ? "border-red-500" : ""}`} value={state.aadhaarId} maxLength={12} onChange={e => S("aadhaarId", e.target.value.replace(/\D/g, ""))} placeholder=" " autoComplete="off" />
//                     {errors.aadhaarId && <span className="text-red-500 text-xs">{errors.aadhaarId}</span>}
//                   </div>
//                   <button type="button" onClick={fetchPatient} className="animate-pulse-save text-white px-4 text-sm py-2 rounded self-end md:self-auto" style={{ backgroundColor: "var(--primary-color)" }}>Get Patient Details</button>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {renderFields(FIELDS.slice(0, 3), state.formData, F, errors, state.occList, v => S("occList", v))}
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {renderFields(FIELDS.slice(3, 6), state.formData, F, errors, state.occList, v => S("occList", v))}
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {renderFields(FIELDS.slice(6, 9), state.formData, F, errors, state.occList, v => S("occList", v))}
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {renderFields(FIELDS.slice(9, 11), state.formData, F, errors, state.occList, v => S("occList", v))}
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {renderFields(FIELDS.slice(11, 13), state.formData, F, errors, state.occList, v => S("occList", v))}
//                 </div>
//                 <div>
//                   <label className="font-medium block mb-1">Upload Photo</label>
//                   <input type="file" accept="image/*" className="input-field w-full" />
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-end gap-4 pt-2">
//                   <button type="submit" className="btn btn-primary animate-pulse-save px-6 py-2 shadow-md hover:scale-105 transition-all duration-300">Next</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//         {/* Modal for IPD Details */}
//         {state.modalOpen && state.showIpdForm && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(14,22,48,0.18)] backdrop-blur-sm">
//             <div className="bg-white rounded-3xl shadow-2xl border-2 border-[var(--primary-color)] p-8 w-full max-w-xl animate-slideUp">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">IPD Details</h3>
//                 <button onClick={handleCloseIpdModal} className="text-gray-500 hover:text-red-600 text-xl">&times;</button>
//               </div>
//               <form className="space-y-6" onSubmit={handleIPDFormSubmit}>
//                 <div className="space-y-3">
//                   <div className="grid md:grid-cols-3 gap-x-4 gap-y-4">
//                     {renderFields(IPD, state.ipdData, I, errors)}
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:flex-row justify-end gap-4 pt-2">
//                   <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded shadow hover:bg-gray-500 animated-cancel-btn" onClick={handleCloseIpdModal}>{state.editModalOpen ? "Cancel" : "Back"}</button>
//                   <button type="submit" disabled={state.saving} className="btn btn-primary animate-pulse-save flex items-center gap-2 disabled:opacity-50 px-6 py-2 shadow-md hover:scale-105 transition-all duration-300">
//                     {state.saving && <Loader2 className="w-4 h-4 animate-spin" />}
//                     {state.editModalOpen ? "Save" : "Add Patient to IPD"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//         {/* Modal for Patient Details */}
//         {state.selectedPatient && !state.editModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(14,22,48,0.18)] backdrop-blur-sm">
//             <div className="bg-white rounded-3xl shadow-2xl border-2 border-[var(--primary-color)] p-6 w-full max-w-xl relative overflow-y-auto max-h-[90vh] animate-slideUp">
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="text-lg font-bold text-[#0E1630]">Patient Details</h4>
//                 <div className="flex gap-2 items-center">
//                   <button onClick={handleEdit} className="btn btn-primary px-6 py-2 shadow-md hover:scale-105 transition-all duration-300 gap-2 flex items-center" title="Edit" type="button">
//                     <Edit className="w-4 h-4" /><span>Edit</span>
//                   </button>
//                   <button onClick={() => S("selectedPatient", null)} className="modal-close-btn text-xl text-gray-400 hover:text-red-500" type="button" title="Close">&times;</button>
//                 </div>
//               </div>
//               <div className="border p-2 rounded mb-2">
//                 <h4 className="font-bold mb-1 border-b pb-1 text-xs">Basic Info</h4>
//                 <div className="text-xs">{state.selectedPatient.name} | Admission: {state.selectedPatient.admissionDate} {state.selectedPatient.admissionTime} | Status: {state.selectedPatient.status}</div>
//                 <div className="text-xs">Reason: {state.selectedPatient.reasonForAdmission}</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="border p-2 rounded">
//                   <h4 className="font-bold mb-1 border-b pb-1 text-xs">Health</h4>
//                   <div className="grid grid-cols-3 gap-2 text-xs">
//                     {["height", "weight", "bloodGroup"].map((k, i) => (
//                       <div key={i}>{k.charAt(0).toUpperCase() + k.slice(1)}: {state.personalDetails?.[k] || state.selectedPatient[k] || (k === "bloodGroup" ? "Not recorded" : "—")}{k === "height" && " cm"}{k === "weight" && " kg"}</div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="border p-2 rounded">
//                   <h4 className="font-bold mb-1 border-b pb-1 text-xs">Treatment</h4>
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     {[
//                       ["Dept", "department"],
//                       ["Doctor", "doctorInCharge"],
//                       ["Treatment", "treatmentPlan"],
//                       ["Surgery", "surgeryRequired"]
//                     ].map(([label, key], i) => (
//                       <div key={i}>{label}: {state.selectedPatient[key] || "—"}</div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="border p-2 rounded">
//                   <h4 className="font-bold mb-1 border-b pb-1 text-xs">Contact & Address</h4>
//                   <div className="text-xs">
//                     <div>Permanent Address: {state.selectedPatient.permanentAddress || "—"}</div>
//                     <div>Temporary Address: {state.selectedPatient.temporaryAddress || "—"}</div>
//                     <div>Email: {state.selectedPatient.email || "—"}</div>
//                     <div>DOB: {state.selectedPatient.dob || "—"}</div>
//                     <div>Occupation: {state.selectedPatient.occupation || "—"}</div>
//                     <div>Blood Group: {state.selectedPatient.bloodGroup || "—"}</div>
//                     <div>Password: {state.selectedPatient.password ? "******" : "—"}</div>
//                     <div>Confirm Password: {state.selectedPatient.confirmPassword ? "******" : "—"}</div>
//                   </div>
//                 </div>
//                 <div className="border p-2 rounded">
//                   <h4 className="font-bold mb-1 border-b pb-1 text-xs">Vitals</h4>
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     {[
//                       ["BP", "bloodPressure"],
//                       ["HR", "heartRate"],
//                       ["Temp", "temperature"],
//                       ["Sugar", "bloodSugar"]
//                     ].map(([label, key], i) => (
//                       <div key={i}>{label}: {state.vitals?.[key] || state.selectedPatient.vitals?.[key] || "—"}</div>
//                     ))}
//                   </div>
//                 </div>
//                 {state.family && state.family.length > 0 && (
//                   <div className="border p-2 rounded">
//                     <h4 className="font-bold mb-1 border-b pb-1 text-xs">Family</h4>
//                     <ul className="text-xs list-disc pl-4">
//                       {state.family.map((f, i) => (
//                         <li key={i}>{f.name} ({f.relation})</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }