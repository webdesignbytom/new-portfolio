import React, { useEffect, useState } from 'react';
// Icons
import changeIcon from '../../assets/svg/changeIcon.svg';
import { RxCross2 } from 'react-icons/rx';
// Colour picker
import { SketchPicker } from 'react-color';
import Swatches from './Swatches';
import ColourItem from './ColourItem';

function ColourPalette({ colourPaletteObject, setColourPaletteObject }) {
  const [currentColour, setCurrentColour] = useState({ background: '#ff0000' });
  const [selectedCard, setSelectedCard] = useState('cardOneBg');
  const [displayPicker, setDisplayPicker] = useState(false);

  // Card One
  const [cardOneBg, setCardOneBg] = useState('bg-[#0099ff]');
  const [rgbCardOne, setRgbCardOne] = useState('#0099ff');
  const [hexCardOne, setHexCardOne] = useState('#0099ff');
  const [hlsCardOne, setHlsCardOne] = useState('#0099ff');
  // Card two
  const [cardTwoBg, setCardTwoBg] = useState('bg-[#00ff00]');
  const [rgbCardTwo, setRgbCardTwo] = useState('#0099ff');
  const [hexCardTwo, setHexCardTwo] = useState('#0099ff');
  const [hlsCardTwo, setHlsCardTwo] = useState('#0099ff');
  // Card three
  const [cardThreeBg, setCardThreeBg] = useState('bg-[#ff0000]');
  const [rgbCardThree, setRgbCardThree] = useState('#0099ff');
  const [hexCardThree, setHexCardThree] = useState('#0099ff');
  const [hlsCardThree, setHlsCardThree] = useState('#0099ff');
  // Card four
  const [cardFourBg, setCardFourBg] = useState('bg-[#ffff00]');
  const [rgbCardFour, setRgbCardFour] = useState('#0099ff');
  const [hexCardFour, setHexCardFour] = useState('#0099ff');
  const [hlsCardFour, setHlsCardFour] = useState('#0099ff');
  // Card five
  const [cardFiveBg, setCardFiveBg] = useState('0000ff');
  const [rgbCardFive, setRgbCardFive] = useState('#0099ff');
  const [hexCardFive, setHexCardFive] = useState('#0099ff');
  const [hlsCardFive, setHlsCardFive] = useState('#0099ff');

  useEffect(() => {
    setCardFiveBg(hexCardFive)
  }, [hexCardFive])

  const closeColourPicker = () => {
    setDisplayPicker(false);
  };

  const handleChangeComplete = (color) => {
    setCurrentColour({ background: color.hex });
  };

  const setNewColour = (event) => {
    const str = String(currentColour.background);
    console.log(`bg-[${str}]`);
    let newStr = str.slice(1); // "ello World!";
    setHexCardFive(`${newStr}`);
    console.log('e.t',event.target)
  };

  const openPicker = (event) => {
    const { id } = event.target;
    setSelectedCard(id);
    setDisplayPicker(!displayPicker);
  };

  console.log('card5', cardFiveBg);
  return (
    <section className='grid grid-rows-reg'>
      <div className='text-center flex justify-between'>
        <div className='relative group flex align-middle h-full'>
          <img
            src={changeIcon}
            className='w-5 ml-4 mt-3 cursor-pointer focus:animate-spin active:animate-spin'
            alt='randomize all colours'
          />
          <div className='hidden absolute group-hover:grid border-2 border-black border-solid rounded bg-colour-pale p-1 text-sm align-middle w-[160px] cursor-pointer lg:left-0 lg:top-0 z-10 ml-8 mt-8'>
            Randomize all colours.
          </div>
        </div>
        <h2>Create the theme and style for your website</h2>
        <div></div>
      </div>
      {/* Main */}
      <section className='relative grid grid-rows-aa lg:grid-rows-2 gap-8 lg:gap-0'>
        {/* Colour Picker */}
        {displayPicker && (
          <div className='z-10 bg-white border-2 border-black border-solid dark:border-white dark:bg-black rounded p-1 absolute top-0 cursor-pointer'>
            <div className='flex justify-end my-1'>
              <RxCross2 onClick={closeColourPicker} />
            </div>
            <SketchPicker
              color={currentColour.background}
              onChange={handleChangeComplete}
            />
            <div className='flex justify-center my-2'>
              <button
                onClick={setNewColour}
                className={`py-1 px-3 outline outine-black outline-1 rounded-lg hover:bg-red-500`}
              >
                SET COLOUR
              </button>
            </div>
          </div>
        )}
        <section className='grid lg:grid-cols-xo'>
          {/* Swatches */}
          <div className='grid grid-cols-5 lg:ml-2 my-3'>
            <div className='relative overflow-hidden grid min-h-[225px] grid-rows-rev border-2 border-black border-solid rounded'>
              <div
                className={`${cardOneBg} cursor-pointer`}
                id='cardOneBg'
                onClick={openPicker}
              ></div>
              <article className='h-min text-xs'>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>RGB</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={rgbCardOne}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HEX</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hexCardOne}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HLS</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hlsCardOne}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
              </article>
              <img
                src={changeIcon}
                className='w-5 absolute right-1 top-1 cursor-pointer focus:animate-spin active:animate-spin'
                alt='change to new random colour'
              />
            </div>
            <div className='relative overflow-hidden grid min-h-[225px] grid-rows-rev border-2 border-black border-solid rounded'>
              <div
                className={`${cardTwoBg} cursor-pointer`}
                id='cardTwoBg'
                onClick={openPicker}
              ></div>
              <article className='h-min text-xs'>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>RGB</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={rgbCardTwo}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HEX</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hexCardTwo}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HLS</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hlsCardTwo}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
              </article>
              <img
                src={changeIcon}
                className='w-5 absolute right-1 top-1 cursor-pointer focus:animate-spin active:animate-spin'
                alt='change to new random colour'
              />
            </div>
            <div className='relative overflow-hidden grid min-h-[225px] grid-rows-rev border-2 border-black border-solid rounded'>
              <div
                className={`${cardThreeBg} cursor-pointer`}
                id='cardThreeBg'
                onClick={openPicker}
              ></div>
              <article className='h-min text-xs'>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>RGB</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={rgbCardThree}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HEX</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hexCardThree}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HLS</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hlsCardThree}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
              </article>
              <img
                src={changeIcon}
                className='w-5 absolute right-1 top-1 cursor-pointer focus:animate-spin active:animate-spin'
                alt='change to new random colour'
              />
            </div>
            <div className='relative overflow-hidden grid min-h-[225px] grid-rows-rev border-2 border-black border-solid rounded'>
              <div
                className={`${cardFourBg} cursor-pointer`}
                id='cardFourBg'
                onClick={openPicker}
              ></div>
              <article className='h-min text-xs'>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>RGB</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={rgbCardFour}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HEX</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hexCardFour}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HLS</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hlsCardFour}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
              </article>
              <img
                src={changeIcon}
                className='w-5 absolute right-1 top-1 cursor-pointer focus:animate-spin active:animate-spin'
                alt='change to new random colour'
              />
            </div>
            <div className='relative overflow-hidden grid min-h-[225px] grid-rows-rev border-2 border-black border-solid rounded'>
              <div
                className={`bg-[#${cardFiveBg}] cursor-pointer`}
                id='cardFiveBg'
                onClick={openPicker}
              ></div>
              <article className='h-min text-xs'>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>RGB</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={rgbCardFive}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HEX</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hexCardFive}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
                <div className='lg:flex gap-2 justify-between border-t-2 border-black border-solid lg:px-2 py-1 overflow-hidden '>
                  <h5 className='pl-2 lg:pl-0'>HLS</h5>
                  <div className='px-1 sm:px-2 lg:px-0'>
                    <input
                      type='text'
                      value={hlsCardFive}
                      className='text-placeholder-text text-xs bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-placeholder-text focus:bg-white focus:border-main-colour focus:outline-none w-full pl-1'
                    />
                  </div>
                </div>
              </article>
              <img
                src={changeIcon}
                className='w-5 absolute right-1 top-1 cursor-pointer focus:animate-spin active:animate-spin'
                alt='change to new random colour'
              />
            </div>
          </div>
          {/* Result cods */}
          <Swatches />
        </section>
        {/* Saved Options */}
        <section>
          <ul className='grid md:grid-cols-2 pb-4 lg:pb-0 lg:grid-cols-3 w-full'>
            {colourPaletteObject.map((colour, index) => {
              return (
                <ColourItem
                  key={index}
                  colour={colour}
                  openPicker={openPicker}
                />
              );
            })}
          </ul>
        </section>
      </section>
    </section>
  );
}

export default ColourPalette;
