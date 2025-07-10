import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, ChevronDown } from "lucide-react";
const chunkFields = (fields, size = 3) => {
  const chunks = [];
  for (let i = 0; i < fields.length; i += size) chunks.push(fields.slice(i, i + size));
  return chunks;
};
const ReusableModal = ({
  isOpen, onClose, mode, title, data = {}, saveLabel, cancelLabel,
  deleteLabel, fields = [], viewFields = [], size = "md", onSave, onDelete, errors = {}
}) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (fields.length && (mode === "add" || mode === "edit")) {
      const initial = {};
      fields.forEach(f => { initial[f.name] = data?.[f.name] ?? ""; });
      setFormValues(initial);
      setFormErrors({}); // Reset errors on open
    }
  }, [isOpen, fields, mode, data]);

  const handleChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(f => {
      if (!formValues[f.name] || formValues[f.name].toString().trim() === "") {
        newErrors[f.name] = `${f.label} is required`;
      }
    });
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return; // Prevent closing, form is invalid
    }
    onSave(formValues);
    toast.success(mode === "add" ? "Record added Successfully!" : "Record updated Successfully!");
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    toast.error("Record deleted Successfully!");
    onClose();
  };

  if (!isOpen) return null;

  const rows = chunkFields(fields);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
       <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative w-full max-h-[90vh] overflow-y-auto rounded-xl bg-[#E6FBF5] ${{ sm: "max-w-md", md: "max-w-3xl", lg: "max-w-4xl" }[size]
          } p-6 shadow-2xl`}
      >
        {(mode === "add" || mode === "edit") && (
          <>
            <div className="flex items-center justify-between rounded-t-md bg-[var(--primary-color)] px-5 py-3">
              <h2 className="text-lg font-semibold text-[var(--color-surface)]">{title}</h2>
              <button onClick={onClose} className="rounded border border-[var(--color-surface)] px-2 text-[var(--color-surface)] hover:bg-[var(--color-surface)] hover:text-[var(--primary-color)] transition">X</button>
            </div>
             <div className="space-y-6 border border-gray-200 shadow-sm p-6 bg-[var(--color-surface)]">
              {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  {row.map(field => (
                    <div key={field.name} className="flex flex-col">
                      <div className="floating-input relative" data-placeholder={field.label}>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={e => handleChange(field.name, e.target.value)}
                            className="peer input-field"
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={e => handleChange(field.name, e.target.value)}
                            rows={1}
                            className="peer input-field"
                            placeholder=" "
                          />
                        ) : field.type === "date" ? (
                          <input
                            type="date"
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={e => handleChange(field.name, e.target.value)}
                            className="peer input-field"
                          />
                        ) : field.type === "file" ? (
                           <>
                            <div className="relative flex items-center">
                              <input type="file" name={field.name} multiple={field.multiple} onChange={e => {
                                const files = Array.from(e.target.files);
                                handleChange(field.name, field.multiple ? [...(formValues[field.name] || []), ...files] : files[0]);
                              }} className="peer input-field pr-8" />
                              {!field.multiple && formValues[field.name] && (
                                <button type="button" onClick={() => { setPreviewFile(formValues[field.name]); setShowPreviewModal(true); }} className="absolute right-2 text-[var(--primary-color)]"><Eye size={18} /></button>
                              )}
                            </div>
                            {field.multiple && Array.isArray(formValues[field.name]) && (
                              <ul className="mt-2 space-y-1">{formValues[field.name].map((file, idx) => (
                                <li key={idx} className="flex justify-between bg-gray-100 px-2 py-1 text-sm">
                                  <span className="truncate">{file.name}</span>
                                  <button type="button" onClick={() => { setPreviewFile(file); setShowPreviewModal(true); }}><Eye size={16} /></button>
                                </li>
                              ))}</ul>
                            )}
                          </>
                        ) : (
                          <input
                            type={field.type || "text"}
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={e => handleChange(field.name, e.target.value)}
                            className="peer input-field"
                            placeholder=" "
                          />
                        )}
                      </div>
                      {field.extraNode && <div className="mt-1">{field.extraNode}</div>}
                      {formErrors?.[field.name] && (
                        <span className="mt-1 text-xs text-red-500">{formErrors[field.name]}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
        {mode === "viewProfile" && (
          <div className="space-y-6">
            {/* Header with avatar */}
            <div className="flex items-center rounded-xl bg-gradient-to-r from-[#01B07A] to-[#1A223F] p-5 shadow-lg">
              <div className="relative mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--primary-color)] text-2xl font-bold uppercase shadow-inner ring-4 ring-white ring-offset-2">
                {viewFields.find(f => f.initialsKey)
                  ? (data[viewFields.find(f => f.initialsKey).key] || "NA").substring(0, 2).toUpperCase()
                  : "NA"}
              </div>
              <div>
                <p className="text-2xl font-semibold text-[var(--color-surface)]">
                  {viewFields.find(f => f.titleKey)
                    ? data[viewFields.find(f => f.titleKey).key] || "-"
                    : "-"}
                </p>
                <p className="mt-1 text-sm font-medium text-blue-100 tracking-wide">
                  {viewFields.find(f => f.subtitleKey)
                    ? data[viewFields.find(f => f.subtitleKey).key] || "-"
                    : "-"}
                </p>
              </div>
            </div>
            {/* Details grid */}
            <div className="rounded-xl border border-gray-200 bg-[var(--color-surface)] p-6 shadow-md">
              <h3 className="mb-4 border-b border-gray-200 pb-3 h4-heading">
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {viewFields
                  .filter(f => !f.initialsKey && !f.titleKey && !f.subtitleKey)
                  .map((f, i) => (
                    <div key={i} className="flex items-start justify-between rounded-md border-b border-dashed border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-500">{f.label}</span>
                      <span className="ml-4 text-sm font-semibold text-gray-800">{data[f.key] || "-"}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {mode === "confirmDelete" && <p className="text-gray-700">Are you sure you want to delete this record?</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="delete-btn">
            {cancelLabel || "Cancel"}
          </button>
          {(mode === "add" || mode === "edit") && (
            <button onClick={handleSave} className="view-btn">
              {saveLabel || (mode === "edit" ? "Update" : "Save")}
            </button>
          )}
          {mode === "confirmDelete" && (
            <button onClick={handleDelete} className="edit-btn">
              {deleteLabel || "Yes, Delete"}
            </button>
          )}
        </div>
        {showPreviewModal && previewFile && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold">File Preview</h3>
                <button onClick={() => setShowPreviewModal(false)} className="text-gray-700 hover:text-red-500">X</button>
              </div>
              {previewFile.type?.startsWith("image/") ? (
                <img src={URL.createObjectURL(previewFile)} alt={previewFile.name} className="w-full max-h-[70vh] object-contain" onLoad={() => URL.revokeObjectURL(previewFile)} />
              ) : <p className="text-gray-800">File: {previewFile.name}</p>}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default ReusableModal;