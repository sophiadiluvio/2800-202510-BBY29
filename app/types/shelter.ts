export type Shelter = {
  _id: string;
  name: string;
  address: string;
  lon: number;
  lat: number;
  inv: Record<string, number>;
  req: Record<string, number>;
  max: Record<string, number>;
  role: 'food' | 'overnight' | 'women' | 'distribution';
};