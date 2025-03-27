import { Facebook, Instagram, Youtube } from 'lucide-react'
import {
  Body,
  Container,
  Column,
  Img,
  Link,
  Row,
  Section,
  Html,
  Head,
  Font,
  Preview,
  Tailwind,
  Text,
  Hr
} from '@react-email/components'

const TailwindWrapper = ({
  previewText,
  children
}: {
  previewText: string
  children: React.ReactNode
}) => {
  const baseUrl =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://termogar.es'

  return (
    <Html>
      <Head>
        <Font
          fontFamily='Inter'
          fallbackFontFamily='Helvetica'
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            format: 'woff2'
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                accent: '#FF0000',
                secondary: '#F94200',
                tertiary: '#DD4F33'
              },
              borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
              }
            }
          }
        }}
      >
        <Body className='mx-auto my-10 bg-gray-100 font-sans antialiased'>
          <Container className='rounded border border-solid border-gray-200 bg-white px-8'>
            <Section className='pb-5 pt-10'>
              <Row>
                <Column className='w-[45%]'>
                  <Link href={`${baseUrl}/`}>
                    <Img
                      src='https://termogar-ecommerce-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftermogar_logo1-02.ebfa0838.png&w=256&q=75'
                      width='140'
                      height='60'
                      alt='company-logo'
                      className='aspect-square'
                    />
                  </Link>
                </Column>
                <Column align='right'>
                  <Row align='right'>
                    <Column>
                      <Link
                        className='mx-2 text-gray-600 no-underline'
                        href={`${baseUrl}/categorias`}
                      >
                        Productos
                      </Link>
                    </Column>
                    <Column>
                      <Link
                        className='mx-2 text-gray-600 no-underline'
                        href={`${baseUrl}/categorias`}
                      >
                        Categorias
                      </Link>
                    </Column>
                    <Column>
                      <Link
                        className='mx-2 text-gray-600 no-underline'
                        href={`${baseUrl}/blog`}
                      >
                        Blog
                      </Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
            <Hr />
            {children}
            <Hr />
            <Section className='pt-5'>
              <Row>
                <Column className='w-[45%]'>
                  <Img
                    src='https://termogar-ecommerce-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftermogar_logo1-02.ebfa0838.png&w=256&q=75'
                    width='140'
                    height='60'
                    alt='company-logo'
                    className='aspect-square'
                  />
                  <Text className='mt-1 text-[16px] font-semibold text-gray-900'>
                    Termogar
                  </Text>
                  <Text className='mt-1 text-[14px] text-gray-500'>
                    956 861 081 / 667 525 413
                  </Text>
                </Column>
                <Column align='left' className='table-cell align-bottom'>
                  <Row className='table-cell h-[42px] w-full align-bottom'>
                    <Column>
                      <Link
                        href='https://es-es.facebook.com/termogar'
                        target='_blank'
                        className='mr-2 flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
                      >
                        <Facebook className='text-gray-50' size={20} />
                      </Link>
                    </Column>
                    <Column>
                      <Link
                        href='https://www.instagram.com/termogar.es/'
                        className='mr-2 flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
                      >
                        <Instagram className='text-gray-50' size={20} />
                      </Link>
                    </Column>
                    <Column>
                      <Link
                        href='https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
                        className='mr-2 flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
                      >
                        <Youtube className='text-gray-50' size={20} />
                      </Link>
                    </Column>
                  </Row>
                  <Row>
                    <Text className='my-2 text-[14px] text-gray-500'>
                      C/ Cerrajería, 12 - Polígono el Palmar. CP: 11500, El
                      Puerto de Santa María (Cádiz)
                    </Text>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default TailwindWrapper
