import { Storefront } from '@/components/storefront'
import { RewardsExperience } from '@/components/rewards-experience'
export default async function RoutePage({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const route='/'+slug.join('/');return route==='/recompensas'?<RewardsExperience/>:<Storefront initialPage={route}/>}
