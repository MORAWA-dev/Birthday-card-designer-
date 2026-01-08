
import React, { useState } from 'react';
import { BirthdayCardRequest } from '../types';

interface CardFormProps {
  onSubmit: (data: BirthdayCardRequest) => void;
  isLoading: boolean;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BirthdayCardRequest>({
    name: '',
    age: '',
    hobby: '',
    tone: 'funny'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.hobby) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Birthday Star's Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Grandma Betty"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age (Optional)</label>
          <input
            type="number"
            placeholder="e.g. 75"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Favorite Hobby/Obsession</label>
        <input
          type="text"
          required
          placeholder="e.g. aggressive knitting, sourdough baking, skydiving"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
          value={formData.hobby}
          onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Humor Level</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['funny', 'savage', 'punny', 'wholesome'] as const).map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setFormData({ ...formData, tone })}
              className={`py-2 px-4 rounded-xl text-sm font-medium capitalize transition-all border ${
                formData.tone === tone
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-200 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Cooking Up Some Humorous Magic...</span>
          </>
        ) : (
          <span>Generate Birthday Magic! ✨</span>
        )}
      </button>
    </form>
  );
};

export default CardForm;
