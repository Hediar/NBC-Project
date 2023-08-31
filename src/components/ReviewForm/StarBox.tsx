import React from 'react';

type Props = {
  rating: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
};

const StarBox = ({ rating, setRating, readOnly = false }: Props) => {
  const handleChange = setRating ? (e: React.ChangeEvent<HTMLInputElement>) => setRating(+e.target.value) : undefined;

  return (
    <span className="inline-block relative text-[32px] text-gray-300">
      ★★★★★
      <span
        style={{ width: `${rating * 20}%` }}
        className={`absolute left-0 w-[${rating * 20}%] text-rose-500 overflow-hidden pointer-events-none`}
      >
        ★★★★★
      </span>
      <input
        className="absolute w-[100%] h-[100%] left-0 opacity-0"
        type="range"
        onChange={handleChange}
        value={rating}
        step="0.5"
        min="0"
        max="5"
        readOnly={readOnly}
      />
    </span>
  );
};

export default StarBox;
