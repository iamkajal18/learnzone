'use client';

import { useId } from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, className, children }: RadioGroupProps) {
  const groupId = useId(); // Generate unique ID for accessibility

  return (
    <div
      role="radiogroup"
      className={className}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          // Navigate to next radio button
          const radios = document.querySelectorAll(`input[name="${groupId}"]`);
          const currentIndex = Array.from(radios).findIndex((r: any) => r.checked);
          const nextIndex = (currentIndex + 1) % radios.length;
          (radios[nextIndex] as HTMLInputElement).focus();
          (radios[nextIndex] as HTMLInputElement).checked = true;
          onValueChange((radios[nextIndex] as HTMLInputElement).value);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          // Navigate to previous radio button
          const radios = document.querySelectorAll(`input[name="${groupId}"]`);
          const currentIndex = Array.from(radios).findIndex((r: any) => r.checked);
          const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
          (radios[prevIndex] as HTMLInputElement).focus();
          (radios[prevIndex] as HTMLInputElement).checked = true;
          onValueChange((radios[prevIndex] as HTMLInputElement).value);
        }
      }}
    >
      {children}
    </div>
  );
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export function RadioGroupItem({ value, id, checked, onChange }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      name={id.split('-')[0]} // Use groupId from parent for unique name
      value={value}
      id={id}
      checked={checked}
      onChange={(e) => {
        if (e.target.checked && onChange) {
          onChange(value);
        }
      }}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
  );
}