import { Trip, User } from '@/types'
import { Link } from '@inertiajs/react'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CreateIcon from '@mui/icons-material/Create'

export default function TripCard({ trip, user }: { trip: Trip; user: User }) {
  console.log(trip)
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden sm:rounded-xl col-span-2">
      <div className="py-6 px-5 h-full flex flex-col">
        <div className="flex flex-col flex-grow gap-2">
          <h3 className="font-extrabold truncate">{trip.name}</h3>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              <EmojiPeopleIcon className="mr-2" />
              <span>{trip.memberCount} Members</span>
            </p>
            <p className="text-sm text-gray-600">
              <AccountBalanceIcon className="mr-2" />
              <span>{trip.totalExpenses.formatted} Total Expenses</span>
            </p>
            {user.id === trip.userId ? (
              <p className="text-sm text-gray-600">
                <CreateIcon className="mr-2" />
                <span>Created by you</span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                <CreateIcon className="mr-2" />
                <span>Invited by {trip.admin.name}</span>
              </p>
            )}
          </div>
          <p className="mt-2 mb-5">{trip.description}</p>
        </div>
        <div>
          <Link
            href={route('trip.show', { id: trip.id })}
            className="font-extrabold bg-sky-500 text-white hover:bg-sky-600 uppercase px-4 py-2 text-sm rounded"
          >
            Go to trip
          </Link>
        </div>
      </div>
    </div>
  )
}
