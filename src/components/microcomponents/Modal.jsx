import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye, X } from "lucide-react";
const chunkFields = (fields, size = 3) => {
  const chunks = [];
  for (let i = 0; i < fields.length; i += size) chunks.push(fields.slice(i, i + size));
  return chunks;
};
const ReusableModal = ({
  isOpen, onClose, mode, title, data = {}, saveLabel, cancelLabel, deleteLabel,
  fields = [], viewFields = [], size = "md", onSave, onDelete
}) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  useEffect(() => {
    if (fields.length && ["add", "edit"].includes(mode)) {
      const initial = {}; fields.forEach(f => initial[f.name] = data?.[f.name] ?? "");
      setFormValues(initial); setFormErrors({});
    }
  }, [isOpen, fields, mode, data]);
  const handleChange = (name, value) => {
    setFormValues(p => ({ ...p, [name]: value }));
    setFormErrors(p => ({ ...p, [name]: undefined }));
  };
  const handleSave = () => {
    const errors = {};
    fields.forEach(f => { if (!formValues[f.name]?.toString().trim()) errors[f.name] = `${f.label} is required`; });
    if (Object.keys(errors).length) return setFormErrors(errors);
    onSave(formValues); toast.success(mode === "add" ? "Record added Successfully!" : "Record updated Successfully!"); onClose();
  };
  const handleDelete = () => { onDelete(); toast.error("Record deleted Successfully!"); onClose(); };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative w-full max-h-[90vh] overflow-hidden rounded-xl ${ { sm: "max-w-md", md: "max-w-3xl", lg: "max-w-4xl" }[size] }`}>
        {(mode === "add" || mode === "edit" || mode === "viewProfile") && (
          <div className="sticky top-0 z-20 rounded-t-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#01B07A] to-[#004F3D] p-[1px]">
              <div className="flex items-center justify-between rounded-t-xl px-6 py-4">
                <h2 className="text-lg font-bold text-[var(--color-surface)] tracking-wide">{title}</h2>
                <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-surface)] text-[var(--color-surface)] hover:bg-gradient-to-br from-[#E6FBF5] to-[#C1F1E8] hover:text-[var(--primary-color)] transition">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col max-h-[90vh] overflow-hidden bg-gradient-to-br from-[#E6FBF5] to-[#C1F1E8]">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-xl bg-[var(--color-surface)] p-6 space-y-6">
              {["add", "edit"].includes(mode) && chunkFields(fields).map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  {row.map(field => (
                    <div key={field.name} className="flex flex-col">
                      <div className="floating-input relative" data-placeholder={field.label}>
                        {field.type === "select" ? (
                          <select name={field.name} value={formValues[field.name] || ""} onChange={e => handleChange(field.name, e.target.value)} className="peer input-field">
                            <option value="">Select {field.label}</option>
                            {field.options?.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea name={field.name} value={formValues[field.name] || ""} onChange={e => handleChange(field.name, e.target.value)} rows={1} className="peer input-field" placeholder=" " />
                        ) : field.type === "date" ? (
                          <input type="date" name={field.name} value={formValues[field.name] || ""} onChange={e => handleChange(field.name, e.target.value)} className="peer input-field" />
                        ) : field.type === "file" ? (
                          <>
                            <div className="relative flex items-center">
                              <input type="file" name={field.name} multiple={field.multiple} onChange={e => {
                                const files = Array.from(e.target.files);
                                handleChange(field.name, field.multiple ? [...(formValues[field.name] || []), ...files] : files[0]);
                              }} className="peer input-field pr-8" />
                              {!field.multiple && formValues[field.name] && (
                                <button type="button" onClick={() => { setPreviewFile(formValues[field.name]); setShowPreviewModal(true); }} className="absolute right-2 text-[var(--primary-color)]">
                                  <Eye size={18} />
                                </button>
                              )}
                            </div>
                            {field.multiple && Array.isArray(formValues[field.name]) && (
                              <ul className="mt-2 space-y-1">
                                {formValues[field.name].map((file, idx) => (
                                  <li key={idx} className="flex justify-between bg-gray-100 px-2 py-1 text-sm">
                                    <span className="truncate">{file.name}</span>
                                    <button type="button" onClick={() => { setPreviewFile(file); setShowPreviewModal(true); }}>
                                      <Eye size={16} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <input type={field.type || "text"} name={field.name} value={formValues[field.name] || ""} onChange={e => handleChange(field.name, e.target.value)} className="peer input-field" placeholder=" " />
                        )}
                      </div>
                      {field.extraNode && <div className="mt-1">{field.extraNode}</div>}
                      {formErrors?.[field.name] && (<span className="mt-1 text-xs text-red-500">{formErrors[field.name]}</span>)}
                    </div>
                  ))}
                </div>
              ))}
              {mode === "viewProfile" && (
                <>
                  <div className="flex items-center rounded-xl bg-gradient-to-r from-[#01B07A] to-[#1A223F] p-5">
                    <div className="relative mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--primary-color)] text-2xl font-bold uppercase shadow-inner ring-4 ring-white ring-offset-2">
                      {viewFields.find(f => f.initialsKey) ? (data[viewFields.find(f => f.initialsKey).key] || "NA").substring(0, 2).toUpperCase() : "NA"}
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[var(--color-surface)]">{viewFields.find(f => f.titleKey) ? data[viewFields.find(f => f.titleKey).key] || "-" : "-"}</p>
                      <p className="mt-1 text-sm font-medium text-blue-100 tracking-wide">{viewFields.find(f => f.subtitleKey) ? data[viewFields.find(f => f.subtitleKey).key] || "-" : "-"}</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-6 bg-[var(--color-surface)]">
                    <h3 className="mb-4 border-b pb-3 h4-heading">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {viewFields.filter(f => !f.initialsKey && !f.titleKey && !f.subtitleKey).map((f, i) => (
                        <div key={i} className="flex justify-between border-b border-dashed border-gray-500 pb-2">
                          <span className="text-sm font-medium text-gray-500">{f.label}</span>
                          <span className="ml-4 text-sm font-semibold text-gray-800">{data[f.key] || "-"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {mode === "confirmDelete" && (<p className="text-gray-700">Are you sure you want to delete this record?</p>)}
            </div>
            <div className=" mb-12 flex justify-end gap-3 px-6 py-4 ">
            <button onClick={onClose} className="delete-btn">{cancelLabel || "Cancel"}</button>
            {["add", "edit"].includes(mode) && (<button onClick={handleSave} className="view-btn">{saveLabel || (mode === "edit" ? "Update" : "Save")}</button>)}
            {mode === "confirmDelete" && (<button onClick={handleDelete} className="edit-btn">{deleteLabel || "Yes, Delete"}</button>)}
          </div>
        </div>
          </div>
        {showPreviewModal && previewFile && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold">File Preview</h3>
                <button onClick={() => setShowPreviewModal(false)} className="text-gray-700 hover:text-red-500">X</button>
              </div>
              {previewFile.type?.startsWith("image/") ? (
                <img src={URL.createObjectURL(previewFile)} alt={previewFile.name} className="w-full max-h-[70vh] object-contain" onLoad={() => URL.revokeObjectURL(previewFile)} />
              ) : (<p className="text-gray-800">File: {previewFile.name}</p>)}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default ReusableModal;