'use server'

// * ASSETS IMPORTS
import { auth } from '@/lib/auth'
import { CheckoutUser, checkoutUser } from '@/lib/schemas'
import { hashPassword } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Address, Costumer } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { Logger } from 'next-axiom'

// * Utility function to create an address object.
const createAddress = (
  data: CheckoutUser,
  type: 'billingAddress' | 'shippingAddresses'
): Address & { _key: string } => ({
  _key: uuid(),
  _type: 'address',
  address1: data[type].address1,
  address2: data[type].address2,
  city: data[type].city,
  companyName: data.companyName,
  IdDocument: data.IdDocument,
  email: data.email,
  phone: data[type].phone,
  postcode: data[type].postcode,
  state: data[type].state,
  firstName: `${data.firstName} ${data.lastName}`,
  createdAt: new Date().toISOString()
})

const log = new Logger()

const checkoutLogic = async (
  values: CheckoutUser,
  newUser: boolean,
  newShippingAddress: boolean
) => {
  try {
    const session = await auth()

    if (!session?.user?.id && !newUser) {
      log.error('User session is invalid or expired.', {
        where: 'checkoutLogic'
      })
      return {
        success: false,
        message: 'User session is invalid or expired.'
      }
    }

    let userId = session?.user?.id

    // * VALIDATION
    const parsedValue = checkoutUser.safeParse(values)
    if (!parsedValue.success) {
      log.error('Validation failed.', {
        where: 'checkoutLogic',
        error: parsedValue.error.issues[0]?.message
      })
      return {
        success: false,
        message: parsedValue.error.issues[0]?.message || 'Validation failed.'
      }
    }

    // * CHECK IF USER ALREADY EXISTS
    const customerAlreadyExist = await sanityClientWrite.fetch(
      `*[_type == 'costumer' && email == $email][0]`,
      {
        email: parsedValue.data.email
      }
    )

    const {
      email,
      firstName,
      lastName,
      userName,
      password,
      IdDocument,
      companyName
    } = parsedValue.data

    if (newUser) {
      if (customerAlreadyExist) {
        log.error('the user already exist', {
          where: 'checkoutLogic'
        })
        return {
          success: false,
          message:
            'Ya tienes una cuenta con nosotros, puedes iniciar session en la pagina principal!'
        }
      }

      const hashedPassword = hashPassword(password)
      const newCustomer: Costumer = {
        _type: 'costumer',
        _id: `customer-${uuid()}`,
        email,
        firstName,
        lastName,
        companyName,
        IdDocument,
        isPayingCustomer: true,
        userName,
        password: hashedPassword,
        avatarUrl: {
          _type: 'image',
          asset: {
            _ref: 'image-41d80eb83a0e887107ab47d84002a24aef786447-96x96-jpg',
            _type: 'reference'
          }
        },
        billingAddress: [createAddress(parsedValue.data, 'billingAddress')],
        shippingAddresses: newShippingAddress
          ? [createAddress(parsedValue.data, 'shippingAddresses')]
          : [],
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: uuid()
      }

      await sanityClientWrite.createIfNotExists(newCustomer)

      userId = newCustomer._id
    } else {
      await sanityClientWrite
        .patch(session?.user?.id || '')
        .set({
          email,
          firstName,
          lastName,
          userName,
          companyName,
          IdDocument,
          isPayingCustomer: true,
          billingAddress: [createAddress(parsedValue.data, 'billingAddress')],
          shippingAddresses: newShippingAddress
            ? [createAddress(parsedValue.data, 'shippingAddresses')]
            : []
        })
        .commit()
    }

    log.info('data updated', { where: 'checkoutLogic' })
    return {
      success: true,
      message: 'Datos actualizados',
      userId
    }
  } catch (error) {
    log.error('An error occurred while processing the request.', {
      where: 'checkoutLogic',
      data: error
    })
    return {
      success: false,
      message:
        // @ts-expect-error ignore
        error?.message || 'An error occurred while processing the request.'
    }
  }
}

export default checkoutLogic
