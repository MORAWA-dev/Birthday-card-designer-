
import React from 'react';
import { BirthdayCardResult } from '../types';

interface CardDisplayProps {
  result: BirthdayCardResult;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ result }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.message);
  };

  return (
    <div className="mb-12 animate-in slide-in-from-right duration-700">
      <div className="bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-4 border-white transform transition-transform hover:scale-[1.01]">
        {/* Card "Cover" / Image Portion */}
        <div className="md:w-2/5 relative min-h-[300px]">
          {result.imageUrl ? (
            <img 
              src={result.imageUrl} 
              alt="Card Art" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-7xl">
              🎈
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>

        {/* Card "Inside" Portion */}
        <div className="md:w-3/5 card-inside p-8 md:p-12 relative flex flex-col justify-between min-h-[400px]">
          {/* Vertical Crease Shadow */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-200/50 to-transparent pointer-events-none"></div>
          
          <div>
            <div className="text-3xl font-handwriting text-indigo-600 mb-6 border-b-2 border-indigo-100 inline-block">
              To: {result.recipientName}
            </div>
            
            <p className="text-2xl md:text-3xl font-handwriting text-gray-800 leading-relaxed mb-8 min-h-[150px]">
              {result.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
            <div className="text-xl font-handwriting text-indigo-500">
              With Love, <br/>
              The AI 🤖✨
            </div>
            
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-100 transition-colors flex items-center space-x-2 border border-indigo-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              <span>Copy Text</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
