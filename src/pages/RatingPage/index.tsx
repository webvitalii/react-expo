import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import Rating from '@/components/Rating';

const RatingPage = () => {
  const [rating, setRating] = useState(4);
  const [rating10, setRating10] = useState(7);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <PageLayout
      title={
        <>
          Rating: {rating} // {rating10}
        </>
      }
    >
      <Rating value={rating} onChange={handleRatingChange} className="mb-5" />

      <Rating value={rating} onChange={handleRatingChange} className="mb-5" />

      <Rating value={rating10} maxRating={10} onChange={setRating10} size={20} className="mb-5" />
    </PageLayout>
  );
};

export default RatingPage;
