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
};

export type RoomFilter = {
  slug?: string;
  type?: string;
  capacity?: [number | undefined, (number | undefined)?];
  price?: [number | undefined, (number | undefined)?];
  size?: [number | undefined, (number | undefined)?];
  breakfast?: boolean;
  pets?: boolean;
  featured?: boolean;
  name?: string;
};
