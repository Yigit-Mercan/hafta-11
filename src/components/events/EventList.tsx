import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
}

function EventList({ events, onShowDetail }: EventListProps) {
  return (
    <section className="etkinlik-grid">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onShowDetail={onShowDetail} 
        />
      ))}
    </section>
  );
}

export default EventList;