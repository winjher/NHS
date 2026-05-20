import { PawPrint, DollarSign, Wrench, ChevronRight, ExternalLink, Database, CreditCard, Mail } from "lucide-react";

interface Section {
  icon: React.ReactNode;
  title: string;
  color: string;
  items: { heading: string; steps?: string[]; note?: string }[];
}

const sections: Section[] = [
  {
    icon: <PawPrint className="w-6 h-6" />,
    title: "Managing Pet Listings",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    items: [
      {
        heading: "Add a new pet",
        steps: [
          "Ask your developer to insert a new row into the pets table, or use the admin API endpoint POST /api/pets (requires an admin key).",
          "Required fields: name, species (dog / cat / rabbit / other), breed, age, gender, size, a description, and an image URL.",
          "The listing appears on the Adopt page immediately — no cache to clear.",
        ],
      },
      {
        heading: "Update or remove a pet",
        steps: [
          "Use PATCH /api/pets/:id to update any field, or DELETE /api/pets/:id to remove the listing.",
          "When a pet is adopted, update its status field to 'adopted' so it no longer appears in search results.",
        ],
        note: "A self-serve CMS interface is planned for Phase 2. Until then, contact your developer for listing changes.",
      },
    ],
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Tracking Donations",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    items: [
      {
        heading: "Viewing donation records",
        steps: [
          "All donations are stored in the donations table in the portal's PostgreSQL database.",
          "The Capital Campaign page shows a live running total pulled directly from the database.",
          "For a full export, your developer can run: SELECT * FROM donations ORDER BY created_at DESC;",
        ],
      },
      {
        heading: "Stripe (online card payments)",
        steps: [
          "Once the STRIPE_SECRET_KEY is configured, donors are redirected to a hosted Stripe Checkout page.",
          "Log into the Stripe Dashboard at dashboard.stripe.com → Payments to see card transactions.",
          "Stripe automatically emails a receipt to the donor's address after a successful payment.",
        ],
        note: "Stripe is not yet active. Donations recorded without it are still saved to the database. Contact your developer to enable card payments.",
      },
    ],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Technical Support",
    color: "text-violet-700 bg-violet-50 border-violet-200",
    items: [
      {
        heading: "Phase 1 support coverage",
        steps: [
          "90 days of pro-bono technical support is included from the date of launch.",
          "Covered: site downtime, form submission errors, donation flow issues, and database queries.",
          "Not covered: new feature development or third-party service outages (e.g. Stripe, hosting provider).",
        ],
      },
      {
        heading: "How to report an issue",
        steps: [
          "Email support@yourdomain.com with a description of the problem and a screenshot if possible.",
          "Include the time the issue started and which page or form is affected.",
          "Critical issues (site down, no donations processing) will receive a response within 2 hours on business days.",
        ],
      },
    ],
  },
];

export default function Staff() {
  return (
    <div className="min-h-[100dvh] bg-background py-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1.5 rounded-full mb-4">
            Internal Use Only
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Staff &amp; Admin Guide</h1>
          <p className="text-lg text-muted-foreground">
            NHS Digital Portal — operational reference for the Northumberland Humane Society team.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className={`rounded-2xl border p-6 md:p-8 ${section.color.split(" ").slice(1).join(" ")}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${section.color.split(" ")[0]} ${section.color.split(" ")[1]} p-2 rounded-xl border ${section.color.split(" ")[2]}`}>
                  {section.icon}
                </div>
                <h2 className={`text-xl font-bold ${section.color.split(" ")[0]}`}>{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      {item.heading}
                    </h3>
                    {item.steps && (
                      <ol className="space-y-2 ml-6">
                        {item.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-foreground/80">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/70 border flex items-center justify-center text-xs font-bold text-muted-foreground mt-0.5">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    {item.note && (
                      <p className="mt-3 ml-6 text-xs text-muted-foreground italic border-l-2 border-current/20 pl-3">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-bold text-lg mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border bg-background hover:border-primary/50 hover:shadow-sm transition group"
            >
              <CreditCard className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
              <div>
                <p className="text-sm font-medium">Stripe Dashboard</p>
                <p className="text-xs text-muted-foreground">Payments &amp; receipts</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-background">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">PostgreSQL via DATABASE_URL</p>
              </div>
            </div>
            <a
              href="mailto:support@yourdomain.com"
              className="flex items-center gap-3 p-4 rounded-xl border bg-background hover:border-primary/50 hover:shadow-sm transition group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
              <div>
                <p className="text-sm font-medium">Dev Support</p>
                <p className="text-xs text-muted-foreground">support@yourdomain.com</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
