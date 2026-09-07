export type ClothingSource = 'personal' | 'shoppingTrial';
export type ClothingStatus = 'active' | 'archived';

export interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  season: string;
  source: ClothingSource;
  status: ClothingStatus;
  temporaryExpiresAt?: string;
}