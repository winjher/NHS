import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dog } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
        <Dog className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-6xl font-serif font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-4">You look lost</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        We can't seem to find the page you're looking for. Let's get you back on track.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">
          Go back home
        </Button>
      </Link>
    </div>
  );
}
