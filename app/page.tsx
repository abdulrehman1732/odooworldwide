"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight, BarChart3, Boxes, BriefcaseBusiness, Check, CircleDollarSign,
  Clock3, Code2, DatabaseZap, Gauge, Globe2, GraduationCap, Headphones,
  HeartHandshake, Layers3, Mail, Menu, MessageCircle, PackageCheck, RefreshCw,
  Rocket, Settings2, ShieldCheck, ShoppingCart, Sparkles, UserRoundCog,
  Users, Workflow, X, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const whatsappHref =
  "https://wa.me/12346882188?text=Hello%20Odoo%20Worldwide%2C%20I%27d%20like%20to%20discuss%20an%20Odoo%20project.";

const solutions = [
  { icon: Users, title: "Sales & CRM", text: "Leads, pipelines, quotations, and customer follow-up in one flow.", tone: "violet" },
  { icon: Boxes, title: "Inventory", text: "Real-time stock, purchasing, warehouses, and replenishment.", tone: "blue" },
  { icon: CircleDollarSign, title: "Accounting", text: "Invoicing, expenses, payments, and clear financial reporting.", tone: "amber" },
  { icon: Workflow, title: "Operations", text: "Projects, service delivery, approvals, and daily workflows.", tone: "coral" },
  { icon: BriefcaseBusiness, title: "People & HR", text: "Employees, attendance, time off, recruitment, and appraisals.", tone: "teal" },
  { icon: ShoppingCart, title: "Commerce", text: "Website, eCommerce, point of sale, and marketing automation.", tone: "pink" },
];

const services = [
  { icon: Rocket, number: "01", title: "Implementation", text: "A practical rollout built around how your teams actually work—from discovery to go-live." },
  { icon: Code2, number: "02", title: "Customization", text: "Purpose-built workflows, reports, automations, and modules for your business." },
  { icon: Settings2, number: "03", title: "Integration", text: "Connect Odoo with payments, eCommerce, logistics, and the tools you already use." },
  { icon: GraduationCap, number: "04", title: "Training & Support", text: "Hands-on team training and reliable support after launch." },
];

const processSteps = [
  { icon: MessageCircle, number: "01", title: "Tell us your goals", text: "Send your request and explain the systems, teams, and processes you want to improve." },
  { icon: Layers3, number: "02", title: "Business review", text: "We study your workflow, priorities, data, and the Odoo apps that will create the most value." },
  { icon: UserRoundCog, number: "03", title: "Technician assigned", text: "A dedicated Odoo technician becomes your project contact and coordinates the complete transformation.", featured: true },
  { icon: DatabaseZap, number: "04", title: "Build & migrate", text: "We configure, customize, integrate, test, and move the approved data into your new Odoo system." },
  { icon: GraduationCap, number: "05", title: "Train & launch", text: "We train your team, support go-live, and continue improving Odoo as your business grows." },
];

type FormState = "idle" | "submitting" | "success" | "error";

function Brand() {
  return (
    <span className="group flex items-center gap-3">
      <img src="/odoo-logo.svg" width="88" height="32" alt="Odoo" className="odoo-logo" />
      <span className="brand-divider" aria-hidden="true" />
      <span className="text-xs font-black uppercase leading-tight tracking-[0.17em] text-slate-600">Worldwide</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("https://formspree.io/f/xoevyrnb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; errors?: { message: string }[] };
      if (!response.ok) throw new Error(result.errors?.map((item) => item.message).join(" ") || result.error || "We could not submit your request.");
      setFormState("success");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your request.");
      setFormState("error");
    }
  }

  return (
    <main className="overflow-hidden">
      <div className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-xs font-semibold tracking-wide sm:text-sm">
          <Globe2 className="size-4 text-orbit" aria-hidden="true" />
          U.S.-based Odoo services · Supporting businesses worldwide
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" aria-label="Odoo Worldwide home"><Brand /></a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            <a className="nav-link" href="#why-odoo">Why Odoo</a>
            <a className="nav-link" href="#starter">Starter offer</a>
            <a className="nav-link" href="#platform">The platform</a>
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#approach">Our process</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="ghost" className="h-11 rounded-full px-5 text-ink hover:bg-violet-50">
              <a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
            </Button>
            <Button asChild className="h-11 rounded-full bg-brand px-6 text-white shadow-lg shadow-violet-200 hover:bg-brand-dark">
              <a href="#contact">Start a project <ArrowRight /></a>
            </Button>
          </div>
          <button type="button" className="flex size-11 items-center justify-center rounded-full border border-slate-200 text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {[["Why Odoo", "#why-odoo"], ["Starter offer", "#starter"], ["The platform", "#platform"], ["Services", "#services"], ["Our process", "#approach"], ["Contact", "#contact"]].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-ink hover:bg-violet-50">{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="top" className="relative bg-hero">
        <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-bold text-brand shadow-sm backdrop-blur">
              <Sparkles className="size-4" aria-hidden="true" /> Odoo software, professionally delivered
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
              Leave slow software behind. <span className="text-gradient">Move forward with Odoo.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Replace disconnected spreadsheets and outdated systems with one modern platform. Our specialists manage your complete Odoo transformation—from planning and setup to training and long-term support.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-14 rounded-full bg-brand px-7 text-base font-bold text-white shadow-xl shadow-violet-200 hover:bg-brand-dark">
                <a href="#contact">Request your Odoo plan <ArrowRight className="size-5" /></a>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-full border-slate-300 bg-white/70 px-7 text-base font-bold text-ink hover:bg-white">
                <a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle className="size-5" /> Chat on WhatsApp</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              {["Dedicated technician", "Complete transformation", "Worldwide support"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check className="size-4 rounded-full bg-emerald-100 p-0.5 text-emerald-700" />{item}</span>
              ))}
            </div>
            <a href="#starter" className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-violet-200 bg-white/75 px-4 py-3 text-sm font-bold text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
              <span className="rounded-xl bg-brand px-3 py-2 text-white">US$149.99</span>
              Build your Odoo starter system
              <ArrowRight className="ml-auto size-4 text-brand" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-12 top-12 size-44 rounded-full bg-orbit/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -right-10 bottom-10 size-52 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
            <div className="product-window relative rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_35px_90px_rgba(61,42,102,0.2)] backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /></div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-brand">Odoo business command center</span>
              </div>
              <div className="grid gap-4 pt-4 sm:grid-cols-[.7fr_1.3fr]">
                <div className="rounded-2xl bg-ink p-4 text-white">
                  <div className="mb-7 flex items-center gap-2 text-sm font-bold"><img src="/odoo-logo-inverted.svg" width="54" height="29" alt="Odoo" /> Workspace</div>
                  <div className="space-y-2 text-sm">
                    {["Overview", "Sales", "Inventory", "Finance", "Projects"].map((item, index) => (
                      <div key={item} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 ${index === 0 ? "bg-white/12 text-white" : "text-slate-400"}`}>
                        <span className={`size-1.5 rounded-full ${index === 0 ? "bg-orbit" : "bg-slate-600"}`} /> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="metric-card"><span>Pipeline</span><strong>$248k</strong><em>+18.4%</em></div>
                    <div className="metric-card"><span>Orders</span><strong>1,284</strong><em>On track</em></div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold text-ink">Business activity</span><span className="text-xs font-semibold text-slate-400">This month</span></div>
                    <div className="flex h-28 items-end gap-2" aria-label="Business activity chart">
                      {[38, 52, 44, 70, 58, 84, 73, 92, 78, 96].map((height, index) => (
                        <span key={index} className="chart-bar flex-1 rounded-t-md" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><PackageCheck className="size-5" /></div>
                    <div><p className="text-sm font-bold text-ink">Everything connected</p><p className="text-xs text-slate-500">One source of business truth</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-chip chip-left"><BarChart3 /> Live reporting</div>
            <div className="floating-chip chip-right"><HeartHandshake /> Expert support</div>
          </div>
        </div>
      </section>

      <section id="why-odoo" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Why businesses switch to Odoo</p>
            <h2 className="section-title">Old software slows every department. Odoo connects them.</h2>
            <p className="section-copy">
              When sales, inventory, accounting, and operations use separate tools, your people repeat work and decisions arrive late. Odoo replaces that friction with one connected source of truth.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_24px_70px_rgba(28,24,40,0.10)] lg:grid-cols-2">
            <article className="comparison-panel old-stack">
              <div className="comparison-label"><Clock3 /> Traditional software</div>
              <h3>Slow, disconnected, and difficult to scale.</h3>
              <ul>
                {[
                  "Separate systems that do not speak to each other",
                  "Repeated data entry and preventable errors",
                  "Reports that are already outdated",
                  "Expensive changes whenever the business grows",
                ].map((item) => <li key={item}><XCircle /> {item}</li>)}
              </ul>
            </article>
            <article className="comparison-panel odoo-stack">
              <div className="comparison-label"><img src="/odoo-logo-inverted.svg" width="58" height="31" alt="Odoo" /> Connected platform</div>
              <h3>Fast workflows, live visibility, and room to grow.</h3>
              <ul>
                {[
                  "One platform across every department",
                  "Automated handoffs and fewer manual tasks",
                  "Real-time dashboards for faster decisions",
                  "Apps and custom workflows that grow with you",
                ].map((item) => <li key={item}><Check /> {item}</li>)}
              </ul>
            </article>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <p className="max-w-xl text-base font-semibold text-slate-600">You do not have to manage the change alone. We handle the full transformation.</p>
            <Button asChild className="h-12 rounded-full bg-brand px-6 font-bold text-white hover:bg-brand-dark"><a href="#contact">Plan my transformation <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section id="starter" className="starter-section py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="starter-card">
            <div className="starter-copy">
              <p className="eyebrow text-orbit">Odoo starter offer</p>
              <h2>Build your own Odoo system from <span>US$149.99</span>.</h2>
              <p>Start with one important business workflow and build from there. A dedicated technician will help configure a focused Odoo starter system around the way your company works.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-full bg-white px-7 text-base font-bold text-brand hover:bg-violet-50">
                  <a href="#contact">Build my starter system <ArrowRight /></a>
                </Button>
                <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/5 px-7 text-base font-bold text-white hover:bg-white/10 hover:text-white">
                  <a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> Ask on WhatsApp</a>
                </Button>
              </div>
            </div>

            <div className="starter-package">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-brand">Starter configuration</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">A practical first step for small businesses.</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Starting at</span>
                  <strong className="mt-1 block text-3xl font-black tracking-tight text-ink">$149.99</strong>
                </div>
              </div>
              <ul className="mt-7 grid gap-4">
                {["Initial business review", "One standard Odoo workflow", "Core configuration and setup", "Dedicated technician guidance"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-700"><Check className="size-5 rounded-full bg-emerald-100 p-1 text-emerald-700" /> {item}</li>
                ))}
              </ul>
              <p className="mt-7 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Odoo subscription and hosting fees are separate. Data migration, third-party integrations, additional apps, and custom development are quoted based on scope.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="bg-platform py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="eyebrow">See Odoo in action</p>
              <h2 className="section-title">A modern interface your team can learn quickly.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              Every app shares the same clean experience, so information moves smoothly from the first customer conversation to payment and delivery.
            </p>
          </div>

          <Tabs defaultValue="crm" className="mt-12">
            <TabsList className="interface-tabs h-auto w-full justify-start gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
              <TabsTrigger value="crm" className="h-11 min-w-36 rounded-xl px-5 font-bold data-[state=active]:bg-brand data-[state=active]:text-white"><Users /> CRM & Sales</TabsTrigger>
              <TabsTrigger value="inventory" className="h-11 min-w-36 rounded-xl px-5 font-bold data-[state=active]:bg-brand data-[state=active]:text-white"><Boxes /> Inventory</TabsTrigger>
              <TabsTrigger value="accounting" className="h-11 min-w-36 rounded-xl px-5 font-bold data-[state=active]:bg-brand data-[state=active]:text-white"><CircleDollarSign /> Accounting</TabsTrigger>
            </TabsList>

            <TabsContent value="crm" className="interface-content">
              <div className="interface-copy">
                <span className="interface-number">01</span>
                <p className="eyebrow">CRM & Sales</p>
                <h3>Turn every opportunity into a clear next action.</h3>
                <p>Track leads, activities, quotations, expected revenue, and team performance from one visual pipeline.</p>
                <ul><li><Check /> Automated follow-ups</li><li><Check /> Live sales forecasting</li><li><Check /> Quotes connected to delivery and invoicing</li></ul>
              </div>
              <figure className="interface-frame">
                <img src="/odoo-crm.webp" alt="Odoo CRM interface showing a visual sales opportunity pipeline" loading="lazy" />
                <figcaption>Odoo CRM interface · <a href="https://www.odoo.com/app/crm" target="_blank" rel="noreferrer">View the official product page</a></figcaption>
              </figure>
            </TabsContent>

            <TabsContent value="inventory" className="interface-content">
              <div className="interface-copy">
                <span className="interface-number">02</span>
                <p className="eyebrow">Inventory</p>
                <h3>Know what you have, where it is, and what comes next.</h3>
                <p>Manage purchasing, warehouses, replenishment, transfers, and deliveries without waiting for manual stock updates.</p>
                <ul><li><Check /> Real-time stock movement</li><li><Check /> Smarter replenishment</li><li><Check /> Multi-warehouse visibility</li></ul>
              </div>
              <figure className="interface-frame">
                <img src="/odoo-inventory.webp" alt="Odoo Inventory interface showing warehouse operations and stock management" loading="lazy" />
                <figcaption>Odoo Inventory interface · <a href="https://www.odoo.com/app/inventory" target="_blank" rel="noreferrer">View the official product page</a></figcaption>
              </figure>
            </TabsContent>

            <TabsContent value="accounting" className="interface-content">
              <div className="interface-copy">
                <span className="interface-number">03</span>
                <p className="eyebrow">Accounting</p>
                <h3>Close the gap between daily work and financial insight.</h3>
                <p>Connect invoices, payments, expenses, bank activity, and reporting so finance works from the same live data as operations.</p>
                <ul><li><Check /> Faster reconciliation</li><li><Check /> Automated invoice workflows</li><li><Check /> Clear, current reporting</li></ul>
              </div>
              <figure className="interface-frame">
                <img src="/odoo-accounting.webp" alt="Odoo Accounting interface showing financial operations and reports" loading="lazy" />
                <figcaption>Odoo Accounting interface · <a href="https://www.odoo.com/app/accounting" target="_blank" rel="noreferrer">View the official product page</a></figcaption>
              </figure>
            </TabsContent>
          </Tabs>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">Official Odoo product imagery is shown for demonstration. Odoo is a trademark of Odoo S.A.</p>
        </div>
      </section>

      <section id="solutions" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Connected business solutions</p>
            <h2 className="section-title">One system for every part of your company.</h2>
            <p className="section-copy">Start with the apps you need today. Add more as your business grows, without rebuilding your entire technology stack.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ icon: Icon, title, text, tone }) => (
              <article key={title} className="solution-card group">
                <div className={`solution-icon tone-${tone}`}><Icon /></div>
                <h3>{title}</h3><p>{text}</p>
                <a href="#contact" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand">Discuss this solution <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-ink py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow text-orbit">End-to-end Odoo expertise</p>
              <h2 className="section-title text-white">We do the heavy lifting. Your team gets a better way to work.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">Our professionals translate your business needs into a reliable Odoo system. We organize the complexity, manage the technical work, and stay with you after launch.</p>
              <Button asChild className="mt-8 h-12 rounded-full bg-white px-6 font-bold text-ink hover:bg-violet-50"><a href="#contact">Get my transformation plan <ArrowRight /></a></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map(({ icon: Icon, number, title, text }) => (
                <article key={title} className="service-card">
                  <div className="flex items-start justify-between"><div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-orbit"><Icon /></div><span className="text-sm font-black text-white/30">{number}</span></div>
                  <h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Your complete Odoo transformation</p>
            <h2 className="section-title">One professional team, from first call to go-live.</h2>
            <p className="section-copy">You receive a clear plan, a dedicated technician, and one accountable process for configuration, customization, migration, training, and support.</p>
          </div>
          <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="process-line hidden lg:block" aria-hidden="true" />
            {processSteps.map(({ icon: Icon, number, title, text, featured }) => (
              <article key={number} className={`process-card ${featured ? "process-featured" : ""}`}>
                <span><Icon aria-hidden="true" /></span>
                <small>Step {number}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                {featured && <strong><ShieldCheck /> Your dedicated expert</strong>}
              </article>
            ))}
          </div>
          <div className="transformation-strip mt-10">
            <div><RefreshCw /><span><strong>We manage the change</strong><small>Planning, setup, migration, testing, and launch</small></span></div>
            <div><Gauge /><span><strong>You gain momentum</strong><small>Faster work, live insight, and a platform built to scale</small></span></div>
            <Button asChild className="h-12 rounded-full bg-white px-6 font-bold text-brand hover:bg-violet-50"><a href="#contact">Start the process <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.78fr_1.22fr] lg:gap-20 lg:px-8">
          <div>
            <p className="eyebrow">Start your Odoo transformation</p>
            <h2 className="section-title">Ready to replace slow software?</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Tell us what is slowing your business down. We’ll review your needs, recommend the right Odoo approach, and assign the right technician for your project.</p>
            <div className="mt-10 space-y-5">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="contact-row"><span><MessageCircle /></span><div><small>WhatsApp</small><strong>+1 (234) 688-2188</strong></div></a>
              <a href="mailto:info@odooworldwide.com" className="contact-row"><span><Mail /></span><div><small>Email</small><strong>info@odooworldwide.com</strong></div></a>
              <div className="contact-row"><span><Globe2 /></span><div><small>U.S. operations</small><strong>Austin, Texas · Serving clients worldwide</strong></div></div>
              <div className="contact-row"><span><Headphones /></span><div><small>Support</small><strong>Remote-first delivery across time zones</strong></div></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/50 sm:p-9">
            {formState === "success" ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center" role="status">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-8" /></div>
                <h3 className="mt-6 text-3xl font-black tracking-tight text-ink">Your request is in.</h3>
                <p className="mt-3 max-w-md text-lg leading-8 text-slate-600">Thank you. Our team will review the details and contact you shortly.</p>
                <Button type="button" variant="outline" className="mt-8 rounded-full" onClick={() => setFormState("idle")}>Send another request</Button>
              </div>
            ) : (
              <form onSubmit={submitLead} className="space-y-5">
                <div><h3 className="text-2xl font-black tracking-tight text-ink">Request your Odoo consultation</h3><p className="mt-2 text-slate-600">Tell us where you are today and where you want the business to go.</p></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="form-field"><Label htmlFor="name">Full name *</Label><Input id="name" name="name" required autoComplete="name" placeholder="Your full name" /></div>
                  <div className="form-field"><Label htmlFor="email">Work email *</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
                  <div className="form-field"><Label htmlFor="phone">Phone / WhatsApp *</Label><Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 555 000 0000" /></div>
                  <div className="form-field"><Label htmlFor="company">Company name *</Label><Input id="company" name="company" required autoComplete="organization" placeholder="Your company" /></div>
                  <div className="form-field"><Label htmlFor="companySize">Company size</Label><NativeSelect id="companySize" name="companySize" className="h-12 w-full rounded-xl bg-white"><NativeSelectOption value="">Select size</NativeSelectOption><NativeSelectOption value="1-10">1–10 employees</NativeSelectOption><NativeSelectOption value="11-50">11–50 employees</NativeSelectOption><NativeSelectOption value="51-200">51–200 employees</NativeSelectOption><NativeSelectOption value="201+">201+ employees</NativeSelectOption></NativeSelect></div>
                  <div className="form-field"><Label htmlFor="service">Service needed *</Label><NativeSelect id="service" name="service" required className="h-12 w-full rounded-xl bg-white"><NativeSelectOption value="">Select a service</NativeSelectOption><NativeSelectOption value="Starter system">Starter system — from $149.99</NativeSelectOption><NativeSelectOption value="Implementation">New implementation</NativeSelectOption><NativeSelectOption value="Customization">Customization</NativeSelectOption><NativeSelectOption value="Integration">Integration</NativeSelectOption><NativeSelectOption value="Migration">Migration / upgrade</NativeSelectOption><NativeSelectOption value="Support">Training & support</NativeSelectOption><NativeSelectOption value="Not sure">Not sure yet</NativeSelectOption></NativeSelect></div>
                </div>
                <div className="form-field"><Label htmlFor="message">What would you like to improve? *</Label><Textarea id="message" name="message" required minLength={10} maxLength={2000} className="min-h-32 rounded-xl bg-white" placeholder="Tell us about your current system, the main challenge, and what a successful outcome looks like." /></div>
                <div className="sr-only" aria-hidden="true"><Label htmlFor="website">Website</Label><Input id="website" name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
                {formState === "error" && <p className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700" role="alert">{errorMessage} Your information is still in the form—please try again or contact us by email or WhatsApp.</p>}
                <Button type="submit" disabled={formState === "submitting"} className="h-13 w-full rounded-full bg-brand text-base font-bold text-white hover:bg-brand-dark">{formState === "submitting" ? "Sending request…" : "Submit request"}<ArrowRight /></Button>
                <p className="text-center text-xs leading-5 text-slate-500">By submitting, you agree that Odoo Worldwide may contact you about this request.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <a href="#top"><Brand /></a>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600"><a href="#why-odoo">Why Odoo</a><a href="#starter">Starter offer</a><a href="#platform">The platform</a><a href="#services">Services</a><a href="#approach">Our process</a><a href="#contact">Contact</a><a href="mailto:info@odooworldwide.com">Email</a><a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a></div>
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-500 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Odoo Worldwide. All rights reserved.</p>
            <p className="max-w-2xl">Odoo Worldwide is an independent Odoo services provider and is not affiliated with or endorsed by Odoo S.A. Odoo is a trademark of Odoo S.A.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
