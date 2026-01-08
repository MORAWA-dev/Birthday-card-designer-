
import React, { useState } from 'react';
import CardForm from './components/CardForm';
import CardDisplay from './components/CardDisplay';
import { BirthdayCardRequest, BirthdayCardResult, GenerationStatus } from './types';
import { generateBirthdayMessage, generateBirthdayImage } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [history, setHistory] = useState<BirthdayCardResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: BirthdayCardRequest) => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    try {
      const [message, imageUrl] = await Promise.all([
        generateBirthdayMessage(data),
        generateBirthdayImage(data)
      ]);
      
      const newCard: BirthdayCardResult = {
        id: crypto.randomUUID(),
        recipientName: data.name,
        message,
        imageUrl,
        timestamp: Date.now()
      };
      
      // Prepend to history so newest is at the top
      setHistory(prev => [newCard, ...prev]);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "The birthday magic failed. Too many candles?");
      setStatus(GenerationStatus.ERROR);
    } finally {
      // Re-enable status for next card
      if (status !== GenerationStatus.ERROR) {
         // Optionally reset to success or idle after a short delay if needed
         // But we keep success to show the latest result is done
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8">
      {/* Decorative Balloons */}
      <div className="fixed top-10 left-10 text-6xl opacity-30 floating hidden lg:block">🎈</div>
      <div className="fixed bottom-20 right-10 text-6xl opacity-30 floating hidden lg:block" style={{ animationDelay: '1s' }}>🍰</div>
      <div className="fixed top-1/2 left-5 text-6xl opacity-30 floating hidden lg:block" style={{ animationDelay: '2s' }}>🎁</div>

      <div className="max-w-7xl mx-auto">
        {/* Festive Header */}
        <header className="text-center mb-12 relative">
          <h1 className="text-6xl md:text-8xl font-comic text-gray-900 tracking-wide drop-shadow-md">
            <span className="text-pink-500">HAPPY</span> 
            <span className="text-yellow-500"> BIRTHDAY</span> 
            <span className="text-indigo-600"> WIZARD</span>
          </h1>
          <p className="text-2xl font-handwriting text-indigo-600 mt-4 max-w-xl mx-auto">
            "Turning your favorite humans into hilarious greeting cards since 2 minutes ago."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Input Form */}
          <aside className="lg:col-span-4 sticky top-10">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-1 shadow-2xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
               <CardForm onSubmit={handleGenerate} isLoading={status === GenerationStatus.LOADING} />
            </div>
            
            {error && (
              <div className="mt-6 p-4 bg-red-100 border-2 border-red-200 rounded-2xl text-red-700 text-sm font-bold flex items-center">
                <span className="mr-2 text-xl">⚠️</span> {error}
              </div>
            )}

            <div className="mt-8 p-6 bg-yellow-100/80 rounded-2xl border-2 border-yellow-200 text-yellow-800 shadow-sm rotate-1">
              <h3 className="font-bold mb-2 flex items-center"><span className="mr-2">💡</span> Pro Tip:</h3>
              <p className="text-sm italic">The more specific the hobby, the funnier the roast. Try "Competitive Nap Taker" or "Bread Scientist".</p>
            </div>
          </aside>

          {/* Right Side: Stacking Cards */}
          <main className="lg:col-span-8 space-y-8">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 border-4 border-dashed border-gray-200 rounded-[3rem]">
                <div className="text-8xl mb-4 opacity-20">👈</div>
                <h2 className="text-2xl font-comic tracking-widest uppercase">Your Masterpieces Will Appear Here</h2>
                <p className="font-handwriting text-xl">Waiting for you to summon some birthday vibes...</p>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
                  <h2 className="text-3xl font-comic text-indigo-800 tracking-wider uppercase">Generated Cards ({history.length})</h2>
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">Newest First</span>
                </div>
                {history.map((card) => (
                  <CardDisplay key={card.id} result={card} />
                ))}
              </div>
            )}
          </main>
        </div>

        <footer className="mt-32 pt-10 border-t border-indigo-200 text-center text-indigo-400 font-handwriting text-2xl">
          Created with 💖 and a LOT of digital confetti.
        </footer>
      </div>
    </div>
  );
};

export default App;
