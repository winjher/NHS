import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useSubmitAdoptionApplication } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  livingSituation: z.enum(["Own", "Rent"]),
  hasOtherPets: z.boolean(),
  experience: z.string().min(20, "Please tell us a bit more (at least 20 characters)"),
});

type FormData = z.infer<typeof formSchema>;

interface AdoptionFormProps {
  petId: number;
  petName: string;
  onSuccess?: () => void;
}

export default function AdoptionForm({ petId, petName, onSuccess }: AdoptionFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate: submitApplication, isPending } = useSubmitAdoptionApplication({
    mutation: {
      onSuccess: (data) => {
        setSuccessMessage(data.message);
        onSuccess?.();
      },
      onError: () => {
        setServerError("Something went wrong submitting your application. Please try again.");
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { hasOtherPets: false, livingSituation: "Own" },
  });

  const onSubmit = (data: FormData) => {
    setServerError(null);
    submitApplication({
      data: {
        petId,
        petName,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        livingSituation: data.livingSituation,
        hasOtherPets: data.hasOtherPets,
        experience: data.experience,
      },
    });
  };

  if (successMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-8 px-4 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Application Received!</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 text-destructive text-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            {...register("fullName")}
            placeholder="Jane Smith"
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
          {errors.fullName && (
            <p className="text-destructive text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="613-555-0100"
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
          {errors.phone && (
            <p className="text-destructive text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Home Ownership</label>
          <select
            {...register("livingSituation")}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          >
            <option value="Own">Own my home</option>
            <option value="Rent">I rent</option>
          </select>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
        <input
          type="checkbox"
          id="hasOtherPets"
          {...register("hasOtherPets")}
          className="mt-0.5 w-4 h-4 accent-primary rounded shrink-0"
        />
        <label htmlFor="hasOtherPets" className="text-sm text-foreground leading-relaxed cursor-pointer">
          I currently have other pets at home
        </label>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Experience with Animals</label>
        <textarea
          {...register("experience")}
          rows={4}
          placeholder={`Tell us about your experience with pets — past or present. What kind of home would ${petName} be coming into?`}
          className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
        />
        {errors.experience && (
          <p className="text-destructive text-xs">{errors.experience.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        size="lg"
        className="w-full rounded-xl h-12 font-semibold"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Submit Application for {petName}
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        The NHS team typically responds within 2–3 business days.
      </p>
    </form>
  );
}
