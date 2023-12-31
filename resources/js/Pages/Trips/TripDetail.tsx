import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { DebtTable, PageProps, Transaction, Trip } from '@/types'
import Summary from './Summary'
import FlashMessage from '@/Components/FlashMessage'
import TransactionTable from './TransactionTable'
import Insight from './Insight'

const TripDetail = ({
  auth,
  trip,
  transactions,
  transactionsByCategory,
  debtTable,
  balanceTable,
}: PageProps<{
  trip: Trip
  debtTable: DebtTable
  transactions: Transaction[]
  transactionsByCategory: Transaction[]
  balanceTable: any
}>) => {
  const { flash } = usePage().props as any

  return (
    <>
      <Head title="My Trips" />

      {flash.message && <FlashMessage message={flash.message} />}

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className=" overflow-hidden grid lg:grid-cols-6 gap-4">
            <div className="bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow rounded-xl">
              <Summary
                trip={trip}
                auth={auth}
                transactionsByCategory={transactionsByCategory}
                debtsInfo={debtTable[auth.user?.id]?.debts ?? []}
              />
            </div>
            <div className=" bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow rounded-xl">
              <TransactionTable
                tripId={trip.id}
                transactions={transactions}
                auth={auth}
              />
            </div>
          </div>
          <div className=" bg-white py-6 px-5 h-full flex flex-col col col-span-3 flex-grow mt-4 rounded-xl">
            <Insight
              auth={auth}
              trip={trip}
              debtTable={debtTable}
              balanceTable={balanceTable}
            />
          </div>
        </div>
      </div>
    </>
  )
}

TripDetail.layout = (page: any) => {
  const user = page.props.auth.user;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {page.props.trip.name}
        </h2>
      }
      user={page.props.auth.user}
      children={page}
    />
  )
}

export default TripDetail
