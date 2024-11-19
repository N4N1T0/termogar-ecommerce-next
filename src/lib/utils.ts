import { ProductCardType } from '@/types'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that merges and normalizes CSS class names using Tailwind CSS.
 *
 * @param {string | undefined | string[]} inputs - The CSS class names to merge.
 * @return {string | undefined} - The merged and normalized CSS class names.
 *
 * @example
 * cn('bg-red-500', 'text-white', 'rounded-full', 'p-2') // 'bg-red-500 text-white rounded-full p-2'
 * cn('bg-red-500', undefined, 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 * cn('bg-red-500', [], 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 */
export function cn(...inputs: Array<string | undefined>): string | undefined {
  return twMerge(clsx(inputs))
}

/**
 * A utility function that formats a number as a Euro currency string.
 *
 * @param {number} number - The number to be formatted as Euro currency.
 * @return {string} The formatted Euro currency string.
 *
 * @example
 * eurilize(1000) // "€1,000.00"
 * eurilize(50.5) // "€50.50"
 * eurilize(12345.6789) // "€12,345.68"
 */
export function eurilize(number: number): string {
  return number.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })
}

export const handleCompareTableCharacteristics = (
  product: ProductCardType,
  key: string
) => {
  switch (key) {
    case 'tags':
      return product.tags || 'No hay etiquetas disponibles'
    case 'price':
      return product.price !== null
        ? `${eurilize(product.price)}`
        : 'Precio no disponible'
    case 'options':
      return product.options
        ? `${product.options.name || 'Opción'}: ${product.options.values?.join(', ') || 'N/A'}`
        : 'No hay opciones disponibles'
    case 'categories':
      return product.categories
        ? product.categories.map((category) => category.name).join(', ')
        : 'No hay categorías disponibles'
    case 'stock_quantity':
      return product.stockQuantity !== null
        ? product.stockQuantity
        : 'Cantidad en stock no disponible'
    case 'excerpt':
      return product.excerpt || 'Descripción no disponible'
    case 'dimensions':
      return product.dimensions
        ? `L: ${product.dimensions.length || 'N/A'}, A: ${product.dimensions.width || 'N/A'}, H: ${product.dimensions.height || 'N/A'}, Peso: ${product.dimensions.weight || 'N/A'}`
        : 'Dimensiones no disponibles'
    case 'date':
      return product.date || 'Fecha no disponible'
    case 'id':
      return product.id
    case 'sale':
      return product.sale
        ? `Precio de oferta: ${eurilize(product.sale.price || 0) || 'N/A'}, Desde: ${new Date(product.sale.from || new Date()).toLocaleDateString('es-ES') || 'N/A'}, Hasta: ${new Date(product.sale.to || new Date()).toLocaleDateString('es-ES') || 'N/A'}`
        : 'No hay información de oferta disponible'
    default:
      return 'Característica no encontrada'
  }
}
