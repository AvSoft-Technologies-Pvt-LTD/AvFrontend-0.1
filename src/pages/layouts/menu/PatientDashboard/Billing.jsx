import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaPrint } from 'react-icons/fa';
const BillingTable = () => {
  const [p, setP] = useState([]), [l, setL] = useState(true), [e, setE] = useState(null), [s, setS] = useState(null);
  useEffect(() => { f(); }, []);
  const f = async () => { try { const r = await axios.get('https://681b32bd17018fe5057a8bcb.mockapi.io/paybook'); setP(r.data); setL(false); } catch (err) { setE('Failed to fetch payment data'); setL(false); } };
  const getInvoiceTemplate = (i) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Invoice #${i.invoiceNo} | AV Swasthya</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/><style>:root{--primary:#1a1a1a;--secondary:#4a5568;--accent:#2d3748;--border:#e2e8f0;--light-bg:#f7fafc;--card-bg:#fff}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;background:var(--light-bg);color:var(--primary);padding:2rem;line-height:1.6}.invoice{max-width:800px;margin:auto;background:var(--card-bg);padding:3rem;box-shadow:0 1px 3px rgba(0,0,0,.1)}.invoice-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid var(--border)}.logo-section{flex:1}.logo-section h1{font-size:2rem;color:var(--primary);font-weight:700;margin-bottom:.5rem}.logo-section .sub{font-size:1rem;color:var(--secondary);font-weight:500}.invoice-details{text-align:right}.invoice-details h2{font-size:1.5rem;color:var(--primary);font-weight:600;margin-bottom:1rem}.invoice-details p{font-size:.95rem;color:var(--secondary);margin-bottom:.5rem}.invoice-details strong{color:var(--primary);font-weight:600}.info-section{display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:3rem}.info-block{background:var(--light-bg);padding:1.5rem;border-radius:8px}.info-block h3{font-size:1rem;color:var(--primary);font-weight:600;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.05em}.info-row{display:flex;justify-content:space-between;margin-bottom:.75rem;font-size:.95rem}.info-label{color:var(--secondary)}.info-value{color:var(--primary);font-weight:500}table{width:100%;border-collapse:collapse;margin-bottom:2rem}th{background:var(--light-bg);padding:1rem;text-align:left;font-weight:600;color:var(--primary);font-size:.9rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid var(--border)}td{padding:1rem;border-bottom:1px solid var(--border);font-size:.95rem;color:var(--primary)}td:last-child{text-align:right;font-weight:500}.total-section{margin-top:2rem;text-align:right}.total-row{display:flex;justify-content:flex-end;align-items:center;margin-bottom:.5rem;font-size:.95rem}.total-label{width:150px;text-align:right;color:var(--secondary);padding-right:1rem}.total-value{width:150px;text-align:right;font-weight:600;color:var(--primary)}.grand-total{font-size:1.1rem;border-top:2px solid var(--border);padding-top:.5rem;margin-top:.5rem}.footer{margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border);text-align:center;font-size:.9rem;color:var(--secondary)}.footer p{margin-bottom:.5rem}.footer .note{font-size:.8rem;color:var(--secondary);margin-top:1rem}@media print{body{background:#fff;padding:0}.invoice{box-shadow:none;padding:0}.info-block{background:none;border:1px solid var(--border)}th{background:var(--light-bg)!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="invoice"><div class="invoice-header"><div class="logo-section"><h1>AV Swasthya</h1><div class="sub">Healthcare & Wellness Center</div><div style="margin-top:1rem;font-size:.9rem;color:var(--secondary)">123 Health Avenue, Medical District<br/>+91 98765 43210<br/>contact@avswasthya.com</div></div><div class="invoice-details"><h2>INVOICE</h2><p><strong>Invoice No:</strong> ${i.invoiceNo}</p><p><strong>Date:</strong> ${i.date}</p><p><strong>Status:</strong> Paid</p></div></div><div class="info-section"><div class="info-block"><h3>Patient Information</h3><div class="info-row"><span class="info-label">Name:</span><span class="info-value">${i.patientName}</span></div><div class="info-row"><span class="info-label">Doctor:</span><span class="info-value">${i.doctorName}</span></div></div><div class="info-block"><h3>Payment Details</h3><div class="info-row"><span class="info-label">Service Type:</span><span class="info-value">${i.serviceType}</span></div><div class="info-row"><span class="info-label">Payment Method:</span><span class="info-value">${i.method.toUpperCase()}</span></div></div></div><table><thead><tr><th>Description</th><th>Payment Method</th><th>Amount</th></tr></thead><tbody><tr><td>${i.serviceType}</td><td>${i.method.toUpperCase()}</td><td>₹${i.amount}</td></tr></tbody></table><div class="total-section"><div class="total-row"><span class="total-label">Subtotal:</span><span class="total-value">₹${i.amount}</span></div><div class="total-row"><span class="total-label">Tax (0%):</span><span class="total-value">₹0.00</span></div><div class="total-row grand-total"><span class="total-label">Total:</span><span class="total-value">₹${i.amount}</span></div></div><div class="footer"><p>Thank you for choosing AV Swasthya for your healthcare needs.</p><p>Payment is due within 30 days</p><p class="note">This is a computer-generated invoice and does not require a signature.</p></div></div></body></html>`;
  const d = (i) => { const content = getInvoiceTemplate(i); const blob = new Blob([content], { type: 'text/html' }); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `AV_Swasthya_Invoice_${i.invoiceNo}.html`; document.body.appendChild(a); a.click(); document.body.removeChild(a); window.URL.revokeObjectURL(url); };
  const pr = (i) => { const w = window.open('', '_blank'); w.document.write(getInvoiceTemplate(i)); w.document.close(); w.onload = () => { w.print(); w.close(); }; };
  if (l) return <div className="text-center p-4">Loading...</div>;
  if (e) return <div className="text-center text-red-500 p-4">{e}</div>;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Billing History</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead><tr className="bg-slate-50">{['Date', 'Invoice No', 'Doctor', 'Service', 'Amount', 'Method', 'Action'].map(h => <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 border-b border-slate-200">{h}</th>)}</tr></thead>
          <tbody>{p.map(i => <tr key={i.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">{i.date}</td>
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">{i.invoiceNo}</td>
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">{i.doctorName}</td>
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">{i.serviceType}</td>
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">₹{i.amount}</td>
            <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100 capitalize">{i.method}</td>
            <td className="px-6 py-4 border-b border-slate-100"><button onClick={() => setS(i)} className="bg-[#0E1630] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2A466D] transition-colors">View Invoice</button></td>
          </tr>)}</tbody>
        </table>
      </div>
      {s && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-all duration-300 print:max-w-none print:rounded-none print:shadow-none print:h-auto print:overflow-visible">
          <div className="p-6 border-b border-gray-200 flex justify-between items-start print:border-none">
            <div><h1 className="text-2xl font-bold text-gray-900">AV Swasthya</h1><p className="text-sm text-gray-500 font-medium">Healthcare & Wellness Center</p><p className="text-xs text-gray-400 mt-2">123 Health Avenue, Medical District</p><p className="text-xs text-gray-400">+91 98765 43210</p><p className="text-xs text-gray-400">contact@avswasthya.com</p></div>
            <button onClick={() => setS(null)} title="Close" className="text-gray-400 hover:text-gray-600 transition text-xl print:hidden">✕</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6">
            <div><h3 className="uppercase text-xs font-semibold text-gray-500 mb-2">Invoice Details</h3>
              <div className="text-sm text-gray-700 space-y-1"><p><span className="text-gray-500">Invoice No:</span> <strong>{s.invoiceNo}</strong></p><p><span className="text-gray-500">Date:</span> <strong>{s.date}</strong></p><p><span className="text-gray-500">Status:</span> <strong className="text-green-600">Paid</strong></p></div>
            </div>
            <div><h3 className="uppercase text-xs font-semibold text-gray-500 mb-2">Patient Information</h3>
              <div className="text-sm text-gray-700 space-y-1"><p><span className="text-gray-500">Name:</span> <strong>{s.patientName}</strong></p><p><span className="text-gray-500">Doctor:</span> <strong>{s.doctorName}</strong></p></div>
            </div>
          </div>
          <div className="p-6">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-100 text-left text-xs uppercase text-gray-600 tracking-wide"><th className="px-4 py-3">Description</th><th className="px-4 py-3">Method</th><th className="px-4 py-3 text-right">Amount</th></tr></thead>
              <tbody><tr className="border-b border-gray-200"><td className="px-4 py-3">{s.serviceType}</td><td className="px-4 py-3">{s.method.toUpperCase()}</td><td className="px-4 py-3 text-right font-medium">₹{s.amount}</td></tr></tbody>
            </table>
            <div className="mt-4 text-sm text-right">
              <div className="flex justify-end"><div className="w-1/2 sm:w-1/3 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal:</span><span className="text-gray-800 font-semibold">₹{s.amount}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax (0%):</span><span className="text-gray-800 font-semibold">₹0.00</span></div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 text-base font-bold"><span>Total:</span><span>₹{s.amount}</span></div>
              </div></div>
            </div>
          </div>
          <div className="px-6 pb-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p className="mb-2">Thank you for choosing AV Swasthya for your healthcare needs.</p>
            <p className="mb-2">Payment is due within 30 days.</p>
            <p className="text-xs text-gray-400">This is a computer-generated invoice and does not require a signature.</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 print:hidden">
              <button onClick={() => d(s)} className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2"><FaDownload /> Download</button>
              <button onClick={() => pr(s)} className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2"><FaPrint /> Print</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default BillingTable;