import confetti from "canvas-confetti";

import "./styles.css";

import { useState, useEffect } from "react";


const teams = [
  { id: 1, name: "Cultural Team" },
  { id: 2, name: "Tech Team" },
  { id: 3, name: "Sports Team" },
];


function App() {
  const [events, setEvents] = useState([
  { id: 1, name: "Dance Battle", time: "10:00 AM", team: "Cultural Team" },
  { id: 2, name: "Singing Contest", time: "1:00 PM", team: "Cultural Team" },
  { id: 3, name: "Coding Challenge", time: "3:00 PM", team: "Tech Team" },
]);

  const festTime = new Date("2026-02-26T10:00:00"); // apni fest date daal sakte ho
const [timeLeft, setTimeLeft] = useState("");
const [selectedTeam, setSelectedTeam] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);
const [newEventName, setNewEventName] = useState("");
const [newEventTime, setNewEventTime] = useState("");



useEffect(() => {
  
  const timer = setInterval(() => {
    const now = new Date();
    const diff = festTime - now;

    if (diff <= 0) {
      setTimeLeft("🎉 Fest is LIVE now!");
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(`⏳ Starts in ${days}d ${hours}h ${minutes}m ${seconds}s`);
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const [username, setUsername] = useState("");
  const [registrations, setRegistrations] = useState(() => {
  const saved = localStorage.getItem("festy-registrations");
  return saved ? JSON.parse(saved) : [];
});



  function register(eventName) {
  if (!username) {
    alert("Please enter your name first");
    return;
  }

  setRegistrations([...registrations, { name: username, event: eventName }]);
  setUsername("");

  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.7 },
  });

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const audio = new Audio("/click.mp3");

    audio.play();
  } catch (e) {
    console.log("Audio error:", e);
  }
}


  return (
    
    <div className="bg-lights">
     

    <div className="app">
      

      <h1>🎉 Festy</h1>
      <h3>Select Organizer Team</h3>

<div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
  {teams.map((team) => (
    <button
  key={team.id}
  onClick={() => setSelectedTeam(team)}
  className={`team-btn ${
    selectedTeam?.id === team.id ? "active" : ""
  }`}
>
  {team.name}
</button>

  ))}
</div>

{selectedTeam && (
  
  <p style={{ textAlign: "center" }}>
    ✅ Active Team: {selectedTeam.name}
  </p>
)}
{selectedTeam && (
  <button onClick={() => setIsAdmin(!isAdmin)}>
    {isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
  </button>
)}

{isAdmin && <p style={{ textAlign: "center" }}>🛠 Admin Mode Active</p>}
{isAdmin && selectedTeam && (
  <div style={{ marginTop: 20 }}>
    <h3>➕ Add Event for {selectedTeam.name}</h3>

    <input
      placeholder="Event name"
      value={newEventName}
      onChange={(e) => setNewEventName(e.target.value)}
    />

    <input
      placeholder="Event time (e.g. 4:00 PM)"
      value={newEventTime}
      onChange={(e) => setNewEventTime(e.target.value)}
    />

    <button
      onClick={() => {
        if (!newEventName || !newEventTime) return;

        setEvents([
          ...events,
          {
            id: Date.now(),
            name: newEventName,
            time: newEventTime,
            team: selectedTeam.name,
          },
        ]);

        setNewEventName("");
        setNewEventTime("");
      }}
    >
      Add Event
    </button>
  </div>
)}



      <p>College Fest Management App</p>
      <p style={{ textAlign: "center" }}>{timeLeft}</p>


      <input
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 8, marginBottom: 20 }}
      />

      <h3>Upcoming Events</h3>

    {events
  .filter((event) => !selectedTeam || event.team === selectedTeam.name)
  .map((event) => (

  <div key={event.id} className="event-card">
    <strong>{event.name}</strong> — {event.time}

    <div>
      <button onClick={() => register(event.name)}>
        Register
      </button>
    </div>
  </div>
))}


      <h3>Registrations</h3>

      {registrations.length === 0 && <p>No registrations yet.</p>}

      {registrations.map((r, index) => (
        <div key={index}>
          ✅ {r.name} registered for {r.event}
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
