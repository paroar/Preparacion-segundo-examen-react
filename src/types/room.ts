export type Room = {
  id: string;
  name: string;
  slug: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  pets: boolean;
  breakfast: boolean;
  featured: boolean;
  description: string;
  extras: string[];
  images: string[];
  inCart: boolean;
  amount: number;
  total: number;
};

export type RoomFilter = {
  slug?: string;
  type?: string;
  capacity?: [number | undefined, (number | undefined)?];
  price?: [number | undefined, (number | undefined)?];
  size?: [number | undefined, (number | undefined)?];
  breakfast?: string | boolean;
  pets?: string | boolean;
  featured?: string | boolean;
  name?: string;
};
