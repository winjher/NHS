import { useLocation } from "wouter";
import { CheckCircle2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Success() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-[80dvh] flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ delay: 0.2, duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
          ></motion.div>
          <div className="w-28 h-28 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto relative z-10 shadow-xl shadow-primary/20">
            <Heart className="w-14 h-14 fill-current" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center z-20 border-4 border-background"
          >
            <CheckCircle2 className="w-7 h-7" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold text-foreground">Thank You!</h1>
          <p className="text-lg text-muted-foreground">
            Your generous donation brings us one step closer to our new home. We truly appreciate your compassion and support.
          </p>
          {sessionId && (
            <p className="text-xs text-muted-foreground/60 font-mono break-all mt-4 bg-muted p-2 rounded-lg inline-block">
              Session: {sessionId}
            </p>
          )}
        </div>

        <div className="pt-8">
          <Link href="/">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto shadow-lg shadow-primary/20">
              Return to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
