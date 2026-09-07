export type OutfitTag = 'sports' | 'date' | 'school' | 'work' | 'event';

export interface Outfit {
  id: number;
  name: string;
  imageUrl: string;
  itemIds: number[];
  tags?: OutfitTag[];
}