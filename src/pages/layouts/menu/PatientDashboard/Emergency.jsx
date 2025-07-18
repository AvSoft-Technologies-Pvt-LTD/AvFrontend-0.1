import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { 
  Ambulance, Activity, Heart, HeartPulse, Cylinder, Bed, 
  Settings as Lungs, Armchair as Wheelchair, ActivitySquare, 
  Zap, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react';

const Emergency = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/5f59abdc-8588-4e8b-a343-14a3abd79a7e');
        setEmergencyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
    
      }
    };
    fetchData();
  }, []);

  const getIcon = (iconName, size = 20) => {
    const icons = { 
      Activity: <Activity size={size} />, 
      Ambulance: <Ambulance size={size} />, 
      Heart: <Heart size={size} />, 
      HeartPulse: <HeartPulse size={size} />, 
      Cylinder: <Cylinder size={size} />, 
      Bed: <Bed size={size} />, 
      Lungs: <Lungs size={size} />, 
      Wheelchair: <Wheelchair size={size} />, 
      ActivitySquare: <ActivitySquare size={size} />, 
      Zap: <Zap size={size} /> 
    };
    return icons[iconName] || <Activity size={size} />;
  };

  const handleEmergencyClick = () => {
    alert('Connecting...');
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="relative top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-4 z-[1000] w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setCurrentMonth(prev => addDays(prev, -30))} 
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium">{format(currentMonth, 'MMMM yyyy')}</span>
          <button 
            onClick={() => setCurrentMonth(prev => addDays(prev, 30))} 
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">{day}</div>
          ))}
          {days.map(day => (
            <button 
              key={day.toString()} 
              onClick={() => { setSelectedDate(day); setShowCalendar(false); }} 
              className={`p-2 text-sm rounded hover:bg-blue-50 ${isSameDay(day, selectedDate) ? 'bg-yellow-500 text-white' : ''}`}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>
        <button 
          onClick={() => { setSelectedDate(new Date()); setShowCalendar(false); }} 
          className="mt-2 w-full py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Today
        </button>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Ambulance Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyData?.ambulanceTypes.map(type => (
                  <div 
                    key={type.id} 
                    className={`border rounded-lg p-4 cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-3 ${selectedType === type.id ? 'border-yellow-500 bg-blue-50' : 'border-gray-200'}`} 
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="p-2 rounded-full bg-blue-100 text-[#0E1630]">
                      <Ambulance size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyData?.categories.map(category => (
                  <div 
                    key={category.id} 
                    className={`border rounded-lg p-4 cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-3 ${selectedCategory === category.id ? 'border-yellow-500 bg-blue-50' : 'border-gray-200'}`} 
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="p-2 rounded-full bg-blue-100 text-[#0E1630]">
                      {getIcon(category.icon)}
                    </div>
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Equipment Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyData?.equipment.map(item => (
                  <div 
                    key={item.id} 
                    className={`border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2 ${selectedEquipment.includes(item.id) ? 'border-yellow-500 bg-blue-50' : 'border-gray-200'}`} 
                    onClick={() => setSelectedEquipment(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                  >
                    <div className="p-1.5 rounded-full bg-blue-100 text-[#0E1630]">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <select 
                  value={pickupLocation} 
                  onChange={e => setPickupLocation(e.target.value)} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2"
                >
                  <option value="">Select pickup location</option>
                  {emergencyData?.locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
                <select 
                  value={dropLocation} 
                  onChange={e => setDropLocation(e.target.value)} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2"
                >
                  <option value="">Select drop location</option>
                  {emergencyData?.locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Date</h3>
              <div className="relative inline-block w-full">
                <div 
                  className="border rounded-md p-2 cursor-pointer flex items-center justify-between" 
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span>{format(selectedDate, 'dd/MM/yyyy')}</span>
                  <ChevronRight size={20} />
                </div>
                {showCalendar && renderCalendar()}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Confirm Booking Details</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ambulance Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{emergencyData?.ambulanceTypes.find(t => t.id === selectedType)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{emergencyData?.categories.find(c => c.id === selectedCategory)?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Equipment</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEquipment.map(eqId => {
                    const equipment = emergencyData?.equipment.find(e => e.id === eqId);
                    return equipment ? (
                      <div 
                        key={eqId} 
                        className="bg-blue-50 text-yellow-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {getIcon(equipment.icon, 16)}
                        <span>{equipment.name}</span>
                      </div>
                    ) : null;
                  })}
                  {selectedEquipment.length === 0 && <p className="text-sm text-gray-500">No equipment selected</p>}
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">{emergencyData?.locations.find(l => l.id === pickupLocation)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop</p>
                    <p className="font-medium">{emergencyData?.locations.find(l => l.id === dropLocation)?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Schedule</h4>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{format(selectedDate, 'dd/MM/yyyy')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                By submitting, you will be connected to our call center for final confirmation and payment processing.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        ambulanceType: selectedType,
        category: selectedCategory,
        equipment: selectedEquipment,
        pickupLocation,
        dropLocation,
        date: format(selectedDate, 'yyyy-MM-dd')
      };

      await axios.post('https://mocki.io/v1/20345d29-5a36-4fcd-9c2e-018fca665549', bookingData);
      alert('Connecting....');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Connecting....');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#0E1630] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Ambulance className="text-white" size={24} />
            <div>
              <h1 className="text-xl font-semibold text-white">Ambulance Booking</h1>
              <p className="text-blue-100 text-sm">Book an ambulance from AV Swasthya's trusted network</p>
            </div>
          </div>
          <button 
            onClick={handleEmergencyClick}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
          >
            <AlertCircle size={18} />
            <span className="hidden sm:inline">Emergency</span>
          </button>
        </div>
        
        <div className="px-6 py-4 border-b">
          <div className="flex justify-center items-center w-full">
            {['Details', 'Confirm'].map((step, index) => (
              <div key={index} className="flex flex-col items-center" style={{ width: '50%' }}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 ${
                  currentStep === index 
                    ? 'bg-[#0E1630] text-white' 
                    : currentStep > index 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white text-gray-400 border border-gray-300'
                }`}>
                  {currentStep > index ? <CheckCircle2 size={20} /> : <span>{index + 1}</span>}
                </div>
                <p className={`text-xs ${
                  currentStep === index || currentStep > index 
                    ? 'text-[#0E1630] font-medium' 
                    : 'text-gray-500'
                }`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-6">{renderStep()}</div>
        
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)} 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Back
            </button>
          )}
          <button 
            onClick={() => { if (currentStep === 1) handleSubmit(); else setCurrentStep(prev => prev + 1); }} 
            className={`${currentStep === 0 ? 'ml-auto' : ''} px-6 py-2 bg-[#0E1630] text-white rounded-md hover:bg-yellow-500 transition-colors duration-200`}
          >
            {currentStep === 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emergency;