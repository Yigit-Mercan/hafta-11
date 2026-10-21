import { useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import AddEvent from "./components/events/AddEvent";
import EventDetail from "./components/events/EventDetail";

function App() {
  const [page, setPage] = useState<"home" | "events" | "add" | "update" | "detail">("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Örnek etkinlikler listesi
  const [events, setEvents] = useState<CampusEvent[]>([
    {
      id: "1",
      title: "Kariyer Günleri 2026",
      category: "Seminer",
      capacity: 120,
      date: "2026-05-15",
      time: "14:00",
      location: "Konferans Salonu",
      description: "Sektörün öncü isimleriyle kariyer söyleşisi.",
    },
    {
      id: "2",
      title: "React ile Web Geliştirme Atölyesi",
      category: "Atölye",
      capacity: 40,
      date: "2026-05-20",
      time: "10:00",
      location: "Bilgisayar Lab 1",
      description: "Sıfırdan modern web uygulamaları geliştirelim.",
    },
  ]);

  function go(next: "home" | "events" | "add" | "update" | "detail", id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function handleMenuClick(e: React.MouseEvent<HTMLAnchorElement>, targetPage: "home" | "events" | "add" | "update") {
    e.preventDefault();
    go(targetPage);
  }

  // Yeni etkinlik ekleme fonksiyonu
  function handleAddEvent(newEventData: Omit<CampusEvent, "id">) {
    const newEvent: CampusEvent = {
      id: String(Date.now()),
      ...newEventData,
    };
    setEvents([...events, newEvent]);
    setPage("home");
  }

  // Arama ve Kategori filtreleme mantığı
  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === "" || ev.category === category;
    return matchesSearch && matchesCategory;
  });

  // Detay sayfası için seçilen etkinliği bulma
  const selectedEvent = events.find((ev) => ev.id === selectedId);

  return (
    <div className="app-container">
      {/* Üst Menü Bileşeni */}
      <Navigation onMenuClick={handleMenuClick} />

      {/* Arama Çubuğu (Her sayfada aktif ve yazılabilir) */}
      <div style={{ padding: "1.5rem 2rem 0 2rem" }}>
        <input 
          type="text" 
          placeholder="Etkinlik ara..." 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)} 
          style={{ 
            padding: "0.7rem", 
            width: "100%", 
            maxWidth: "400px", 
            display: "block", 
            borderRadius: "6px", 
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />
      </div>

      <main style={{ padding: "2rem" }}>
        {/* ANA SAYFA */}
        {page === "home" && (
          <div>
            <h1>Kampüs Etkinliklerine Hoş Geldiniz</h1>
            <EventList 
              events={filteredEvents} 
              onShowDetail={(id) => go("detail", id)} 
            />
          </div>
        )}

        {/* TÜM ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <div>
            <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button onClick={() => setCategory("")} className={`btn ${category === "" ? "" : "secondary"}`}>Tümü</button>
              <button onClick={() => setCategory("Seminer")} className={`btn ${category === "Seminer" ? "" : "secondary"}`}>Seminer</button>
              <button onClick={() => setCategory("Atölye")} className={`btn ${category === "Atölye" ? "" : "secondary"}`}>Atölye</button>
              <button onClick={() => setCategory("Söyleşi")} className={`btn ${category === "Söyleşi" ? "" : "secondary"}`}>Söyleşi</button>
              <button onClick={() => setCategory("Yarışma")} className={`btn ${category === "Yarışma" ? "" : "secondary"}`}>Yarışma</button>
            </div>

            <EventList 
              events={filteredEvents} 
              onShowDetail={(id) => go("detail", id)} 
            />
          </div>
        )}

        {/* YENİ ETKİNLİK EKLEME SAYFASI */}
        {(page === "add" || page === "update") && (
          <AddEvent 
            onAdd={handleAddEvent} 
            onCancel={() => setPage("home")} 
          />
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <div>
            {selectedEvent ? (
              <EventDetail 
                event={selectedEvent} 
                onBack={() => setPage("home")} 
              />
            ) : (
              <div style={{ border: "2px solid #e74c3c", padding: "1.5rem", borderRadius: "8px", color: "#e74c3c" }}>
                <p>{selectedId} numaralı bir etkinlik yok.</p>
                <button className="btn" onClick={() => setPage("home")} style={{ marginTop: "1rem" }}>Ana Sayfaya Dön</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;