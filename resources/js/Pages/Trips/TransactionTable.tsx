import { PageProps, Transaction } from '@/types'
import { Avatar } from '@mui/material'
import moment from 'moment'
import { stringAvatar, stringToColor } from '@/utils/helper'

export default function TransactionTable({
  auth,
  transactions,
}: PageProps<{ transactions: Transaction[] }>) {
  return (
    <div>
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 text-4xl">Bill History</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Payer</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Transaction</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr>
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
                        {transaction.payer.id === auth.user.id ? 'You' : transaction.payer.name.split(' ')[0]}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace pr-4">
                    <div className="text-left flex flex-col gap-2">
                      <div className="truncate">{transaction.name}</div>
                      <div className="truncate text-gray-500">
                        Paid{' '}
                        <span className="font-semibold text-green-600">
                          {transaction.amount.formatted}
                        </span>{' '}
                        on{' '}
                        {moment(transaction.created_at).format('MMM Do YYYY')}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
