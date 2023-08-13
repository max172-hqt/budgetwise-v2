import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { DebtTable, PageProps, Transaction, Trip } from '@/types'
import TransactionTable from './TransactionTable'
import Summary from './Summary'
import Insight from './Insight'

export default function TripDetail({
  auth,
  trip,
  transactions,
  transactionsByCategory,
  debtTable,
}: PageProps<{
  trip: Trip
  debtTable: DebtTable
  transactions: Transaction[]
  transactionsByCategory: Transaction[]
}>) {
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
          <div className=" overflow-hidden grid lg:grid-cols-6 gap-4">
            <div className="bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow">
              <Summary
                trip={trip}
                auth={auth}
                transactionsByCategory={transactionsByCategory}
                debtsInfo={debtTable[auth.user.id]}
              />
            </div>
            <div className=" bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow">
              <TransactionTable transactions={transactions} auth={auth} />
            </div>
          </div>
          <div className=" bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow mt-4">
            <Insight />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
