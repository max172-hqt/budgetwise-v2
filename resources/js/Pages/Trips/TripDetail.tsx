import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, Trip } from '@/types'

export default function Trips({ auth, trip }: PageProps<{ trip: Trip }>) {
  console.log(trip)
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {trip.name}
        </h2>
      }
    >
      <Head title="My Trips" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2">
            <div className="py-6 px-5 h-full flex flex-col">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
