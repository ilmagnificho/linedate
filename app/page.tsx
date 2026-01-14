import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />

      {/* 푸터 */}
      <footer className="bg-white border-t border-secondary-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">📖</span>
            <span className="font-serif font-semibold text-foreground">Linedate</span>
          </div>
          <p className="text-sm text-foreground/50">
            © 2026 Linedate. 책으로 이어지는 인연.
          </p>
        </div>
      </footer>
    </main>
  );
}
