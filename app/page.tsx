import DashboardWidget from "@/components/DashboardWidget";
import FilterWidget from "@/components/FilterWidget";
import { getAllDashboards } from "@/lib/data";

export default async function Home({
  searchParams
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''

  const dashboardData = await getAllDashboards(query)

  return (
    <div className='w-11/12 mx-auto md:w-3/5 md:mx-auto lg:w-2/5 flex flex-col divide-y divide-solid divide-gray-200'>
      <div className='flex md:flex-row flex-col justify-start items-start md:justify-between md:items-center py-4'>
        <h2 className='text-base font-semibold' role='heading' aria-roledescription="Dashboards">Dashboards</h2>
        <div>
          <FilterWidget />
        </div>
      </div>
      <div className='py-4'>
        <DashboardWidget allDashboards={dashboardData} />
      </div>
    </div>
  )
}
