import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Building2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useGetCampaignProgress, 
  useListRecentDonations,
  useCreateCheckoutSession
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const formSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  donorName: z.string().optional(),
  donorEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().optional()
});

export default function Donate() {
  const { data: campaign } = useGetCampaignProgress();
  const { data: recentDonations } = useListRecentDonations();
  const createCheckout = useCreateCheckoutSession();
  
  const [customAmount, setCustomAmount] = useState("");
  const [stripeError, setStripeError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      donorName: "",
      donorEmail: "",
      message: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStripeError(false);
    try {
      const session = await createCheckout.mutateAsync({ data: values });
      if (!session.stripeConfigured) {
        setStripeError(true);
      } else if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Build the Future of NHS</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Our current facility has served us well, but the animals need more space, better medical facilities, and a healthier environment. Your contribution builds their new home.
            </p>
          </div>

          {campaign && (
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border mb-16">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">
                    ${campaign.raised.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">
                    Raised of ${campaign.goal.toLocaleString()} goal
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold">
                    {campaign.percentComplete}%
                  </div>
                </div>
              </div>
              <Progress value={campaign.percentComplete} className="h-4 rounded-full" />
              <div className="flex justify-between mt-4 text-sm text-muted-foreground font-medium">
                <span>{campaign.donorCount} supporters</span>
                <span>{campaign.daysLeft} days remaining</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-7">
              <div className="bg-white rounded-3xl p-8 border shadow-xl shadow-black/5">
                <h3 className="text-2xl font-serif font-bold mb-6">Make a Donation</h3>
                
                {stripeError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Payment Setup Required</AlertTitle>
                    <AlertDescription>
                      Stripe is not yet configured for this portal. Please contact NHS to donate directly.
                    </AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block">Select Amount</label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {PRESET_AMOUNTS.map((amt) => (
                          <Button
                            key={amt}
                            type="button"
                            variant={form.watch("amount") === amt && !customAmount ? "default" : "outline"}
                            className={`h-14 text-lg ${form.watch("amount") === amt && !customAmount ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            onClick={() => {
                              form.setValue("amount", amt);
                              setCustomAmount("");
                            }}
                          >
                            ${amt}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          className="h-14 pl-8 text-lg bg-muted/50"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) form.setValue("amount", val);
                          }}
                        />
                      </div>
                      {form.formState.errors.amount && (
                        <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.amount.message}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg border-b pb-2">Your Information</h4>
                      <FormField
                        control={form.control}
                        name="donorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="How should we address you?" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="donorEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="For tax receipt" type="email" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Leave a Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="I'm donating in honor of..." 
                                className="resize-none min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-16 text-lg rounded-xl"
                      disabled={createCheckout.isPending}
                    >
                      {createCheckout.isPending ? "Processing..." : `Donate $${form.watch("amount")}`}
                      <Heart className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            <div className="md:col-span-5">
              <h3 className="text-2xl font-serif font-bold mb-6">Recent Community Support</h3>
              <div className="space-y-4">
                {recentDonations?.map((donation, idx) => (
                  <motion.div 
                    key={donation.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card p-5 rounded-2xl border flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-lg">${donation.amount}</span>
                        <span className="text-muted-foreground text-sm">from {donation.donorName}</span>
                      </div>
                      {donation.message && (
                        <p className="text-sm text-foreground/80 italic">"{donation.message}"</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
