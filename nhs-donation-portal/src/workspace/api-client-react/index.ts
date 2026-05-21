import { useMemo } from "react";
import type {
  Campaign,
  CheckoutSession,
  Donation,
  Health,
  ListPetsFilters,
  ListPetsGender,
  ListPetsSize,
  ListPetsSpecies,
  Pet,
  PetStats,
} from "./src/generated/api.schemas";

const mockPets: Pet[] = [
  {
    id: 1,
    species: "dog",
    name: "Nova",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    breed: "Labrador Retriever",
    age: "2 years",
    gender: "Female",
    size: "Large",
    availableSince: new Date().toISOString(),
    description: "A friendly and playful dog who loves people and long walks.",
    tags: ["Good with kids", "House-trained", "Energetic"],
  },
  {
    id: 2,
    species: "dog",
    name: "Buddy",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    size: "Large",
    availableSince: new Date().toISOString(),
    description: "A friendly and playful dog who loves people and long walks.",
    tags: ["Good with kids", "House-trained", "Energetic"],
  },
  {
    id: 3,
    species: "cat",
    name: "Mittens",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    breed: "Domestic Short Hair",
    age: "1 year",
    gender: "Female",
    size: "Small",
    availableSince: new Date().toISOString(),
    description: "A curious cat who loves to nap in sunbeams.",
    tags: ["Litter-trained", "Calm", "Affectionate"],
  },
  {
    id: 4,
    species: "cat",
    name: "Shadow",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80",
    breed: "Domestic Long Hair",
    age: "4 years",
    gender: "Male",
    size: "Medium",
    availableSince: new Date().toISOString(),
    description: "A gentle companion who enjoys quiet evenings.",
    tags: ["Good with other cats", "Calm"],
  },
  {
    id: 5,
    species: "rabbit",
    name: "Thumper",
    image: "https://images.unsplash.com/photo-1518733057094-95b53109b5a3?auto=format&fit=crop&w=1200&q=80",
    breed: "Dutch Rabbit",
    age: "6 months",
    gender: "Male",
    size: "Small",
    availableSince: new Date().toISOString(),
    description: "A playful little rabbit who loves carrots and cuddles.",
    tags: ["Indoor", "Gentle", "Good with kids"],
  },
  {
    id: 6,
    species: "rabbit",
    name: "Nibbles",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=1200&q=80",
    breed: "Lionhead",
    age: "8 months",
    gender: "Female",
    size: "Small",
    availableSince: new Date().toISOString(),
    description: "Fluffy and curious, enjoys exploring and gentle handling.",
    tags: ["Indoor", "Fluffy"],
  },
  {
    id: 7,
    species: "dog",
    name: "Roxy",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80",
    breed: "Beagle",
    age: "5 years",
    gender: "Female",
    size: "Medium",
    availableSince: new Date().toISOString(),
    description: "Loves sniffing trails and making friends.",
    tags: ["Good with dogs", "Energetic"],
  },
  {
    id: 8,
    species: "cat",
    name: "Whiskers",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    breed: "Tabby",
    age: "2 years",
    gender: "Male",
    size: "Small",
    availableSince: new Date().toISOString(),
    description: "Playful and vocal, loves toys.",
    tags: ["Playful", "Affectionate"],
  },
];

const mockCampaign: Campaign = {
  campaignName: "New Shelter Expansion",
  campaignDescription: "Raising funds to build a safer, more spacious home for our animals.",
  raised: 240000,
  goal: 500000,
  percentComplete: 48,
  donorCount: 326,
  daysLeft: 45,
};

const mockStats: PetStats = {
  adoptedThisMonth: 22,
  totalAvailable: 8,
  dogs: 3,
  cats: 3,
};

const mockDonations: Donation[] = [
  { id: 1, donorName: "Emma R.", amount: 100, date: "2026-05-15", createdAt: "2026-05-15", message: "So excited to support NHS!" },
  { id: 2, donorName: "Liam T.", amount: 250, date: "2026-05-14", createdAt: "2026-05-14", message: "Thank you for all you do." },
  { id: 3, donorName: "Maya S.", amount: 75, date: "2026-05-12", createdAt: "2026-05-12" },
];

export function useListPets(filters: ListPetsFilters) {
  const data = useMemo(
    () => mockPets.filter((pet) => {
      if (filters.species && pet.species !== filters.species) return false;
      if (filters.size && pet.size !== filters.size) return false;
      if (filters.gender && pet.gender !== filters.gender) return false;
      return true;
    }),
    [filters.gender, filters.size, filters.species],
  );

  return { data, isLoading: false };
}

export function getGetPetQueryKey(petId: number) {
  return ["pet", petId];
}

export function useGetPet(petId: number, options?: { query: { enabled: boolean; queryKey: unknown } }) {
  const data = useMemo(
    () => (options?.query.enabled ? mockPets.find((pet) => pet.id === petId) : undefined),
    [petId, options?.query.enabled],
  );

  return { data, isLoading: false };
}

export function useGetCampaignProgress() {
  return { data: mockCampaign, isLoading: false };
}

export function useGetPetStats() {
  return { data: mockStats, isLoading: false };
}

export function useHealthCheck() {
  return { data: { status: "ok" as const } };
}

export function useListRecentDonations() {
  return { data: mockDonations, isLoading: false };
}

export function useCreateCheckoutSession() {
  return {
    mutateAsync: async (_args?: { data?: unknown }) => ({ stripeConfigured: false } as CheckoutSession),
    isPending: false,
  };
}

export function useSubmitAdoptionApplication(options?: { mutation?: { onSuccess?: (data: { message: string }) => void; onError?: () => void } }) {
  return {
    mutate: ({ data }: { data: unknown }) => {
      options?.mutation?.onSuccess?.({ message: "Application submitted successfully." });
    },
    isPending: false,
  };
}
