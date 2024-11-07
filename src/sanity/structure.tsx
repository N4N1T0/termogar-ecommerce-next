import type { StructureResolver } from 'sanity/structure'

// Assets Icons
import {
  BadgeEuro,
  BookOpenText,
  BookOpen,
  BookText,
  Calendar,
  ClipboardType,
  Footprints,
  IdCard,
  Mail,
  Map,
  StickyNote,
  PanelsTopLeft,
  RectangleEllipsis,
  ShoppingBasket,
  Ticket,
  UserRound,
  UserRoundPen,
  Tag,
  Filter
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
                .title('Paginas')
                .icon(() => <BookOpenText className='h-4 w-4' />),
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
                .icon(() => <Filter className='h-4 w-4' />)
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
                .icon(() => <Tag className='h-4 w-4' />)
            ])
        )
    ])
