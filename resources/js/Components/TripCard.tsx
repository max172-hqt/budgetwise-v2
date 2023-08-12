import {Trip} from '@/types'
import {Link} from '@inertiajs/react'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function TripCard({trip}: { trip: Trip }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2">
            <div className="py-6 px-5 h-full flex flex-col">
                <div className="flex flex-col flex-grow gap-2">
                    <h3 className="font-extrabold truncate">{trip.name}</h3>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-600">
                            <EmojiPeopleIcon className="mr-2"/>
                            <span>
                                {trip.memberCount} Members
                            </span>
                        </p>
                        <p className="text-sm text-gray-600">
                            <AccountBalanceIcon className="mr-2"/>
                            <span>
                            {trip.totalExpenses.formatted} Total Expenses
                        </span>
                        </p>
                    </div>
                    <p className="mt-2 mb-5">{trip.description}</p>
                </div>
                <div>
                    <Link
                        href={route('trip.show', {id: trip.id})}
                        className="font-extrabold bg-emerald-500 text-white hover:bg-emerald-600 uppercase px-4 py-2 text-sm rounded"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
