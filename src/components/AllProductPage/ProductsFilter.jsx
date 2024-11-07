import RangeSlider from 'react-range-slider-input'
import Checkbox from '../Helpers/Checkbox'

export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler
}) {
  return (
    <>
      <div
        className={`filter-widget fixed left-0 top-0 z-10 h-screen w-full overflow-y-scroll bg-white px-[30px] pt-[40px] lg:relative lg:h-auto lg:overflow-y-auto ${
          className || ''
        } ${filterToggle ? 'block' : 'hidden lg:block'}`}
      >
        <div className='filter-subject-item border-gray-500-border border-b pb-10'>
          <div className='subject-title mb-[30px]'>
            <h1 className='font-500 text-base text-black'>
              Product categories
            </h1>
          </div>
          <div className='filter-items'>
            <ul>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='mobileLaptop'
                      name='mobileLaptop'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.mobileLaptop}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='mobileLaptop'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Mobile & Laptops
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='gaming'
                      name='gaming'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.gaming}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='gaming'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Gaming Entertainment
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='imageVideo'
                      name='imageVideo'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.imageVideo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='imageVideo'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Image & Video
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='vehicles'
                      name='vehicles'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.vehicles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='vehicles'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Vehicles
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='furnitures'
                      name='furnitures'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.furnitures}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='furnitures'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Furnitures
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sport'
                      name='sport'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sport}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sport'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Sport
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='foodDrinks'
                      name='foodDrinks'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.foodDrinks}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='foodDrinks'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Food & Drinks
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='fashion'
                      name='fashion'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.fashion}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='fashion'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Fashion Accessories
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='toilet'
                      name='toilet'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.toilet}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='toilet'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Toilet & Sanitation
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='makeupCorner'
                      name='makeupCorner'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.makeupCorner}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='makeupCorner'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Makeup Corner
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='babyItem'
                      name='babyItem'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.babyItem}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='babyItem'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Baby Items
                    </label>
                  </div>
                </div>
                <div>
                  <span className='cursor-pointer'>
                    <svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect y='4' width='10' height='2' fill='#C4C4C4' />
                      <rect
                        x='6'
                        width='10'
                        height='2'
                        transform='rotate(90 6 0)'
                        fill='#C4C4C4'
                      />
                    </svg>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='filter-subject-item border-gray-500-border mt-10 border-b pb-10'>
          <div className='subject-title mb-[30px]'>
            <h1 className='font-500 text-base text-black'>Price Range</h1>
          </div>
          <div className='price-range mb-5'>
            <RangeSlider
              value={volume}
              onInput={volumeHandler}
              min={10}
              max={1000}
            />
          </div>
          <p className='text-qblack font-400 text-xs'>
            Price: ${volume.min} - ${volume.max}
          </p>
        </div>
        <div className='filter-subject-item border-gray-500-border mt-10 border-b pb-10'>
          <div className='subject-title mb-[30px]'>
            <h1 className='font-500 text-base text-black'>Brands</h1>
          </div>
          <div className='filter-items'>
            <ul>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='apple'
                      name='apple'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.apple}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='apple'
                      className='font-400 text-xs font-black capitalize'
                    >
                      apple
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='samsung'
                      name='samsung'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.samsung}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='samsung'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Samsung
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='walton'
                      name='walton'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.walton}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='walton'
                      className='font-400 text-xs font-black capitalize'
                    >
                      walton
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='oneplus'
                      name='oneplus'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.oneplus}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='oneplus'
                      className='font-400 text-xs font-black capitalize'
                    >
                      oneplus
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='vivo'
                      name='vivo'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.vivo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='vivo'
                      className='font-400 text-xs font-black capitalize'
                    >
                      vivo
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='oppo'
                      name='oppo'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.oppo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='oppo'
                      className='font-400 text-xs font-black capitalize'
                    >
                      oppo
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='xiomi'
                      name='xiomi'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.xiomi}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='xiomi'
                      className='font-400 text-xs font-black capitalize'
                    >
                      xiomi
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='others'
                      name='others'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.others}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='others'
                      className='font-400 text-xs font-black capitalize'
                    >
                      others
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='filter-subject-item border-gray-500-border mt-10 border-b pb-10'>
          <div className='subject-title mb-[30px]'>
            <h1 className='font-500 text-base text-black'>Storage</h1>
          </div>
          <div className='filter-items'>
            <div className='flex flex-wrap space-x-[5px]'>
              <span
                onClick={() => filterstorage('64GB')}
                className={`font-400 border-gray-500-border mb-[5px] cursor-pointer border px-[14px] py-[6px] text-xs ${
                  storage === '64GB'
                    ? 'text-qblack border-none bg-accent'
                    : 'text-gray-500'
                }`}
              >
                64GB
              </span>
              <span
                onClick={() => filterstorage('128GB')}
                className={`font-400 border-gray-500-border mb-[5px] cursor-pointer border px-[14px] py-[6px] text-xs ${
                  storage === '128GB'
                    ? 'text-qblack border-none bg-accent'
                    : 'text-gray-500'
                }`}
              >
                128GB
              </span>
              <span
                onClick={() => filterstorage('256GB')}
                className={`font-400 border-gray-500-border mb-[5px] cursor-pointer border px-[14px] py-[6px] text-xs ${
                  storage === '256GB'
                    ? 'text-qblack border-none bg-accent'
                    : 'text-gray-500'
                }`}
              >
                256GB
              </span>
              <span
                onClick={() => filterstorage('512GB')}
                className={`font-400 border-gray-500-border mb-[5px] cursor-pointer border px-[14px] py-[6px] text-xs ${
                  storage === '512GB'
                    ? 'text-qblack border-none bg-accent'
                    : 'text-gray-500'
                }`}
              >
                512GB
              </span>
              <span
                onClick={() => filterstorage('1024GB')}
                className={`font-400 border-gray-500-border mb-[5px] cursor-pointer border px-[14px] py-[6px] text-xs ${
                  storage === '1024GB'
                    ? 'text-qblack border-none bg-accent'
                    : 'text-gray-500'
                }`}
              >
                1024GB
              </span>
            </div>
          </div>
        </div>
        <div className='filter-subject-item mt-10 pb-10'>
          <div className='subject-title mb-[30px]'>
            <h1 className='font-500 text-base text-black'>Sizes</h1>
          </div>
          <div className='filter-items'>
            <ul>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sizeS'
                      name='sizeS'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sizeS'
                      className='font-400 text-xs font-black capitalize'
                    >
                      s
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sizeM'
                      name='sizeM'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeM}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sizeM'
                      className='font-400 text-xs font-black capitalize'
                    >
                      M
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sizeXL'
                      name='sizeXL'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sizeXL'
                      className='font-400 text-xs font-black capitalize'
                    >
                      XL
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sizeXXL'
                      name='sizeXXL'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeXXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sizeXXL'
                      className='font-400 text-xs font-black capitalize'
                    >
                      XXL
                    </label>
                  </div>
                </div>
              </li>
              <li className='item mb-5 flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                  <div>
                    <Checkbox
                      id='sizeFit'
                      name='sizeFit'
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeFit}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='sizeFit'
                      className='font-400 text-xs font-black capitalize'
                    >
                      Sliem Fit
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={filterToggleHandler}
          type='button'
          className='fixed right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded border border-red-500 text-red-500 lg:hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </>
  )
}
