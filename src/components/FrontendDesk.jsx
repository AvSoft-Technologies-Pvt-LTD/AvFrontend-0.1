import React, { useState } from "react";
import {
  Clock as UserClock, Users, Ticket, Calendar, Clock,
  TrendingUp, Activity, Building, Phone, Mail, MapPin,
  Award, Star, BarChart3, Target, X
} from "lucide-react";
import DynamicTable from "./microcomponents/DynamicTable";

const sampleLogins = [
  { id:1,staffName:"John Doe",employeeId:"EMP001",department:"Reception",position:"Senior Receptionist",loginDate:"2025-01-16",loginTime:"09:15 AM",logoutTime:"05:30 PM",workingHours:"8h 15m",tokensGenerated:12,patientsServed:45,status:"Active",shift:"Morning",location:"Main Desk",phone:"+1 234-567-8901",email:"john.doe@hospital.com",lastLogin:"2025-01-16 09:15:00",totalSessions:156,avgTokensPerDay:11.5,efficiency:92,rating:4.8 },
  { id:2,staffName:"Jane Smith",employeeId:"EMP002",department:"Reception",position:"Receptionist",loginDate:"2025-01-16",loginTime:"10:05 AM",logoutTime:"06:00 PM",workingHours:"7h 55m",tokensGenerated:8,patientsServed:32,status:"Active",shift:"Morning",location:"Information Desk",phone:"+1 234-567-8902",email:"jane.smith@hospital.com",lastLogin:"2025-01-16 10:05:00",totalSessions:89,avgTokensPerDay:9.2,efficiency:88,rating:4.6 },
  { id:3,staffName:"Mike Johnson",employeeId:"EMP003",department:"Front Desk",position:"Front Desk Supervisor",loginDate:"2025-01-15",loginTime:"08:50 AM",logoutTime:"05:00 PM",workingHours:"8h 10m",tokensGenerated:15,patientsServed:58,status:"Inactive",shift:"Morning",location:"Main Desk",phone:"+1 234-567-8903",email:"mike.johnson@hospital.com",lastLogin:"2025-01-15 08:50:00",totalSessions:234,avgTokensPerDay:13.8,efficiency:95,rating:4.9 },
  { id:4,staffName:"Sarah Wilson",employeeId:"EMP004",department:"Reception",position:"Junior Receptionist",loginDate:"2025-01-15",loginTime:"09:20 AM",logoutTime:"05:10 PM",workingHours:"7h 50m",tokensGenerated:10,patientsServed:38,status:"Active",shift:"Morning",location:"Appointment Desk",phone:"+1 234-567-8904",email:"sarah.wilson@hospital.com",lastLogin:"2025-01-15 09:20:00",totalSessions:67,avgTokensPerDay:8.9,efficiency:85,rating:4.4 },
  { id:5,staffName:"David Brown",employeeId:"EMP005",department:"Front Desk",position:"Night Shift Coordinator",loginDate:"2025-01-14",loginTime:"09:00 AM",logoutTime:"05:45 PM",workingHours:"8h 45m",tokensGenerated:18,patientsServed:62,status:"Active",shift:"Night",location:"Emergency Desk",phone:"+1 234-567-8905",email:"david.brown@hospital.com",lastLogin:"2025-01-14 09:00:00",totalSessions:178,avgTokensPerDay:15.2,efficiency:97,rating:4.9 },
  { id:6,staffName:"Emily Davis",employeeId:"EMP006",department:"Reception",position:"Senior Receptionist",loginDate:"2025-01-14",loginTime:"08:30 AM",logoutTime:"04:30 PM",workingHours:"8h 00m",tokensGenerated:14,patientsServed:51,status:"Active",shift:"Morning",location:"VIP Desk",phone:"+1 234-567-8906",email:"emily.davis@hospital.com",lastLogin:"2025-01-14 08:30:00",totalSessions:145,avgTokensPerDay:12.3,efficiency:91,rating:4.7 }
];

// Sample monthly data for each employee
const monthlyData = {
  1: { // John Doe
    month: "January 2025",
    totalDays: 20,
    presentDays: 19,
    totalHours: "156h 30m",
    avgDailyHours: "8.2h",
    totalTokens: 240,
    totalPatients: 890,
    efficiency: 92,
    rating: 4.8,
    overtimeHours: "12h 30m",
    lateArrivals: 2,
    earlyDepartures: 1,
    weeklyStats: [
      { week: "Week 1", hours: "40h 15m", tokens: 60, patients: 225, efficiency: 90 },
      { week: "Week 2", hours: "39h 45m", tokens: 58, patients: 210, efficiency: 88 },
      { week: "Week 3", hours: "38h 30m", tokens: 65, patients: 245, efficiency: 95 },
      { week: "Week 4", hours: "38h 00m", tokens: 57, patients: 210, efficiency: 94 }
    ]
  },
  2: { // Jane Smith
    month: "January 2025",
    totalDays: 20,
    presentDays: 18,
    totalHours: "142h 15m",
    avgDailyHours: "7.9h",
    totalTokens: 185,
    totalPatients: 640,
    efficiency: 88,
    rating: 4.6,
    overtimeHours: "6h 15m",
    lateArrivals: 3,
    earlyDepartures: 2,
    weeklyStats: [
      { week: "Week 1", hours: "38h 30m", tokens: 48, patients: 165, efficiency: 85 },
      { week: "Week 2", hours: "35h 45m", tokens: 42, patients: 155, efficiency: 87 },
      { week: "Week 3", hours: "36h 00m", tokens: 50, patients: 170, efficiency: 90 },
      { week: "Week 4", hours: "32h 00m", tokens: 45, patients: 150, efficiency: 89 }
    ]
  },
  3: { // Mike Johnson
    month: "January 2025",
    totalDays: 20,
    presentDays: 20,
    totalHours: "164h 00m",
    avgDailyHours: "8.2h",
    totalTokens: 310,
    totalPatients: 1160,
    efficiency: 95,
    rating: 4.9,
    overtimeHours: "24h 00m",
    lateArrivals: 0,
    earlyDepartures: 0,
    weeklyStats: [
      { week: "Week 1", hours: "42h 00m", tokens: 80, patients: 295, efficiency: 96 },
      { week: "Week 2", hours: "41h 30m", tokens: 78, patients: 290, efficiency: 94 },
      { week: "Week 3", hours: "40h 30m", tokens: 82, patients: 300, efficiency: 97 },
      { week: "Week 4", hours: "40h 00m", tokens: 70, patients: 275, efficiency: 93 }
    ]
  },
  4: { // Sarah Wilson
    month: "January 2025",
    totalDays: 20,
    presentDays: 17,
    totalHours: "133h 20m",
    avgDailyHours: "7.8h",
    totalTokens: 170,
    totalPatients: 570,
    efficiency: 85,
    rating: 4.4,
    overtimeHours: "3h 20m",
    lateArrivals: 4,
    earlyDepartures: 3,
    weeklyStats: [
      { week: "Week 1", hours: "35h 00m", tokens: 45, patients: 150, efficiency: 82 },
      { week: "Week 2", hours: "32h 30m", tokens: 40, patients: 135, efficiency: 84 },
      { week: "Week 3", hours: "34h 50m", tokens: 48, patients: 155, efficiency: 88 },
      { week: "Week 4", hours: "31h 00m", tokens: 37, patients: 130, efficiency: 86 }
    ]
  },
  5: { // David Brown
    month: "January 2025",
    totalDays: 20,
    presentDays: 19,
    totalHours: "167h 15m",
    avgDailyHours: "8.8h",
    totalTokens: 342,
    totalPatients: 1240,
    efficiency: 97,
    rating: 4.9,
    overtimeHours: "27h 15m",
    lateArrivals: 1,
    earlyDepartures: 0,
    weeklyStats: [
      { week: "Week 1", hours: "43h 45m", tokens: 88, patients: 320, efficiency: 98 },
      { week: "Week 2", hours: "42h 30m", tokens: 85, patients: 310, efficiency: 96 },
      { week: "Week 3", hours: "41h 00m", tokens: 90, patients: 325, efficiency: 98 },
      { week: "Week 4", hours: "40h 00m", tokens: 79, patients: 285, efficiency: 96 }
    ]
  },
  6: { // Emily Davis
    month: "January 2025",
    totalDays: 20,
    presentDays: 18,
    totalHours: "144h 00m",
    avgDailyHours: "8.0h",
    totalTokens: 252,
    totalPatients: 918,
    efficiency: 91,
    rating: 4.7,
    overtimeHours: "8h 00m",
    lateArrivals: 2,
    earlyDepartures: 1,
    weeklyStats: [
      { week: "Week 1", hours: "40h 00m", tokens: 65, patients: 240, efficiency: 90 },
      { week: "Week 2", hours: "36h 00m", tokens: 60, patients: 225, efficiency: 89 },
      { week: "Week 3", hours: "36h 00m", tokens: 68, patients: 245, efficiency: 93 },
      { week: "Week 4", hours: "32h 00m", tokens: 59, patients: 208, efficiency: 92 }
    ]
  }
};

const day = d => new Date(d).toLocaleDateString("en-US",{weekday:"long"});
const calcStats = d=>{
  let uniq=new Set(d.map(e=>e.staffName)).size, tokens=d.reduce((a,e)=>a+e.tokensGenerated,0),
  pats=d.reduce((a,e)=>a+e.patientsServed,0), avgT=Math.round(tokens/uniq),
  avgH=Math.round(d.reduce((a,e)=>a+parseFloat(e.workingHours),0)/d.length*10)/10,
  eff=Math.round(d.reduce((a,e)=>a+e.efficiency,0)/d.length), active=d.filter(e=>e.status==="Active").length;
  return {uniq,tokens,pats,avgT,avgH,eff,active,total:d.length};
};

const cols=[
  {
    header:"Staff",
    accessor:"staffName",
    clickable: true,
    cell:r=><div className="flex gap-3 items-center">
      <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white">{r.staffName.split(' ').map(n=>n[0]).join('')}</div>
      <div><div className="font-semibold text-[var(--primary-color)] cursor-pointer hover:text-[var(--accent-color)]">{r.staffName}</div><div className="text-xs text-gray-500">{r.employeeId} • {r.position}</div></div>
    </div>
  },
  {header:"Time In/Out",accessor:"loginTime",cell:r=><div className="space-y-1"><div className="flex gap-1 text-green-600"><Clock className="w-3 h-3"/>{r.loginTime}</div><div className="flex gap-1 text-red-600"><Clock className="w-3 h-3"/>{r.logoutTime}</div></div>},
  {header:"Tokens",accessor:"tokensGenerated",cell:r=><div className="flex gap-2 items-center"><Ticket className="w-4 h-4 text-[var(--primary-color)]"/>{r.tokensGenerated}</div>},
  {header:"Patients",accessor:"patientsServed",cell:r=><div className="flex gap-2 items-center"><Users className="w-4 h-4 text-[var(--accent-color)]"/>{r.patientsServed}</div>},
  {header:"Status",accessor:"status",cell:r=><div className="space-y-1"><span className={`status-badge ${r.status==="Active"?"status-active":"status-inactive"}`}>{r.status}</span><div className="text-xs">{r.shift} Shift</div></div>}
];

const filters=[
  {key:"status",label:"Status",options:[{value:"Active",label:"Active"},{value:"Inactive",label:"Inactive"}]},
  {key:"shift",label:"Shift",options:[{value:"Morning",label:"Morning"},{value:"Night",label:"Night"}]},
  {key:"location",label:"Location",options:[{value:"Main Desk",label:"Main Desk"},{value:"VIP Desk",label:"VIP Desk"}]}
];

export default function FrontDeskLoginReport(){
  const [animated,setAnim]=useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const stats=calcStats(sampleLogins);

  const click=i=>{setAnim(p=>[...p,i]);setTimeout(()=>setAnim(p=>p.filter(x=>x!==i)),700);}

  const handleCellClick = (row, col) => {
    if (col.accessor === "staffName") {
      setSelectedEmployee(row);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const Stat=({icon:Icon,lbl,val,sub,col,idx})=>(
    <div className={`card-stat ${col} cursor-pointer ${animated.includes(idx)?"card-animate-pulse":""}`} onClick={()=>click(idx)}>
      <div className="flex justify-between">
        <div>
          <p className="card-stat-label">{lbl}</p>
          <p className="card-stat-count">{val}</p>
          {sub && <p className="text-xs text-gray-500">{sub}</p>}
        </div>
        <div className={`card-icon ${col==="card-border-primary"?"card-icon-primary":"card-icon-accent"}`}>
          <Icon className="w-6 h-6 text-white"/>
        </div>
      </div>
    </div>
  );

  const exportCSV = (d) => {
    let headers = ["Staff","EmpID","Date","In","Out","Tokens","Patients","Status","Shift"];
    let csv = [
      headers.join(","),
      ...d.map(r=>[
        r.staffName,r.employeeId,r.loginDate,r.loginTime,r.logoutTime,
        r.tokensGenerated,r.patientsServed,r.status,r.shift
      ].join(","))
    ].join("\n");
    let blob = new Blob([csv],{type:"text/csv"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `front-desk-report-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen animate-fadeIn">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="h2-heading flex gap-3 items-center">
            <UserClock className="text-[var(--primary-color)] w-8 h-8"/>
            <span className="shimmer-text">Front Desk Login Report</span>
          </h1>
          <p className="paragraph">Monitor staff logins & performance (Click on staff name for detailed view)</p>
        </div>

        {/* Standalone Export Button */}
        <button
          onClick={() => exportCSV(sampleLogins)}
          className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Stat icon={Users} lbl="Active Staff" val={stats.active} sub={`${stats.uniq} total`} col="card-border-primary" idx={0}/>
        <Stat icon={Clock} lbl="Login Sessions" val={stats.total} sub={`Avg ${stats.avgH}h`} col="card-border-accent" idx={1}/>
        <Stat icon={Ticket} lbl="Tokens" val={stats.tokens} sub={`Avg ${stats.avgT}/staff`} col="card-border-primary" idx={2}/>
        <Stat icon={TrendingUp} lbl="Patients Served" val={stats.pats} sub={`${stats.eff}% efficiency`} col="card-border-accent" idx={3}/>
      </div>

      {/* Dynamic Table */}
      <div className="rounded-lg animate-slideUp">
        <DynamicTable
          title="Staff Login Records"
          columns={cols}
          data={sampleLogins}
          filters={filters}
          onCellClick={handleCellClick}
          showExport={false}
        />
      </div>

      {/* Employee Details Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto modal-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[var(--primary-color)] text-white p-6 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedEmployee.staffName.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedEmployee.staffName}</h2>
                  <p className="text-gray-200">{selectedEmployee.employeeId} • {selectedEmployee.position}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6"/>
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="detail-item primary">
                  <div className="detail-label">Department</div>
                  <div className="detail-value flex items-center gap-2">
                    <Building className="w-4 h-4"/>
                    {selectedEmployee.department}
                  </div>
                </div>
                <div className="detail-item accent">
                  <div className="detail-label">Position</div>
                  <div className="detail-value flex items-center gap-2">
                    <Award className="w-4 h-4"/>
                    {selectedEmployee.position}
                  </div>
                </div>
                <div className="detail-item primary">
                  <div className="detail-label">Location</div>
                  <div className="detail-value flex items-center gap-2">
                    <MapPin className="w-4 h-4"/>
                    {selectedEmployee.location}
                  </div>
                </div>
                <div className="detail-item accent">
                  <div className="detail-label">Phone</div>
                  <div className="detail-value flex items-center gap-2">
                    <Phone className="w-4 h-4"/>
                    {selectedEmployee.phone}
                  </div>
                </div>
                <div className="detail-item primary">
                  <div className="detail-label">Email</div>
                  <div className="detail-value flex items-center gap-2">
                    <Mail className="w-4 h-4"/>
                    {selectedEmployee.email}
                  </div>
                </div>
                <div className="detail-item accent">
                  <div className="detail-label">Rating</div>
                  <div className="detail-value flex items-center gap-2">
                    <Star className="w-4 h-4"/>
                    {selectedEmployee.rating}/5.0
                  </div>
                </div>
              </div>

              {/* Today's Performance */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5"/>
                  Today's Performance ({selectedEmployee.loginDate})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                    <div className="text-sm text-gray-600">Login Time</div>
                    <div className="text-lg font-semibold text-green-600">{selectedEmployee.loginTime}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <div className="text-sm text-gray-600">Logout Time</div>
                    <div className="text-lg font-semibold text-red-600">{selectedEmployee.logoutTime}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="text-sm text-gray-600">Working Hours</div>
                    <div className="text-lg font-semibold text-blue-600">{selectedEmployee.workingHours}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--accent-color)]">
                    <div className="text-sm text-gray-600">Efficiency</div>
                    <div className="text-lg font-semibold text-[var(--accent-color)]">{selectedEmployee.efficiency}%</div>
                  </div>
                </div>
              </div>

              {/* Monthly Summary */}
              {monthlyData[selectedEmployee.id] && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5"/>
                    Monthly Summary - {monthlyData[selectedEmployee.id].month}
                  </h3>
                  
                  {/* Monthly Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--primary-color)]">
                      <div className="text-sm text-gray-600">Attendance</div>
                      <div className="text-lg font-semibold text-[var(--primary-color)]">
                        {monthlyData[selectedEmployee.id].presentDays}/{monthlyData[selectedEmployee.id].totalDays} days
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--accent-color)]">
                      <div className="text-sm text-gray-600">Total Hours</div>
                      <div className="text-lg font-semibold text-[var(--accent-color)]">
                        {monthlyData[selectedEmployee.id].totalHours}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                      <div className="text-sm text-gray-600">Total Tokens</div>
                      <div className="text-lg font-semibold text-purple-600">
                        {monthlyData[selectedEmployee.id].totalTokens}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                      <div className="text-sm text-gray-600">Total Patients</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {monthlyData[selectedEmployee.id].totalPatients}
                      </div>
                    </div>
                  </div>

                  {/* Additional Monthly Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Avg Daily Hours</div>
                      <div className="text-lg font-semibold text-[var(--primary-color)]">
                        {monthlyData[selectedEmployee.id].avgDailyHours}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Overtime Hours</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {monthlyData[selectedEmployee.id].overtimeHours}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Monthly Efficiency</div>
                      <div className="text-lg font-semibold text-[var(--accent-color)]">
                        {monthlyData[selectedEmployee.id].efficiency}%
                      </div>
                    </div>
                  </div>

                  {/* Attendance Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Late Arrivals</div>
                      <div className="text-lg font-semibold text-red-600">
                        {monthlyData[selectedEmployee.id].lateArrivals} times
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Early Departures</div>
                      <div className="text-lg font-semibold text-red-600">
                        {monthlyData[selectedEmployee.id].earlyDepartures} times
                      </div>
                    </div>
                  </div>

                  {/* Weekly Breakdown */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--primary-color)] mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4"/>
                      Weekly Breakdown
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Week</th>
                            <th className="text-left p-2">Hours</th>
                            <th className="text-left p-2">Tokens</th>
                            <th className="text-left p-2">Patients</th>
                            <th className="text-left p-2">Efficiency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {monthlyData[selectedEmployee.id].weeklyStats.map((week, idx) => (
                            <tr key={idx} className="border-b even:bg-gray-50">
                              <td className="p-2 font-medium">{week.week}</td>
                              <td className="p-2">{week.hours}</td>
                              <td className="p-2">{week.tokens}</td>
                              <td className="p-2">{week.patients}</td>
                              <td className="p-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  week.efficiency >= 95 ? 'bg-green-100 text-green-800' :
                                  week.efficiency >= 90 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {week.efficiency}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}