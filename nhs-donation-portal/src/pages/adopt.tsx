import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Filter, X, ChevronLeft } from "lucide-react";
import { useListPets, useGetPet, getGetPetQueryKey } from "@workspace/api-client-react";
import type { ListPetsSpecies, ListPetsSize, ListPetsGender } from "@workspace/api-client-react/src/generated/api.schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AdoptionForm from "@/components/AdoptionForm";

const SPECIES_TABS = [
  { label: "All", value: undefined as ListPetsSpecies | undefined },
  { label: "Dogs", value: "dog" as ListPetsSpecies },
  { label: "Cats", value: "cat" as ListPetsSpecies },
  { label: "Small Critters", value: "rabbit" as ListPetsSpecies },
];

function PetDetailsDialog({ petId, open, onOpenChange }: { petId: number | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  const [showForm, setShowForm] = useState(false);

  const { data: pet, isLoading } = useGetPet(petId as number, {
    query: {
      enabled: !!petId,
      queryKey: petId ? getGetPetQueryKey(petId) : ["pet", "none"]
    }
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) setShowForm(false);
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-0">
        {isLoading || !pet ? (
          <div className="h-[400px] flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
              <div className="text-muted-foreground font-medium">Fetching details...</div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {!showForm ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-[600px]"
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                  <DialogTitle className="text-3xl font-bold mb-1">{pet.name}</DialogTitle>
                  <DialogDescription className="text-muted-foreground font-medium mb-5">
                    {pet.breed} &bull; {pet.age} &bull; {pet.gender}
                  </DialogDescription>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-accent/30 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Size</div>
                      <div className="font-medium text-sm">{pet.size}</div>
                    </div>
                    <div className="bg-accent/30 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Available Since</div>
                      <div className="font-medium text-sm">{new Date(pet.availableSince).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mb-5 flex-1">
                    <h4 className="font-bold text-base mb-2">About {pet.name}</h4>
                    <p className="text-foreground/80 leading-relaxed text-sm">{pet.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {pet.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-accent/50 text-accent-foreground font-medium text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button size="lg" className="w-full rounded-xl h-12 shrink-0" onClick={() => setShowForm(true)}>
                    Apply to Adopt {pet.name}
                    <Heart className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 overflow-y-auto max-h-[85vh]"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to {pet.name}
                </button>
                <AdoptionForm petId={pet.id} petName={pet.name} onSuccess={() => setShowForm(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Adopt() {
  const [species, setSpecies] = useState<ListPetsSpecies | undefined>();
  const [size, setSize] = useState<ListPetsSize | undefined>();
  const [gender, setGender] = useState<ListPetsGender | undefined>();
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  const { data: pets, isLoading } = useListPets({ species, size, gender });

  const activeTabIndex = SPECIES_TABS.findIndex((t) => t.value === species);

  return (
    <div className="min-h-[100dvh] bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8">

        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your New Best Friend</h1>
          <p className="text-lg text-muted-foreground">
            The Northumberland Humane Society has animals of all kinds waiting for a loving home.
          </p>
        </div>

        {/* Species Tab Bar */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-1 -mb-px">
            {SPECIES_TABS.map((tab) => {
              const isActive = species === tab.value;
              return (
                <button
                  key={tab.label}
                  onClick={() => setSpecies(tab.value)}
                  className={`relative px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap gap-3 items-center mb-10">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Filter className="w-4 h-4" />
            Refine:
          </div>

          <Select value={size || "all"} onValueChange={(val) => setSize(val === "all" ? undefined : val as ListPetsSize)}>
            <SelectTrigger className="w-[140px] h-9 text-sm bg-card">
              <SelectValue placeholder="Any size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any size</SelectItem>
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Large">Large</SelectItem>
            </SelectContent>
          </Select>

          <Select value={gender || "all"} onValueChange={(val) => setGender(val === "all" ? undefined : val as ListPetsGender)}>
            <SelectTrigger className="w-[140px] h-9 text-sm bg-card">
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>

          {(size || gender) && (
            <button
              onClick={() => { setSize(undefined); setGender(undefined); }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted rounded-3xl h-[450px]" />
            ))}
          </div>
        ) : pets && pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet, idx) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="overflow-hidden rounded-3xl border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={pet.image} 
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-background/90 text-foreground hover:bg-background backdrop-blur font-medium">
                        {pet.breed}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-2xl mb-1">{pet.name}</h3>
                        <p className="text-muted-foreground text-sm font-medium">{pet.age} • {pet.gender} • {pet.size}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-foreground/80 line-clamp-2 mb-6 flex-1">
                      {pet.description}
                    </p>

                    <Button 
                      className="w-full rounded-xl" 
                      size="lg"
                      onClick={() => setSelectedPetId(pet.id)}
                    >
                      Meet {pet.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-card rounded-3xl border shadow-sm"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold mb-2">No pets found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more animals.</p>
          </motion.div>
        )}

        <PetDetailsDialog 
          petId={selectedPetId} 
          open={selectedPetId !== null} 
          onOpenChange={(open) => !open && setSelectedPetId(null)} 
        />
      </div>
    </div>
  );
}
