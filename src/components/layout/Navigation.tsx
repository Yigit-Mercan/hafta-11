import React from "react";

type PageName = "home" | "events" | "add" | "update";

interface NavigationProps {
  onMenuClick: (e: React.MouseEvent<HTMLAnchorElement>, targetPage: PageName) => void;
}

function Navigation({ onMenuClick }: NavigationProps) {
  return (
    <nav style={{ padding: "1rem", background: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "1.5rem", margin: 0, padding: 0 }}>
        <li>
          <a href="#" onClick={(e) => onMenuClick(e, "home")} style={{ textDecoration: "none", color: "#800040", fontWeight: "bold" }}>
            Ana Sayfa
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => onMenuClick(e, "events")} style={{ textDecoration: "none", color: "#800040", fontWeight: "bold" }}>
            Tüm Etkinlikler
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => onMenuClick(e, "add")} style={{ textDecoration: "none", color: "#28a745", fontWeight: "bold" }}>
            + Etkinlik Ekle
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;