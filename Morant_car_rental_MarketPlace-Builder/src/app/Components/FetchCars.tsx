import { client } from "@/sanity/lib/client";

export interface ProductData {
  tags: string[];
  oldPrice?: string;
  newPrice?: string;
  model?: string;
  pricePerDay?: string;
  name?: string;
  seatingCapacity?: string;
  fuelCapacity?: string;
  transmission?: string;
  title?: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
      current?: string;
    };
  };
  type?: string;
  quantity?: number;
  slug?: {
    current?: string;
  };
  description?: string;
  brand?: string;
  _type?: "product";
  _id?: string;
  
}

export const fetchCars = async (): Promise<ProductData[]> => {
  try {
    const query = `*[_type == "car"]`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error)
    return [];
  }
};
