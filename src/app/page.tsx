import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-primary-foreground md:text-7xl">
          MLR Estudio Creativo
        </h1>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Diseño con alma. Agendas, papelería y experiencias creativas.
        </p>

        <div className="flex gap-4 justify-center pt-8">
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Ver Catálogo
          </button>
          <button className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-secondary/20">
            Contacto
          </button>
        </div>

        {/* Placeholder for Product Grid */}
        <div className="mt-20 p-8 border-2 border-dashed border-primary/30 rounded-3xl bg-card/50">
          <p className="text-muted-foreground">Aquí irán los productos destacados...</p>
        </div>
      </div>
    </main>
  );
}
