import PageTitle from '@/components/Helpers/PageTitle'
import { Star } from 'lucide-react'

const products = [
  {
    name: 'Apple MacBook Air 13.3-Inch Display',
    image: `${process.env.NEXT_PUBLIC_URL}/assets/images/product-img-15.jpg`,
    price: '$6.99',
    rating: 4.8,
    reviews: 10,
    model: 'Apple MacBook Air 13"',
    brand: 'Apple',
    availability: 'In Stock',
    colors: ['#649EFF', '#BAFE90', '#FF7173'],
    processor: 'Apple M1 chip with 8-core CPU and 7-core GPU',
    display: '13.3-inch',
    memory: '8GB RAM',
    storage: '1TB 5400rpm SATA HDD',
    graphics: 'Intel UHD Graphics 600',
    operatingSystem: 'macOS',
    battery: 'Built-in 49.9‑watt‑hour',
    wifi: '802.11ac Wi-Fi wireless',
    bluetooth: '5.0 wireless technology',
    webcam: '720p FaceTime HD camera'
  }
  // Add other products here
]

const CompaireProductsPage = () => {
  return (
    <main className='comparar-productos-wrapper w-full bg-white pb-[40px]'>
      <div className='mb-5 w-full'>
        <PageTitle
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Compara Productos', path: '/comparar-productos' }
          ]}
          title='Comparación de Productos'
        />
      </div>

      <div className='container-x mx-auto'>
        <div className='border-gray-500-border w-full border'>
          <table className='table-wrapper'>
            <tbody>
              <tr className='table-row-wrapper'>
                <td className='w-[233px] bg-[#FAFAFA] px-[26px] pt-[30px] align-top'>
                  <h1 className='text-qblack mb-4 text-[18px] font-medium'>
                    Comparación de Productos
                  </h1>
                  <p className='text-gray-500two text-[13px]'>
                    Selecciona productos para ver las diferencias y similitudes
                    entre ellos
                  </p>
                </td>
                {products.map((product, index) => (
                  <td
                    key={index}
                    className='product border-gray-500-border w-[235px] border-b border-r bg-white p-6'
                  >
                    <div className='product-img mb-3 flex justify-center'>
                      <div className='h-[161px] w-[161px]'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='h-full w-full object-contain'
                        />
                      </div>
                    </div>
                    <p className='text-qblack mb-2 text-center text-[15px] font-medium leading-[24px]'>
                      {product.name}
                    </p>
                    <p className='text-center text-[15px] font-medium leading-[24px] text-red-500'>
                      {product.price}
                    </p>
                  </td>
                ))}
              </tr>
              <tr className='table-row-wrapper'>
                <td className='w-[233px] bg-[#FAFAFA] px-[26px] align-top'>
                  <h1 className='text-qblack text-[15px] font-medium'>
                    Star Rating
                  </h1>
                </td>
                {products.map((product, index) => (
                  <td
                    key={index}
                    className='product border-gray-500-border w-[235px] border-r bg-white px-6 pb-[20px] align-top'
                  >
                    <div className='flex items-center space-x-2'>
                      <span className='text-qblack text-[15px] font-medium'>
                        {product.rating}
                      </span>
                      <div className='flex items-center'>
                        {Array.from({ length: Math.round(product.rating) }).map(
                          (_, i) => (
                            <Star key={i} />
                          )
                        )}
                      </div>
                      <span className='text-gray-500two text-[13px] font-normal'>
                        ({product.reviews})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              {[
                { label: 'Model', key: 'model' },
                { label: 'Brand', key: 'brand' },
                { label: 'Availability', key: 'availability' },
                { label: 'Processor', key: 'processor' },
                { label: 'Display', key: 'display' },
                { label: 'Memory', key: 'memory' },
                { label: 'Storage', key: 'storage' },
                { label: 'Graphics', key: 'graphics' },
                { label: 'Operating System', key: 'operatingSystem' },
                { label: 'Battery', key: 'battery' },
                { label: 'Wi-Fi', key: 'wifi' },
                { label: 'Bluetooth', key: 'bluetooth' },
                { label: 'WebCam', key: 'webcam' }
              ].map((attribute) => (
                <tr className='table-row-wrapper' key={attribute.key}>
                  <td className='w-[233px] bg-[#FAFAFA] px-[26px] align-top'>
                    <h1 className='text-qblack text-[15px] font-medium'>
                      {attribute.label}
                    </h1>
                  </td>
                  {products.map((product, index) => (
                    <td
                      key={index}
                      className='product border-gray-500-border w-[235px] border-r bg-white px-6 pb-[20px] align-top'
                    >
                      <span className='text-gray-500two text-[13px] font-normal'>
                        {product[attribute.key as keyof typeof product]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr className='table-row-wrapper'>
                <td className='w-[233px] bg-[#FAFAFA] px-[26px] align-top'>
                  <h1 className='text-qblack text-[15px] font-medium'>
                    Colors
                  </h1>
                </td>
                {products.map((product, index) => (
                  <td
                    key={index}
                    className='product border-gray-500-border w-[235px] border-r bg-white px-6 pb-[20px] align-top'
                  >
                    <div className='flex items-center space-x-2'>
                      {product.colors.map((color, colorIndex) => (
                        <span
                          key={colorIndex}
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default CompaireProductsPage
