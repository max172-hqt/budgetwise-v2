import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, Trip } from '@/types'
import TripCard from '@/Components/TripCard'

export default function Trips({ auth, trips }: PageProps<{ trips: Trip[] }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          My Trips
        </h2>
      }
    >
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
    </AuthenticatedLayout>
  )
}
