import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, FileText, TestTube, Pill, Heart, Eye, Stethoscope, Activity, CreditCard, DollarSign, Building, LogOut } from 'lucide-react';
import axios from 'axios';

const PatientDashboard = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('Show All');
  const [loading, setLoading] = useState(true);

  // Patient data from navigation state or fetch from API
  useEffect(() => {
    if (location.state?.patient) {
      setPatient(location.state.patient);
      setLoading(false);
    } else {
      // Fetch patient data from API if not provided in state
      fetchPatientData();
    }
  }, [patientId, location.state]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`https://684be316ed2578be881cdb55.mockapi.io/addpatient/${patientId}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Quick links data
  const quickLinks = [
    { id: 'treatment', label: 'Treatment', icon: Stethoscope, color: 'text-blue-600' },
    { id: 'nursing', label: 'Nursing & Treatment', icon: Heart, color: 'text-red-500' },
    { id: 'prescription', label: 'Prescription', icon: Pill, color: 'text-green-600' },
    { id: 'patientcare', label: 'PatientCare Report', icon: FileText, color: 'text-purple-600' },
    { id: 'testmedicine', label: 'Test/Medicine Slip', icon: TestTube, color: 'text-cyan-600' },
    { id: 'glassprescription', label: 'Glass Prescription Slip', icon: Eye, color: 'text-orange-600' },
    { id: 'patienthistory', label: 'Patient History Take', icon: Activity, color: 'text-indigo-600' },
    { id: 'editprofile', label: 'Edit Profile', icon: User, color: 'text-gray-600' },
    { id: 'patientprofile', label: 'Patient Profile', icon: User, color: 'text-blue-500' },
    { id: 'gatepass', label: 'Gate Pass', icon: Building, color: 'text-yellow-600' },
    { id: 'collection', label: 'Collection/Discount', icon: DollarSign, color: 'text-green-500' },
    { id: 'labbill', label: 'Lab Bill', icon: TestTube, color: 'text-pink-600' },
    { id: 'hosbill', label: 'Hos Bill', icon: Building, color: 'text-teal-600' },
    { id: 'dentalbill', label: 'Dental Bill', icon: FileText, color: 'text-blue-700' },
    { id: 'pharmacybill', label: 'Pharmacy Bill', icon: Pill, color: 'text-green-700', highlight: true },
    { id: 'opticalbill', label: 'Optical Bill', icon: Eye, color: 'text-orange-500' },
    { id: 'pharmacyreport', label: 'Pharmacy Report', icon: FileText, color: 'text-purple-500' },
    { id: 'detailsbill', label: 'Details Bill', icon: CreditCard, color: 'text-red-600' },
    { id: 'ledgerreport', label: 'Ledger Report', icon: FileText, color: 'text-gray-700' },
    { id: 'closetreatment', label: 'Close Treatment', icon: LogOut, color: 'text-red-700' },
    { id: 'discharge', label: 'Discharge Certificate', icon: FileText, color: 'text-green-800' }
  ];

  // Tab navigation
  const tabs = [
    'Show All', 'Patient History', 'Lab Test', 'Hos Services', 'Diagnosis', 
    'Medicine', 'Eye Test', 'Dental Services', 'ICD Codes', 'Advices', 'Online Query'
  ];

  const handleQuickLinkClick = (linkId) => {
    console.log(`Clicked on ${linkId}`);
    // Handle navigation or action based on linkId
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading patient details...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Patient not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Go Dashboard
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
                📋 Prescription
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors">
                👤 PatientCare
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Patient Info Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Patient Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Patient Name</span>
                  <span className="text-sm font-medium">: {patient.name || `${patient.firstName || ''} ${patient.middleName || ''} ${patient.lastName || ''}`.trim()}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Age</span>
                  <span className="text-sm">: {patient.age || calculateAge(patient.dob) || '30'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Gender</span>
                  <span className="text-sm">: {patient.gender || 'Male'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Phone</span>
                  <span className="text-sm">: {patient.phone || '9090909090'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Address</span>
                  <span className="text-sm">: {patient.address || patient.permanentAddress || 'Not provided'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Doctor/Consultant</span>
                  <span className="text-sm">: {patient.doctorName || patient.doctorInCharge || 'Dr.Sheetal S. Shelke'}</span>
                </div>
              </div>

              {/* Right Column - Treatment Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Treatment ID</span>
                  <span className="text-sm">: {patient.treatmentId || `IP-${String(patient.id).padStart(9, '0')}`}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Hospital UID</span>
                  <span className="text-sm">: {patient.hospitalId || `HD${String(patient.id).padStart(6, '0')}`}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Admission Date</span>
                  <span className="text-sm">: {patient.admissionDate || patient.appointmentDate || '05/02/2021 00:00'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Bed</span>
                  <span className="text-sm">: {patient.bedNo || 'n/a'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-600 w-32">Discharge Date</span>
                  <span className="text-sm">: {patient.dischargeDate || ''}</span>
                </div>
                
                {/* Barcode */}
                <div className="mt-4">
                  <div className="text-right">
                    <div className="text-xs font-mono bg-gray-100 p-2 rounded inline-block">
                      ||||||||||||||||||||||||||||||||||||||||
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-teal-100 rounded-lg mb-6">
            <div className="flex flex-wrap gap-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    activeTab === tab
                      ? 'bg-teal-500 text-white'
                      : 'text-teal-700 hover:bg-teal-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* Patient History Section */}
            <div className="bg-teal-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-teal-800">Patient History</h3>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Back History Entry
                </button>
              </div>
              
              {/* History Table Header */}
              <div className="bg-white rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left">Edit</th>
                      <th className="px-3 py-2 text-left">Record Time</th>
                      <th className="px-3 py-2 text-left">Temp</th>
                      <th className="px-3 py-2 text-left">Resp Rate</th>
                      <th className="px-3 py-2 text-left">Pulse</th>
                      <th className="px-3 py-2 text-left">Bp</th>
                      <th className="px-3 py-2 text-left">Mental Status</th>
                      <th className="px-3 py-2 text-left">Oxygen Saturation</th>
                      <th className="px-3 py-2 text-left">Bleeding</th>
                      <th className="px-3 py-2 text-left">Rbs</th>
                      <th className="px-3 py-2 text-left">Chief Complain</th>
                      <th className="px-3 py-2 text-left">Past History Summary</th>
                      <th className="px-3 py-2 text-left">Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">-</td>
                      <td className="px-3 py-2">
                        <button className="text-blue-600 hover:text-blue-800">Patient Status: Major Lines</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vital Sign History Chart */}
            <div className="bg-teal-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-teal-800">Vital Sign History Chart</h3>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors">
                  Vital Sign History Chart
                </button>
              </div>
            </div>

            {/* History Records */}
            <div className="bg-teal-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">History Records</h3>
              <div className="bg-white rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left">Category Name</th>
                      <th className="px-3 py-2 text-left">History Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 text-gray-500">No data found</td>
                      <td className="px-3 py-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Medical Sections */}
            {['Diagnosis', 'Lab Test', 'Medicine', 'Nursing Records'].map((section) => (
              <div key={section} className="bg-teal-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-teal-800">{section}</h3>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors">
                      Add
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors">
                      Add/Edit in Grid
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded p-4 text-gray-500 text-center">
                  No data found
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="w-80 bg-white shadow-lg border-l">
          <div className="bg-teal-100 p-4 border-b">
            <h3 className="text-lg font-semibold text-teal-800">Quick Link</h3>
          </div>
          <div className="p-4 space-y-2 max-h-screen overflow-y-auto">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleQuickLinkClick(link.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                  link.highlight ? 'bg-yellow-100 border border-yellow-300' : ''
                }`}
              >
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className={`text-sm ${link.color} font-medium`}>
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate age from date of birth
const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default PatientDashboard;