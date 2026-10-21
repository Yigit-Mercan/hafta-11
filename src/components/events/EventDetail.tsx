import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
}

function EventDetail({ event, onBack }: EventDetailProps) {
  return (
    <div className="event-detail-container">
      <button className="btn secondary" onClick={onBack} style={{ marginBottom: "1rem" }}>
        &larr; Geri Dön
      </button>
      
      <h2>{event.title}</h2>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {event.date} - {event.time}</p>
      <p><strong>Konum:</strong> {event.location}</p>
      <p><strong>Kapasite:</strong> {event.capacity}</p>
      
      <div style={{ marginTop: "1rem" }}>
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
}

export default EventDetail;