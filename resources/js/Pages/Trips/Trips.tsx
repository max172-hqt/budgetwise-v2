import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { PageProps, Trip } from '@/types'
import TripCard from '@/Components/TripCard'
import { useMemo, useState } from 'react'

function Trips({ auth, trips }: PageProps<{ trips: Trip[] }>) {
  const [filter, setFilter] = useState<string>('all')

  const filteredTrips = useMemo(() => {
    if (filter === 'all') {
      return trips
    }

    if (filter === 'created') {
      return trips.filter((trip) => trip.userId === auth.user.id)
    }

    return trips.filter((trip) => trip.userId !== auth.user.id)
  }, [trips, filter])

  return (
    <>
      <Head title="My Trips" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white py-8 rounded-xl">
          <div className="flex mb-5 items-center gap-4">
            <Link
              href={route('trip.create')}
              className="self-center font-extrabold bg-green-500 rounded text-white hover:bg-green-600 uppercase px-4 py-2"
            >
              Create Trip
            </Link>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              required
            >
              <option>Choose a filter</option>
              <option value="all">All</option>
              <option value="created">Created Trips</option>
              <option value="invited">Invited Trips</option>
            </select>
          </div>
          <div>
            {filteredTrips.length > 0 ? (
              <>
                <div className="lg:grid lg:grid-cols-6 gap-4">
                  {trips.map((trip) => (
                    <TripCard trip={trip} user={auth.user} key={trip.id} />
                  ))}
                </div>
              </>
            ) : (
              <p className='text-gray-500 font-bold'>No trips to show</p>
            )}
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
