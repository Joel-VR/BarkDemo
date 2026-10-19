import { Storefront } from '@/components/storefront'
import { RewardsExperience } from '@/components/rewards-experience'
import { categories, products } from '@/data/catalog'

const fixedRoutes = ['productos', 'promociones', 'recompensas', 'carrito', 'checkout', 'nosotros', 'favoritos']

export function generateStaticParams() {
  const routes = [
    ...fixedRoutes.map((route) => [route]),
    ...products.map((product) => ['productos', product.slug]),
    ...categories.map((category) => ['categoria', category.slug]),
    ['categoria', 'creatinas'],
    ['categoria', 'proteinas'],
  ]
  return routes.map((slug) => ({ slug }))
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const route = '/' + slug.join('/')
  return route === '/recompensas' ? <RewardsExperience /> : <Storefront initialPage={route} />
}
