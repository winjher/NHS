export type ListPetsSpecies = "dog" | "cat" | "rabbit";
export type ListPetsSize = "Small" | "Medium" | "Large";
export type ListPetsGender = "Male" | "Female";

export interface Pet {
  id: number;
  name: string;
  image: string;
  breed: string;
  age: string;
  gender: ListPetsGender;
  size: ListPetsSize;
  availableSince: string;
  description: string;
  tags: string[];
}

export interface ListPetsFilters {
  species?: ListPetsSpecies;
  size?: ListPetsSize;
  gender?: ListPetsGender;
}

export interface Campaign {
  campaignName: string;
  campaignDescription: string;
  raised: number;
  goal: number;
  percentComplete: number;
  donorCount: number;
  daysLeft: number;
}

export interface PetStats {
  adoptedThisMonth: number;
  totalAvailable: number;
  dogs: number;
  cats: number;
}

export interface Health {
  status: "ok" | "down";
}

export interface Donation {
  id: number;
  donorName: string;
  amount: number;
  date: string;
  createdAt: string;
  message?: string;
}

export interface CheckoutSession {
  stripeConfigured: boolean;
  url?: string;
}
