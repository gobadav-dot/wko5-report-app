"use client";

import { useMemo, useState } from "react";
import { Activity, Download, FileText, ImagePlus, Plus, Trash2, Trophy } from "lucide-react";

type Metric = { label: string; value: string; unit: string };
type ReportImage = { id: string; name: string; url: string };

const defaultMetrics: Metric[] = [
  { label: "Duración", value: "2:48:32", unit: "" },
  { label: "Potencia media", value: "263", unit: "W" },
  { label: "NP", value: "301", unit: "W" },
  { label: "IF", value: "0.89", unit: "" },
  { label: "TSS", value: "221", unit: "" },
  { label: "5 min max.", value: "421", unit: "W" },
  { label: "20 min max.", value: "358", unit: "W" },
  { label: "kJ", value: "2650", unit: "" },
];

const defaultHighlights = [
  "El atleta sostuvo una intensidad alta durante el bloque decisivo de carrera.",
  "Los mejores esfuerzos se concentraron en la segunda mitad, senal de buena resistencia especifica.",
  "Conviene revisar el coste energetico de los ataques antes del tramo final.",
];

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-slate-500" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-slate-500" />
    </label>
  );
}

export default function Home() {
  const [athlete, setAthlete] = useState("David Garcia");
  const [raceName, setRaceName] = useState("Informe de competicion");
  const [raceDate, setRaceDate] = useState("2026-05-14");
  const [discipline, setDiscipline] = useState("Ciclismo carretera");
  const [coach, setCoach] = useState("Coach / Analista");
  const [objective, setObjective] = useState("Analizar demandas, momentos clave y oportunidades de mejora.");
  const [summary, setSummary] = useState("Carrera de alta exigencia con varios cambios de ritmo. El analisis combina metricas globales, mejores esfuerzos e imagenes exportadas desde WKO5 para explicar el rendimiento competitivo.");
  const [conclusion, setConclusion] = useState("El rendimiento fue solido, especialmente en esfuerzos sostenidos. La prioridad para la siguiente competicion sera optimizar la gestion de esfuerzos antes del tramo decisivo.");
  const [metrics, setMetrics] = useState<Metric[]>(defaultMetrics);
  const [highlights, setHighlights] = useState<string[]>(defaultHighlights);
  const [images, setImages] = useState<ReportImage[]>([]);

  const formattedDate = useMemo(() => {
    if (!raceDate) return "";
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(raceDate));
  }, [raceDate]);

  const addMetric = () => setMetrics([...metrics, { label: "Nueva metrica", value: "", unit: "" }]);
  const updateMetric = (index: number, key: keyof Metric, value: string) => setMetrics(metrics.map((metric, i) => (i === index ? { ...metric, [key]: value } : metric)));
  const removeMetric = (index: number) => setMetrics(metrics.filter((_, i) => i !== index));

  const addHighlight = () => setHighlights([...highlights, "Nuevo punto clave del analisis."]);
  const updateHighlight = (index: number, value: string) => setHighlights(highlights.map((item, i) => (i === index ? value : item)));
  const removeHighlight = (index: number) => setHighlights(highlights.filter((_, i) => i !== index));

  const handleImages = (files: FileList | null) => {
    const selected = Array.from(files || []);
    const mapped = selected.map((file) => ({ id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file) }));
    setImages((current) => [...current, ...mapped]);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="no-print sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-xl font-bold">WKO5 Race Report Builder</h1>
            <p className="text-sm text-slate-500">MVP para crear informes de competicion con datos e imagenes exportadas desde WKO5.</p>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"><Download size={18} /> Exportar PDF</button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[420px_1fr]">
        <aside className="no-print space-y-4">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold"><Trophy size={20} /> Datos del report</div>
            <div className="grid gap-4">
              <Field label="Atleta" value={athlete} onChange={setAthlete} />
              <Field label="Competicion" value={raceName} onChange={setRaceName} />
              <Field label="Fecha" type="date" value={raceDate} onChange={setRaceDate} />
              <Field label="Disciplina" value={discipline} onChange={setDiscipline} />
              <Field label="Entrenador / analista" value={coach} onChange={setCoach} />
              <TextArea label="Objetivo del analisis" value={objective} onChange={setObjective} />
              <TextArea label="Resumen" value={summary} onChange={setSummary} />
              <TextArea label="Conclusion" value={conclusion} onChange={setConclusion} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-bold"><Activity size={20} /> Metricas</div>
              <button onClick={addMetric} className="flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold"><Plus size={16} /> Anadir</button>
            </div>
            <div className="grid gap-3">
              {metrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-[1fr_90px_60px_36px] gap-2">
                  <input className="rounded-xl border px-2 py-2 text-sm" value={metric.label} onChange={(event) => updateMetric(index, "label", event.target.value)} />
                  <input className="rounded-xl border px-2 py-2 text-sm" value={metric.value} onChange={(event) => updateMetric(index, "value", event.target.value)} />
                  <input className="rounded-xl border px-2 py-2 text-sm" value={metric.unit} onChange={(event) => updateMetric(index, "unit", event.target.value)} />
                  <button onClick={() => removeMetric(index)} className="rounded-xl border text-slate-500 hover:bg-slate-50"><Trash2 size={15} className="mx-auto" /></button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-bold"><FileText size={20} /> Puntos clave</div>
              <button onClick={addHighlight} className="flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold"><Plus size={16} /> Anadir</button>
            </div>
            <div className="grid gap-2">
              {highlights.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_36px] gap-2">
                  <textarea className="rounded-xl border px-3 py-2 text-sm" rows={2} value={item} onChange={(event) => updateHighlight(index, event.target.value)} />
                  <button onClick={() => removeHighlight(index)} className="rounded-xl border text-slate-500 hover:bg-slate-50"><Trash2 size={15} className="mx-auto" /></button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold"><ImagePlus size={20} /> Imagenes WKO5</div>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <ImagePlus size={18} /> Subir capturas o graficos
              <input type="file" multiple accept="image/*" className="hidden" onChange={(event) => handleImages(event.target.files)} />
            </label>
            {images.length > 0 && <div className="mt-4 grid grid-cols-2 gap-2">{images.map((image) => <div key={image.id} className="relative overflow-hidden rounded-xl border bg-white"><img src={image.url} alt={image.name} className="h-28 w-full object-cover" /><button onClick={() => setImages(images.filter((item) => item.id !== image.id))} className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow"><Trash2 size={14} /></button></div>)}</div>}
          </section>
        </aside>

        <section className="print-page mx-auto w-full max-w-[900px] rounded-3xl bg-white p-10 shadow-xl">
          <div className="border-b border-slate-200 pb-8">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Race Performance Report</p>
                <h2 className="text-4xl font-black tracking-tight">{raceName}</h2>
                <p className="mt-3 text-lg text-slate-600">{athlete} · {discipline}</p>
              </div>
              <div className="rounded-2xl bg-slate-900 px-5 py-4 text-right text-white"><p className="text-xs uppercase tracking-widest text-slate-300">Fecha</p><p className="font-semibold">{formattedDate}</p></div>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-50 p-6 md:grid-cols-3"><div className="md:col-span-2"><p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">Objetivo</p><p className="text-slate-700">{objective}</p></div><div><p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">Analista</p><p className="text-slate-700">{coach}</p></div></div>
          </div>

          <section className="py-8"><h3 className="mb-4 text-2xl font-black">Resumen ejecutivo</h3><p className="text-lg leading-8 text-slate-700">{summary}</p></section>
          <section className="py-8"><h3 className="mb-5 text-2xl font-black">Metricas principales</h3><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{metrics.map((metric, index) => <div key={index} className="rounded-3xl border border-slate-200 p-5"><p className="text-sm font-semibold text-slate-500">{metric.label}</p><p className="mt-2 text-3xl font-black">{metric.value}<span className="ml-1 text-base font-bold text-slate-500">{metric.unit}</span></p></div>)}</div></section>
          <section className="py-8"><h3 className="mb-5 text-2xl font-black">Puntos clave del analisis</h3><div className="grid gap-3">{highlights.map((item, index) => <div key={index} className="flex gap-4 rounded-2xl bg-slate-50 p-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{index + 1}</div><p className="leading-7 text-slate-700">{item}</p></div>)}</div></section>
          {images.length > 0 && <section className="page-break py-8"><h3 className="mb-5 text-2xl font-black">Graficos e imagenes WKO5</h3><div className="grid gap-6">{images.map((image, index) => <figure key={image.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white"><img src={image.url} alt={image.name} className="max-h-[520px] w-full object-contain" /><figcaption className="border-t border-slate-100 px-5 py-3 text-sm text-slate-500">Figura {index + 1}: {image.name}</figcaption></figure>)}</div></section>}
          <section className="py-8"><h3 className="mb-4 text-2xl font-black">Conclusion y proximos pasos</h3><p className="text-lg leading-8 text-slate-700">{conclusion}</p></section>
          <footer className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">Generado con WKO5 Race Report Builder · Datos e imagenes introducidos por el usuario</footer>
        </section>
      </div>
    </main>
  );
}
