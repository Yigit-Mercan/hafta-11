import { useState } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";

interface AddEventProps {
  onAdd: (eventData: Omit<CampusEvent, "id">) => void;
  onCancel: () => void;
}

function AddEvent({ onAdd, onCancel }: AddEventProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Seminer");
  const [capacity, setCapacity] = useState<number>(50);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    if (!title || !date || !location) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }

    onAdd({
      title,
      category,
      capacity: Number(capacity),
      date,
      time,
      location,
      description,
    });
  };

  return (
    <div className="form-container">
      <h2>Yeni Etkinlik Ekle</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Etkinlik Adı:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Kategori:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Kapasite:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Tarih:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Saat:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Konum:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Açıklama:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button type="submit" className="btn">Kaydet</button>
          <button type="button" onClick={onCancel} className="btn secondary">İptal</button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;