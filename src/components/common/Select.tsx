'use client';

import { DropdownMenu } from '@/styles/icons/Icons24';
import React, { useState } from 'react';

type Props = {
  options: { value: string; label: string }[];
  className?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
};

/**
 * 
 * @param defaultValue string(기본값으로 쓸 value)
 * @param options [
          { value: string, label: string },
        ]
 * @returns 
 */
const Select = ({ defaultValue, options, className, onChange }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string }>(
    options.find((option) => option.value === defaultValue) || options[0]
  );

  const onBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
    const next = e.relatedTarget;
    if (next instanceof HTMLLIElement == false) setIsDropdownOpen(false);
  };

  return (
    <div className={className}>
      <div className="relative">
        <button
          type="button"
          className="min-w-[136px] w-full h-11 pl-5 pr-2.5 py-2.5 bg-white rounded-xl border border-zinc-300 justify-start items-center gap-2 inline-flex hover:border-neutral-800 transition-colors"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          onBlur={onBlur}
        >
          <div className="w-full body1_regular_suit text-left">{selectedOption.label}</div>
          <DropdownMenu className="cursor-pointer opacity-70 hover:opacity-100 transform hover:scale-110 hover:ease-out duration-200" />
        </button>

        {isDropdownOpen && (
          <div className="absolute mt-2 w-full z-10 ">
            <ul className="overflow-hidden rounded-xl border border-neutral-800 bg-white py-2">
              {options.map((option, i: number) => {
                return (
                  <li
                    className="px-3 hover:bg-gray-200 cursor-pointer py-1 body1_regular_suit hover:body1_bold_suit  transition-colors"
                    key={option.value + i}
                    onClick={() => {
                      setSelectedOption(option);
                      setIsDropdownOpen(false);
                      onChange(option.value);
                    }}
                    tabIndex={-1}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
