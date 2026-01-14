import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />

      {/* Footer */}
      <footer className="py-8 bg-secondary-200 border-t border-secondary-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">📚</span>
            <span className="font-serif text-xl font-bold text-primary-900">DeckDrop</span>
          </div>
          <p className="text-sm text-primary-500">
            © 2026 DeckDrop. 책으로 시작하는 인연.
          </p>
        </div>
      </footer>
    </main>
  );
}
