import { ProductCardType } from '@/types'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto'
import { randomBytes, pbkdf2Sync } from 'crypto'

const SALT_LENGTH = 16 // Length of the salt
const ITERATIONS = 100000 // Number of PBKDF2 iterations
const KEY_LENGTH = 64 // Length of the derived key
const DIGEST = 'sha512' // Hash algorithm

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

/**
 * Checks if a billing address is empty.
 *
 * @param {Address} billing - The address to be checked.
 * @return {boolean} Whether the address is empty or not.
 *
 * @example
 * isAddressEmpty({ name: '', street: '', city: '' }) // true
 * isAddressEmpty({ name: 'John Doe', street: '', city: '' }) // false
 */
export const isAddressEmpty = (billing: Record<string, string>): boolean => {
  return Object.values(billing).some(
    (value) => value !== null && value !== undefined && value !== ''
  )
}

/**
 * Retrieves specific characteristics of a product based on the given key.
 *
 * @param {ProductCardType} product - The product from which characteristics need to be extracted.
 * @param {string} key - The key representing the characteristic to retrieve.
 * @return {string | number} - The value of the specified characteristic or a default message if not available.
 *
 * Handles the following keys:
 * - 'tags': Returns the product tags or a default message if unavailable.
 * - 'price': Formats and returns the product price or a default message if unavailable.
 * - 'options': Returns the product options in a specific format or a default message if unavailable.
 * - 'categories': Returns a comma-separated list of category names or a default message if unavailable.
 * - 'stock_quantity': Returns the stock quantity or a default message if unavailable.
 * - 'excerpt': Returns the product excerpt or a default message if unavailable.
 * - 'dimensions': Returns the product dimensions in a formatted string or a default message if unavailable.
 * - 'date': Returns the product date or a default message if unavailable.
 * - 'id': Returns the product ID.
 * - 'sale': Returns formatted sale information or a default message if unavailable.
 * - Returns a default message for unrecognized keys.
 */
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

/**
 * Generate a security token containing the customer ID and timestamp.
 * @param {string} customerId - The customer's ID.
 * @param {string} secretKey - The server-side secret key.
 * @returns {string} - The generated token.
 */
export const generateSecurityToken = (
  customerId: string,
  secretKey: string
): string => {
  const timestamp = Date.now()
  const data = `${customerId}.${timestamp}`
  const hash = crypto.createHmac('sha256', secretKey).update(data).digest('hex')
  return `${data}.${hash}`
}

/**
 * Validate a security token and extract the customer ID.
 * @param {string} token - The token to validate.
 * @param {string} secretKey - The server-side secret key.
 * @param {number} expirationTime - The time in milliseconds for token expiration.
 * @returns {string | null} - The customer ID if valid, otherwise null.
 */
export const validateSecurityToken = (
  token: string,
  secretKey: string,
  expirationTime: number
): string | null => {
  const [customerId, timestamp, hash] = token.split('.')
  if (!customerId || !timestamp || !hash) {
    return null // Token structure is invalid
  }

  const data = `${customerId}.${timestamp}`
  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(data)
    .digest('hex')

  if (hash !== expectedHash) {
    return null // Hash mismatch
  }

  const tokenAge = Date.now() - parseInt(timestamp, 10)
  if (tokenAge > expirationTime) {
    return null // Token expired
  }

  return customerId // Token is valid, return customer ID
}

/**
 * Hash a plain text password using PBKDF2.
 * @param {string} plainPassword - The plain text password to hash.
 * @returns {string} - The salt and hashed password, concatenated as a single string.
 */
export const hashPassword = (plainPassword: string): string => {
  const salt = randomBytes(SALT_LENGTH).toString('hex')
  const hash = pbkdf2Sync(
    plainPassword,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verify a plain text password against a hashed password.
 * @param {string} plainPassword - The plain text password to compare.
 * @param {string} storedPassword - The hashed password to compare against.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
export const verifyPassword = (
  plainPassword: string,
  storedPassword: string
): boolean => {
  const [salt, originalHash] = storedPassword.split(':')
  const hash = pbkdf2Sync(
    plainPassword,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex')
  return hash === originalHash
}

/**
 * Returns a color code based on the given status.
 *
 * @param {string} status - The status to determine the color for.
 * @return {string} The color code corresponding to the status.
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'pendiente':
      return '#F59E0B' // Yellow (for Pending)
    case 'completado':
      return '#10B981' // Green (for Completed)
    case 'cancelado':
      return '#EF4444' // Red (for Canceled)
    case 'procesando':
      return '#3B82F6' // Blue (for Processing)
    case 'enviado':
      return '#6366F1' // Indigo (for Shipped)
    case 'entregado':
      return '#22C55E' // Light Green (for Delivered)
    default:
      return '#6B7280' // Gray (for default/fallback)
  }
}
