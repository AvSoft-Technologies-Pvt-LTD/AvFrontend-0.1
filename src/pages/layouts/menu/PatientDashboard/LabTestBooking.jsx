import { useState } from 'react';
import LabTests from './LabTests';
import TestDetails from './TestDetails';
import LabSelection from './LabSelection';
import Appointment from './Appointment';
import Payment from './Payment';
import TrackAppointment from './TrackAppointment';

function LabTestBooking() {
  const [currentComponent, setCurrentComponent] = useState('LabTests');
  const [testId, setTestId] = useState(null);
  const [labId, setLabId] = useState(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'LabTests':
        return <LabTests onSelectTest={(id) => { setTestId(id); setCurrentComponent('TestDetails'); }} />;
      case 'TestDetails':
        return <TestDetails testId={testId} onSelectLab={(id) => { setLabId(id); setCurrentComponent('LabSelection'); }} />;
      case 'LabSelection':
        return <LabSelection testId={testId} onSelectAppointment={(id) => { setLabId(id); setCurrentComponent('Appointment'); }} />;
      case 'Appointment':
        return <Appointment labId={labId} onProceedToPayment={() => setCurrentComponent('Payment')} />;
      case 'Payment':
        return <Payment onTrackAppointment={() => setCurrentComponent('TrackAppointment')} />;
      case 'TrackAppointment':
        return <TrackAppointment />;
      default:
        return <LabTests onSelectTest={(id) => { setTestId(id); setCurrentComponent('TestDetails'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {renderComponent()}
      </main>
    </div>
  );
}

export default LabTestBooking;