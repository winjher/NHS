import { Link } from "wouter";
import { Dog, Mail, MapPin, Phone, Activity } from "lucide-react";
import { useHealthCheck } from "@workspace/api-client-react";

export function Footer() {
  const { data: health } = useHealthCheck();

  return (
    <footer className="bg-card border-t py-16 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl inline-flex">
                <Dog className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-xl">Northumberland Humane Society</span>
            </Link>
            <p className="text-muted-foreground max-w-md mt-4">
              Dedicated to providing compassionate care, shelter, and second chances to animals in need across the Northumberland region.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg">Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/adopt" className="text-muted-foreground hover:text-primary transition-colors">Adopt a Pet</Link></li>
              <li><Link href="/donate" className="text-muted-foreground hover:text-primary transition-colors">Capital Campaign</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Shelter Road<br/>Northumberland, ON K7R 3L1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@northumberland.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Northumberland Humane Society. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span>Charity #123456789</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span className="text-xs uppercase tracking-wider font-medium opacity-70">
                {health?.status === 'ok' ? 'Systems Online' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
