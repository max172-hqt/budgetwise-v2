import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { DebtTable, PageProps, Transaction, Trip } from '@/types'
import TransactionTable from './TransactionTable'
import Summary from './Summary';

export default function TripDetail({
  auth,
  trip,
  transactions,
  table,
}: PageProps<{ trip: Trip; table: DebtTable, transactions: Transaction[] }>) {
  console.log(table, trip, auth)

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
        <div className="max-w-full mx-auto sm:px-6 lg:px-8">
          <div className=" overflow-hidden shadow-sm grid lg:grid-cols-6 gap-4">
            <div className="bg-white py-6 px-5 h-full flex flex-col col col-span-3">
              <Summary trip={trip} />
            </div>
            <div className=" bg-white py-6 px-5 h-full flex flex-col col col-span-3">
              <TransactionTable transactions={transactions} auth={auth} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
