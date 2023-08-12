import { PageProps, Trip } from '@/types'

export default function Summary({ auth, trip }: PageProps<{ trip: Trip }>) {
  console.log(trip);
  return (
    <div>
      <header className="px-5 py-4">
        <h2 className="font-bold text-gray-800 text-4xl">{trip.totalExpenses.formatted}</h2>
        <div className='text-gray-500'>Total Trip Expenses</div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          You have no pending debts
        </div>
      </div>
    </div>
  )
}
