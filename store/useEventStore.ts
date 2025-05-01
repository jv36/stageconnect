import { create } from 'zustand';

type EventData = {
  id: string;
  image: string;
  artist: string;
  location: string;
  date: string;
};

type Store = {
  selectedEvent: EventData | null;
  setSelectedEvent: (data: EventData) => void;
};

export const useEventStore = create<Store>((set) => ({
  selectedEvent: null,
  setSelectedEvent: (data) => set({ selectedEvent: data }),
}));
