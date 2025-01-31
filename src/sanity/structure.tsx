import type { StructureResolver } from 'sanity/structure'

// Assets Icons
import {
  BadgeEuro,
  BookOpenText,
  BookOpen,
  StickyNote,
  ShoppingBasket,
  UserRoundPen,
  Tag,
  Filter,
  UserPen,
  Building2,
  FileUser,
  CircleDollarSign,
  ChartBarStacked,
  Bell
} from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Termogar CMS')
    .items([
      S.listItem()
        .title('Contenido')
        .icon(() => <BookOpen className='h-4 w-4' />)
        .child(
          S.list()
            .title('Contenido del Sitio')
            .items([
              S.documentTypeListItem('page')
                .title('Paginas WP')
                .icon(() => <BookOpenText className='h-4 w-4' />),
              S.divider(),
              S.listItem()
                .title('Pagina Principal')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(S.document().schemaType('homePage')),
              S.listItem()
                .title('Pagina de Ofertas')
                .icon(() => <CircleDollarSign className='h-4 w-4' />)
                .child(S.document().schemaType('offerPage')),
              S.divider(),
              S.documentTypeListItem('post')
                .title('Entradas')
                .icon(() => <StickyNote className='h-4 w-4' />),
              S.documentTypeListItem('author')
                .title('Autores')
                .icon(() => <UserRoundPen className='h-4 w-4' />),
              S.documentTypeListItem('tag')
                .title('Etiquetas')
                .icon(() => <Tag className='h-4 w-4' />),
              S.documentTypeListItem('category')
                .title('Categorías')
                .icon(() => <Filter className='h-4 w-4' />),
              S.documentTypeListItem('subscriberNewsletter')
                .title('Suscriptores')
                .icon(() => <UserPen className='h-4 w-4' />)
            ])
        ),
      S.listItem()
        .title('Comercio')
        .icon(() => <BadgeEuro className='h-4 w-4' />)
        .child(
          S.list()
            .title('Productos & Ventas')
            .items([
              S.documentTypeListItem('product')
                .title('Productos')
                .icon(() => <ShoppingBasket className='h-4 w-4' />),
              S.documentTypeListItem('productCategory')
                .title('Categorías')
                .icon(() => <Filter className='h-4 w-4' />),
              S.documentTypeListItem('productTag')
                .title('Etiquetas')
                .icon(() => <Tag className='h-4 w-4' />),
              S.documentTypeListItem('coupon')
                .title('Cupones')
                .icon(() => <BadgeEuro className='h-4 w-4' />),
              S.documentTypeListItem('brand')
                .title('Marcas')
                .icon(() => <Building2 className='h-4 w-4' />),
              S.divider(),
              S.documentTypeListItem('costumer')
                .title('Clientes')
                .icon(() => <FileUser className='h-4 w-4' />),
              S.documentTypeListItem('order')
                .title('Ordenes de Compra')
                .icon(() => <CircleDollarSign className='h-4 w-4' />),
              S.divider(),
              S.documentTypeListItem('productVariant')
                .title('Variantes de Productos')
                .icon(() => <ChartBarStacked className='h-4 w-4' />),
              S.documentTypeListItem('noStockNotifyMe')
                .title('No Stock Notificarme')
                .icon(() => <Bell className='h-4 w-4' />)
            ])
        )
    ])
