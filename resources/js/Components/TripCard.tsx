import { Trip } from '@/types'
import { Link } from '@inertiajs/react'

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2">
      <div className="py-6 px-5 h-full flex flex-col">
        <div className="flex-grow">
          <h3 className="font-semibold truncate">{trip.name}</h3>
          <p className="text-sm text-gray-600">{trip.members_count} members</p>
          <p className="my-6">{trip.description}</p>
        </div>
        <div>
          <Link
            href={route('trip.show', { id: trip.id })}
            className="font-extrabold bg-emerald-500 text-white hover:bg-emerald-600 uppercase px-4 py-2 text-sm rounded"
          >
          Details
          </Link>
        </div>
      </div>
    </div>
  )
}
