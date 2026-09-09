export interface CalendarEvent {
  id: number;
  date: string;
  outfitId: number;
  note?: string;
}

export interface CalendarOutfit extends CalendarEvent {
  outfitName: string;
  image: string;
  occasion?: string;
}