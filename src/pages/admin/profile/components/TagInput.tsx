import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
  description?: string;
}

export const TagInput = ({ label, tags, onChange, placeholder, description }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
      e.preventDefault();
      onChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="md:col-span-1">
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      
      <div 
        className="w-full min-h-[52px] p-2 rounded-xl border border-slate-300 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all flex flex-wrap gap-2 cursor-text"
        onClick={() => document.getElementById(`tag-input-${label}`)?.focus()}
      >
        {tags.map((tag, index) => (
          <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg shadow-sm">
            {tag}
            <button 
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="text-blue-400 hover:text-red-500 hover:bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </span>
        ))}

        <input
          id={`tag-input-${label}`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none focus:outline-none min-w-[150px] text-sm px-2 py-1 text-slate-700"
        />
      </div>
      {description && <p className="text-xs text-slate-400 mt-2 font-medium">{description}</p>}
    </div>
  );
};