import React, { useEffect, useState } from 'react';
import client from '../../utils/client';
// Components
import ReviewItem from './ReviewItem';
// Utils
import LoadingSpinner from '../utils/LoadingSpinner';

function ReviewsContainer() {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    client
      .get(`/reviews`)
      .then((res) => {
        setAllReviews(res.data.data.reviews);
      })
      .catch((err) => {
        console.error('Unable to get notifications', err);
      });
  }, []);

  return (
    <section className='bg-main-colour rounded mt-4 mb-10 lg:my-20 mx-4 lg:mx-10 px-1'>
      <div className='text-center text-xl py-1'>
        <h2 className='max-w-lg my-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
          <span className='relative inline-block'>
            <svg
              viewBox='0 0 52 24'
              fill='currentColor'
              className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
            >
              <defs>
                <pattern
                  id='2c67e949-4a23-49f7-bf27-ca140852cf21'
                  x='0'
                  y='0'
                  width='.135'
                  height='.30'
                >
                  <circle cx='1' cy='1' r='.7' />
                </pattern>
              </defs>
              <rect
                fill='url(#2c67e949-4a23-49f7-bf27-ca140852cf21)'
                width='52'
                height='24'
              />
            </svg>
            <span className='relative'>Reviews and Recommendations</span>
          </span>{' '}
        </h2>
      </div>
      <section className='grid'>
        {allReviews.length < 1 ? (
          <div className='grid grid-rows-1 justify-center my-8 w-full'>
            <LoadingSpinner height={'h-12 lg:h-24'} width={'w-12 lg:w-24'} />
          </div>
        ) : (
          <ul className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:justify-center my-4 mx-4'>
            {allReviews.map((review, index) => {
              if (index < 4) {
                return <ReviewItem key={index} review={review} />;
              } else {
                return;
              }
            })}
          </ul>
        )}
      </section>
    </section>
  );
}

export default ReviewsContainer;
