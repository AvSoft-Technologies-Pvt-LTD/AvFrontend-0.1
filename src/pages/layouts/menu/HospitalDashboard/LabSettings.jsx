import React, { useState } from "react";
import {
  Plus,
  TestTube,
  Settings,
  FileText,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import ReusableModal from "../../../../components/microcomponents/Modal";
import DynamicTable from "../../../../components/microcomponents/DynamicTable";
import TemplateModal from "./TemplateModal";

const LabSettings = () => {
  // Group all state and handlers in a custom hook for brevity
  const useLabSettingsLogic = () => {
    const [activeTab, setActiveTab] = useState("lab-items");
    const [modalState, setModalState] = useState({
      isOpen: false,
      mode: "add",
      data: {},
    });
    const [templateModalState, setTemplateModalState] = useState({
      isOpen: false,
      template: null,
    });

    // Mock Data
    const [labItems, setLabItems] = useState([
      {
        id: 1,
        itemCode: "CBC001",
        testName: "Complete Blood Count",
        category: "Hematology",
        specimenType: "Blood",
        unitPrice: 250,
        status: "Active",
        reportFormat: "Numeric",
      },
      {
        id: 2,
        itemCode: "LFT002",
        testName: "Liver Function Test",
        category: "Biochemistry",
        specimenType: "Blood",
        unitPrice: 450,
        status: "Active",
        reportFormat: "Numeric",
      },
      {
        id: 3,
        itemCode: "URN003",
        testName: "Urine Routine",
        category: "Urology",
        specimenType: "Urine",
        unitPrice: 150,
        status: "Inactive",
        reportFormat: "Text",
      },
    ]);
    const [testParameters, setTestParameters] = useState([
      {
        id: 1,
        seqNo: 1,
        parameterName: "Hemoglobin",
        unitName: "g/dL",
        minValue: 13,
        maxValue: 17,
        lookupValue: "Normal",
        remarks: "Normal range for adults",
        defaultValue: 15,
      },
      {
        id: 2,
        seqNo: 2,
        parameterName: "WBC Count",
        unitName: "10³/L",
        minValue: 4,
        maxValue: 11,
        lookupValue: "Normal",
        remarks: "White blood cell count",
        defaultValue: 7.5,
      },
      {
        id: 3,
        seqNo: 3,
        parameterName: "Platelets",
        unitName: "10³/L",
        minValue: 150,
        maxValue: 400,
        lookupValue: "High",
        remarks: "Platelet count",
        defaultValue: 250,
      },
    ]);
    const [templates, setTemplates] = useState([
      {
        id: 1,
        templateTitle: "Standard CBC Report",
        doctorName: "Dr. Smith Johnson",
        totalItemCount: 12,
        createdDate: "2024-01-15",
        labName: "City Medical Lab",
        labAddress: "123 Health Street, Medical City",
        labContact: "+1-555-0123",
        tests: ["Hemoglobin", "WBC Count", "Platelets", "RBC Count"],
        headerColor: "#0E1630",
        logoUrl:
          "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      },
      {
        id: 2,
        templateTitle: "Comprehensive Metabolic Panel",
        doctorName: "Dr. Emily Davis",
        totalItemCount: 8,
        createdDate: "2024-01-20",
        labName: "Advanced Diagnostics",
        labAddress: "456 Laboratory Ave, Science Park",
        labContact: "+1-555-0456",
        tests: ["Glucose", "Sodium", "Potassium", "Chloride"],
        headerColor: "#01D48C",
        logoUrl:
          "https://images.pexels.com/photos/3786132/pexels-photo-3786132.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      },
    ]);

    // Field Configurations
    const labItemsFields = [
      { name: "itemCode", label: "Item Code", type: "text" },
      { name: "testName", label: "Test Name", type: "text" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "Hematology", label: "Hematology" },
          { value: "Biochemistry", label: "Biochemistry" },
          { value: "Urology", label: "Urology" },
          { value: "Microbiology", label: "Microbiology" },
        ],
      },
      {
        name: "specimenType",
        label: "Specimen Type",
        type: "select",
        options: [
          { value: "Blood", label: "Blood" },
          { value: "Urine", label: "Urine" },
          { value: "Stool", label: "Stool" },
          { value: "Swab", label: "Swab" },
        ],
      },
      { name: "unitPrice", label: "Unit Price", type: "number" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ],
      },
      {
        name: "reportFormat",
        label: "Report Format",
        type: "select",
        options: [
          { value: "Numeric", label: "Numeric" },
          { value: "Text", label: "Text" },
          { value: "Boolean", label: "Boolean" },
        ],
      },
    ];
    const testParametersFields = [
      { name: "seqNo", label: "Sequence No", type: "number" },
      { name: "parameterName", label: "Parameter Name", type: "text" },
      { name: "unitName", label: "Unit Name", type: "text" },
      { name: "minValue", label: "Min Value", type: "number" },
      { name: "maxValue", label: "Max Value", type: "number" },
      {
        name: "lookupValue",
        label: "Lookup Value",
        type: "select",
        options: [
          { value: "Normal", label: "Normal" },
          { value: "High", label: "High" },
          { value: "Low", label: "Low" },
          { value: "Critical", label: "Critical" },
          { value: "Positive", label: "Positive" },
          { value: "Negative", label: "Negative" },
        ],
      },
      { name: "remarks", label: "Remarks", type: "textarea" },
      { name: "defaultValue", label: "Default Value", type: "number" },
    ];
    const templatesFields = [
      { name: "templateTitle", label: "Template Title", type: "text" ,clickable: true},
      { name: "doctorName", label: "Doctor Name", type: "text" },
      { name: "labName", label: "Lab Name", type: "text" },
      { name: "labAddress", label: "Lab Address", type: "textarea" },
      { name: "labContact", label: "Lab Contact", type: "text" },
      { name: "headerColor", label: "Header Color", type: "color" },
      { name: "logoUrl", label: "Logo URL", type: "url" },
      { name: "logoFile", label: "Lab Logo (Upload)", type: "file" },
    ];

    // Filter Configurations
    const uniqueCategories = [...new Set(labItems.map(item => item.category))];
    const uniqueSpecimenTypes = [...new Set(labItems.map(item => item.specimenType))];
    const uniqueUnitPrices = [...new Set(labItems.map(item => item.unitPrice))];
    const uniqueTestNames = [...new Set(labItems.map(item => item.testName))];
    const uniqueItemCodes = [...new Set(labItems.map(item => item.itemCode))];
    const uniqueStatuses = [...new Set(labItems.map(item => item.status))];
    const uniqueReportFormats = [...new Set(labItems.map(item => item.reportFormat))];

    const labItemsFilters = [
      {
        key: "combinedFilter",
        label: "Filter",
        options: labItemsFields
          .filter(field => field.type === "select" && field.options)
          .flatMap(field =>
            field.options.map(opt => ({
              value: opt.value,
              label: opt.label,
            }))
          ),
      },
    ];
    const testParametersFilters = [
      {
        key: "combinedFilter",
        label: "Lookup",
        options: testParametersFields
          .filter(field => field.type === "select" && field.options)
          .flatMap(field =>
            field.options.map(opt => ({
              value: opt.value,
              label: opt.label,
            }))
          ),
      },
    ];
    const templatesFilters = [
      {
        key: "combinedFilter",
        label: "Doctor",
        options: templatesFields
          .filter(field => field.name === "doctorName")
          .flatMap(() =>
            [...new Set(templates.map(t => t.doctorName))].map(name => ({
              value: name,
              label: name,
            }))
          ),
      },
    ];

    // Table Columns
    const statusColors = {
      active: "text-green-600 bg-green-100",
      inactive: "text-red-600 bg-red-100",
    };

    const labItemsColumns = [
      { header: "Item Code", accessor: "itemCode" },
      { header: "Test Name", accessor: "testName" },
      { header: "Category", accessor: "category" },
      { header: "Specimen Type", accessor: "specimenType" },
      {
        header: "Unit Price",
        accessor: "unitPrice",
        cell: (row) => `₹${row.unitPrice}`,
      },
      {
        header: "Status",
        accessor: "status",
        cell: (row) => {
          const key = row.status ? row.status.toLowerCase() : "";
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                statusColors[key] || "text-gray-600 bg-gray-100"
              }`}
            >
              {key.toUpperCase()}
            </span>
          );
        },
      },
      { header: "Report Format", accessor: "reportFormat" },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditItem(row)}
              className="edit-btn flex items-center justify-center hover:bg-blue-100 rounded p-1 transition hover:animate-bounce"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteItem(row)}
              className="delete-btn flex items-center justify-center hover:bg-red-100 rounded p-1 transition hover:animate-bounce"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ];
    const testParametersColumns = [
      { header: "Seq No", accessor: "seqNo" },
      { header: "Parameter Name", accessor: "parameterName" },
      { header: "Unit Name", accessor: "unitName" },
      { header: "Min Value", accessor: "minValue" },
      { header: "Max Value", accessor: "maxValue" },
      { header: "Lookup Value", accessor: "lookupValue" },
      { header: "Remarks", accessor: "remarks" },
      { header: "Default Value", accessor: "defaultValue" },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditParameter(row)}
              className="edit-btn flex items-center justify-center hover:bg-blue-100 rounded p-1 transition hover:animate-bounce"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteParameter(row)}
              className="delete-btn flex items-center justify-center hover:bg-red-100 rounded p-1 transition hover:animate-bounce"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ];
    const templatesColumns = [
      {
        header: "Template Title",
        accessor: "templateTitle",
        cell: (row) => (
          <button
            type="button"
            className="text-[var(--primary-color)] font-semibold hover:text-[var(--accent-color)] underline cursor-pointer"
            onClick={() => setTemplateModalState({ isOpen: true, template: row })}
            title="View Template"
          >
            {row.templateTitle}
          </button>
        ),
      },
      { header: "Doctor Name", accessor: "doctorName" },
      { header: "Total Item Count", accessor: "totalItemCount" },
      { header: "Created Date", accessor: "createdDate" },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditTemplate(row)}
              className="edit-btn flex items-center justify-center hover:bg-blue-100 rounded p-1 transition hover:animate-bounce"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteTemplate(row)}
              className="delete-btn flex items-center justify-center hover:bg-red-100 rounded p-1 transition hover:animate-bounce"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ];

    // Event Handlers
    const handleViewItem = (item) =>
      setModalState({ isOpen: true, mode: "viewProfile", data: item });
    const handleEditItem = (item) =>
      setModalState({ isOpen: true, mode: "edit", data: item });
    const handleDeleteItem = (item) =>
      setModalState({ isOpen: true, mode: "confirmDelete", data: item });
    const handleViewParameter = (parameter) =>
      setModalState({ isOpen: true, mode: "viewProfile", data: parameter });
    const handleEditParameter = (parameter) =>
      setModalState({ isOpen: true, mode: "edit", data: parameter });
    const handleDeleteParameter = (parameter) =>
      setModalState({ isOpen: true, mode: "confirmDelete", data: parameter });
    const handleViewTemplate = (template) =>
      setTemplateModalState({ isOpen: true, template });
    const handleEditTemplate = (template) =>
      setModalState({ isOpen: true, mode: "edit", data: template });
    const handleDeleteTemplate = (template) =>
      setModalState({ isOpen: true, mode: "confirmDelete", data: template });

    const handleSave = (formData) => {
  let updatedFormData = { ...formData };

  if (activeTab === "create-templates" && formData.logoFile) {
    if (formData.logoFile instanceof File) {
      updatedFormData.logoUrl = URL.createObjectURL(formData.logoFile);
    }
  }

  if (activeTab === "lab-items") {
    modalState.mode === "add"
      ? setLabItems([...labItems, { ...formData, id: Date.now() }])
      : setLabItems(
          labItems.map((item) =>
            item.id === modalState.data.id ? { ...item, ...formData } : item
          )
        );
  } else if (activeTab === "test-parameters") {
    modalState.mode === "add"
      ? setTestParameters([
          ...testParameters,
          { ...formData, id: Date.now() },
        ])
      : setTestParameters(
          testParameters.map((param) =>
            param.id === modalState.data.id ? { ...param, ...formData } : param
          )
        );
  } else if (activeTab === "create-templates") {
    modalState.mode === "add"
      ? setTemplates([
          ...templates,
          {
            ...updatedFormData,
            id: Date.now(),
            totalItemCount: 0,
            createdDate: new Date().toISOString().split("T")[0],
          },
        ])
      : setTemplates(
          templates.map((template) =>
            template.id === modalState.data.id
              ? { ...template, ...updatedFormData }
              : template
          )
        );
  }

  // ✅ Use the correct function to close the modal
  closeModal();
};


    const handleDelete = () => {
      if (activeTab === "lab-items")
        setLabItems(labItems.filter((item) => item.id !== modalState.data.id));
      else if (activeTab === "test-parameters")
        setTestParameters(
          testParameters.filter((param) => param.id !== modalState.data.id)
        );
      else if (activeTab === "create-templates")
        setTemplates(
          templates.filter((template) => template.id !== modalState.data.id)
        );
    };

    const closeModal = () =>
      setModalState({ isOpen: false, mode: "add", data: {} });
    const closeTemplateModal = () =>
      setTemplateModalState({ isOpen: false, template: null });

    // View Fields
    const viewFields = [
      { label: "Item Code", key: "itemCode"},
      { label: "Test Name", key: "testName",initialsKey: true, titleKey: true, subtitleKey: true  },
      { label: "Category", key: "category" },
      { label: "Specimen Type", key: "specimenType" },
      { label: "Unit Price", key: "unitPrice" },
      { label: "Status", key: "status" },
      { label: "Report Format", key: "reportFormat" },
    ];
    const parameterViewFields = [
      { label: "Sequence No", key: "seqNo"},
      { label: "Parameter Name", key: "parameterName",initialsKey: true, titleKey: true, subtitleKey: true  },
      { label: "Unit Name", key: "unitName" },
      { label: "Min Value", key: "minValue" },
      { label: "Max Value", key: "maxValue" },
      { label: "Lookup Value", key: "lookupValue" },
      { label: "Remarks", key: "remarks" },
      { label: "Default Value", key: "defaultValue" },
    ];
    const templateViewFields = [
      { label: "Template Title", key: "templateTitle", initialsKey: true, titleKey: true, subtitleKey: true },
      { label: "Doctor Name", key: "doctorName" },
      { label: "Lab Name", key: "labName" },
      { label: "Lab Address", key: "labAddress" },
      { label: "Lab Contact", key: "labContact" },
      { label: "Header Color", key: "headerColor" },
      { label: "Created Date", key: "createdDate" },
    ];

    const tabs = [
      { id: "lab-items", label: "Lab Items", icon: TestTube },
      { id: "test-parameters", label: "Test Parameters", icon: Settings },
      { id: "create-templates", label: "Create Templates", icon: FileText },
    ];

    const getTabContent = () => {
      switch (activeTab) {
        case "lab-items":
          return {
            addButtonText: "Add Lab Item",
            data: labItems,
            columns: labItemsColumns,
            fields: labItemsFields,
            viewFields,
            filters: labItemsFilters,
          };
        case "test-parameters":
          return {
            addButtonText: "Add Parameter",
            data: testParameters,
            columns: testParametersColumns,
            fields: testParametersFields,
            viewFields: parameterViewFields,
            filters: testParametersFilters,
          };
        case "create-templates":
          return {
            addButtonText: "Create Template",
            data: templates,
            columns: templatesColumns,
            fields: templatesFields,
            viewFields: templateViewFields,
            filters: templatesFilters,
          };
        default:
          return null;
      }
    };
    const currentTab = getTabContent();

    return {
      activeTab, setActiveTab, modalState, setModalState, templateModalState, setTemplateModalState,
      labItems, setLabItems, testParameters, setTestParameters, templates, setTemplates,
      labItemsFields, testParametersFields, templatesFields,
      labItemsColumns, testParametersColumns, templatesColumns,
      handleViewItem, handleEditItem, handleDeleteItem,
      handleViewParameter, handleEditParameter, handleDeleteParameter,
      handleViewTemplate, handleEditTemplate, handleDeleteTemplate,
      handleSave, handleDelete, closeModal, closeTemplateModal,
      viewFields, parameterViewFields, templateViewFields, tabs, getTabContent, currentTab
    };
  };

  // Use the custom hook
  const logic = useLabSettingsLogic();

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {logic.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => logic.setActiveTab(tab.id)}
                  className={`btn w-56 h-12 flex items-center gap-2 justify-center transition-all duration-200
          ${logic.activeTab === tab.id
            ? 'btn-primary scale-105 shadow-lg'
            : 'btn-secondary hover:scale-105 hover:shadow-md hover:bg-[--primary-color]/10'
          }`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                logic.setModalState({ isOpen: true, mode: "add", data: {} })
              }
              className="btn btn-primary ml-4"
            >
              <Plus size={20} />
              {logic.currentTab.addButtonText}
            </button>
          </div>
        </div>
        <div>
          <div>
            <DynamicTable 
              columns={logic.currentTab.columns} 
              data={logic.currentTab.data}
              onCellClick={(row, col) => {
                if (logic.activeTab === "create-templates" && col.accessor === "templateTitle") {
                  logic.setTemplateModalState({ isOpen: true, template: row });
                }
              }}
              filters={logic.currentTab.filters || []}
            />
          </div>
        </div>
      </div>
      <ReusableModal
        isOpen={logic.modalState.isOpen}
        onClose={logic.closeModal}
        mode={logic.modalState.mode}
        title={
          logic.modalState.mode === "add"
            ? `Add ${
                logic.activeTab === "lab-items"
                  ? "Lab Item"
                  : logic.activeTab === "test-parameters"
                  ? "Parameter"
                  : "Template"
              }`
            : logic.modalState.mode === "edit"
            ? `Edit ${
                logic.activeTab === "lab-items"
                  ? "Lab Item"
                  : logic.activeTab === "test-parameters"
                  ? "Parameter"
                  : "Template"
              }`
            : logic.modalState.mode === "viewProfile"
            ? `${
                logic.activeTab === "lab-items"
                  ? "Lab Item"
                  : logic.activeTab === "test-parameters"
                  ? "Parameter"
                  : "Template"
              } Details`
            : "Confirm Delete"
        }
        data={logic.modalState.data}
        fields={logic.currentTab.fields}
        viewFields={logic.currentTab.viewFields}
        onSave={logic.handleSave}
        onDelete={logic.handleDelete}
        size="lg"
      />
      <TemplateModal
        isOpen={logic.templateModalState.isOpen}
        onClose={logic.closeTemplateModal}
        template={logic.templateModalState.template}
      />
    </div>
  );
};

export default LabSettings;
