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
    name: "Nova",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    breed: "Labrador Retriever",
    age: "2 years",
    gender: "Female",
    size: "Large",
    availableSince: new Date().toISOString(),
    description: "A friendly and playful dog who loves people and long walks.",
    tags: ["Good with kids", "House-trained", "Energetic"],
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
  totalAvailable: 18,
  dogs: 10,
  cats: 8,
};

const mockDonations: Donation[] = [
  { id: 1, donorName: "Emma R.", amount: 100, date: "2026-05-15", createdAt: "2026-05-15", message: "So excited to support NHS!" },
  { id: 2, donorName: "Liam T.", amount: 250, date: "2026-05-14", createdAt: "2026-05-14", message: "Thank you for all you do." },
  { id: 3, donorName: "Maya S.", amount: 75, date: "2026-05-12", createdAt: "2026-05-12" },
];

export function useListPets(filters: ListPetsFilters) {
  const data = useMemo(
    () => mockPets.filter((pet) => {
      if (filters.species && pet.name.toLowerCase().indexOf(filters.species) === -1) return false;
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
