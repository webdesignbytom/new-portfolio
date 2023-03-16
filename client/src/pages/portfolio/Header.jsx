import React from 'react';
import SocialBar from '../../components/social/SocialBar';

function Header() {
  return (
    <header className='grid relative h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] bg-blue-300 justify-center items-center'>
      <section className='text-center'>
        <h4>Hello I am</h4>
        <h1 className='text-4xl py-4'>Tom Brockington</h1>
        <h5 className='text-light'>
          FullStack Developer and Electrical Engineer
        </h5>
        <h5 className='text-light'>
          Available to hire for private or full-time dev work
        </h5>
        <div className='mt-8 flex gap-4'>
          <button className='bg-main-colour grid justify-center p-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-colour-light hover:shadow-lg focus:bg-colour-med focus:shadow-lg focus:outline-none focus:ring-0 active:bg-colour-dark active:shadow-lg transition duration-150 ease-in-out w-full '>
            Download CV
          </button>
          <button className='bg-main-colour grid justify-center p-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-colour-light hover:shadow-lg focus:bg-colour-med focus:shadow-lg focus:outline-none focus:ring-0 active:bg-colour-dark active:shadow-lg transition duration-150 ease-in-out w-full '>
            Contact
          </button>
        </div>
      </section>
      <section className='absolute bottom-10 flex justify-between w-full px-10'>
        <div><SocialBar /></div>
        <div>a</div>
      </section>
    </header>
  );
}

export default Header;
