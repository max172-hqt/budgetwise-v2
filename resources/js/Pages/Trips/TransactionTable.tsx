import { PageProps, Transaction } from '@/types'
import { Avatar, Modal } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CelebrationIcon from '@mui/icons-material/Celebration'
import moment from 'moment'
import { stringAvatar, stringToColor } from '@/utils/helper'
import { useState } from 'react'
import Pagination from '@/Components/Pagination'
import CreateTransactionModel from './CreateTransactionModal'

const CategoryIcon = ({
  category,
}: {
  category: 'transportation' | 'food' | 'accomodation' | 'miscellaneous'
}) => {
  switch (category) {
    case 'transportation':
      return <EmojiTransportationIcon className="text-sky-500" />
    case 'food':
      return <FastfoodIcon className="text-yellow-500" />
    case 'accomodation':
      return <ApartmentIcon className="text-emerald-500" />
    case 'miscellaneous':
      return <CelebrationIcon className="text-red-500" />
  }
}

export default function TransactionTable({
  auth,
  tripId,
  transactions,
}: PageProps<{ transactions: any, tripId: number }>) {
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return (
    <div>
      <header className="px-5 py-4 flex justify-between">
        <h2 className="font-semibold text-gray-800 text-4xl">Bill History</h2>
        <button
          className="font-extrabold bg-sky-500 rounded text-white hover:bg-sky-600 uppercase px-4 py-2"
          onClick={handleOpenModal}
        >
          Create Bill
        </button>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto flex flex-col">
          {transactions.data.length > 0 ? (
            <table className="table-fixed w-full overflow-scroll flex-grow">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 w-3/4">
                    <div className="font-semibold text-left">Transaction</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Payer</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {transactions.data.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-4 whitespace truncate w-3/4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CategoryIcon category={transaction.category} />
                        </div>
                        <div className="text-left flex flex-col gap-2">
                          <div className="truncate">{transaction.name}</div>
                          <div className="truncate text-gray-500">
                            Paid{' '}
                            <span className="font-semibold text-green-600">
                              {transaction.amount.formatted}
                            </span>{' '}
                            on{' '}
                            {moment(transaction.created_at).format(
                              'MMM Do YYYY'
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 flex items-center">
                          <Avatar
                            {...stringAvatar(transaction.payer.name)}
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: 12,
                              bgcolor: stringToColor(transaction.payer.name),
                            }}
                          />
                        </div>
                        <div className="font-medium text-gray-800 text-sm">
                          {transaction.payer.id === auth.user.id
                            ? 'You'
                            : transaction.payer.name.split(' ')[0]}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="font-bold text-gray-400 self-center justify-self-center py-20">
              No data to display
            </div>
          )}
          <Pagination links={transactions.links} />
          <CreateTransactionModel
            tripId={tripId}
            open={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </div>
  )
}
