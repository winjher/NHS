import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Home as HomeIcon, PawPrint, Cat, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCampaignProgress, useGetPetStats } from "@workspace/api-client-react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const { data: campaign } = useGetCampaignProgress();
  const { data: stats } = useGetPetStats();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-accent/30">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2969&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Heart className="w-4 h-4" />
                Capital Campaign 2024
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
                A forever home before their forever home.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                We are building a new, state-of-the-art facility to give every animal the warmth, safety, and medical care they deserve while they wait for their new family.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate">
                  <Button size="lg" className="rounded-full w-full sm:w-auto text-lg px-8 h-14">
                    Support the Campaign
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/adopt">
                  <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-lg px-8 h-14 bg-background/50 backdrop-blur">
                    Meet the Animals
                    <PawPrint className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Progress Section */}
      {campaign && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 border max-w-5xl mx-auto -mt-32 relative z-20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-4">{campaign.campaignName}</h2>
                  <p className="text-muted-foreground mb-6">
                    {campaign.campaignDescription}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>${(campaign.raised / 1000).toFixed(1)}k raised</span>
                      <span className="text-muted-foreground">Goal: ${(campaign.goal / 1000).toFixed(0)}k</span>
                    </div>
                    <Progress value={campaign.percentComplete} className="h-3" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-accent/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-serif font-bold text-primary mb-2">
                      {campaign.percentComplete}%
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Funded</div>
                  </div>
                  <div className="bg-accent/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-serif font-bold text-primary mb-2">
                      {campaign.donorCount}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Donors</div>
                  </div>
                  <div className="bg-accent/20 rounded-2xl p-6 text-center col-span-2">
                    <div className="text-4xl font-serif font-bold text-primary mb-2">
                      {campaign.daysLeft}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Days Left</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Impact Stats */}
      {stats && (
        <section className="py-24 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-4">Our Impact This Year</h2>
              <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg">Every number represents a life saved, a family completed, and a second chance given.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                  <HomeIcon className="w-8 h-8" />
                </div>
                <div className="text-5xl font-serif font-bold">{stats.adoptedThisMonth}</div>
                <div className="text-sm font-medium uppercase tracking-wider opacity-80">Adopted this Month</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                  <PawPrint className="w-8 h-8" />
                </div>
                <div className="text-5xl font-serif font-bold">{stats.totalAvailable}</div>
                <div className="text-sm font-medium uppercase tracking-wider opacity-80">Waiting for Homes</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                  <Footprints className="w-8 h-8" />
                </div>
                <div className="text-5xl font-serif font-bold">{stats.dogs}</div>
                <div className="text-sm font-medium uppercase tracking-wider opacity-80">Dogs Available</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-3"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                  <Cat className="w-8 h-8" />
                </div>
                <div className="text-5xl font-serif font-bold">{stats.cats}</div>
                <div className="text-sm font-medium uppercase tracking-wider opacity-80">Cats Available</div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
