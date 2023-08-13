import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, Trip } from '@/types'
import TripCard from '@/Components/TripCard'

function Trips({ auth, trips }: PageProps<{ trips: Trip[] }>) {
  return (
    <>
      <Head title="My Trips" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-6 gap-4">
            {trips.map((trip) => (
              <TripCard trip={trip} key={trip.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Trips.layout = (page: any) => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        My Trips
      </h2>
    }
    user={page.props.auth.user}
    children={page}
  />
)

export default Trips
