import { AsyncPublishProps, ParentProduct } from '@/types'
import { ShoppingBasket } from 'lucide-react'
import { DocumentActionComponent, DocumentActionsContext } from 'sanity'

export function setParent(
  context: DocumentActionsContext
): DocumentActionComponent {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncSetParent: DocumentActionComponent = (
    props: AsyncPublishProps
  ) => {
    return {
      label: 'Find Parent',
      icon: <ShoppingBasket className='h-4 w-4' />,
      onHandle: async () => {
        try {
          // Fetch the parent product
          const parent: ParentProduct | null = await client.fetch(
            `*[_type == "product" && references($id)][0]{
                "id":_id,
              }`,
            { id: props.id }
          )

          if (!parent) {
            console.warn('No parent product found for this variant.')
          } else {
            console.log('Parent found:', parent)

            // Update the `parent` field in the productVariant document
            await client
              .patch(props.id)
              .set({ parent: { _type: 'reference', _ref: parent.id } })
              .commit()
          }
        } catch (error) {
          console.error('Error updating parent field before publishing:', error)
        }
      }
    }
  }

  return asyncSetParent
}
