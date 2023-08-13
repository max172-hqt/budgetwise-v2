import { Debt, PageProps, Transaction, Trip, User } from '@/types'
import { PieChart } from '@mui/x-charts'
import { useMemo } from 'react'
import { CATEGORY_COLOR, stringAvatar, stringToColor } from '@/utils/helper'
import _ from 'lodash'
import { Avatar } from '@mui/material'

export default function Summary({
  auth,
  trip,
  transactionsByCategory,
  debtsInfo,
}: PageProps<{
  trip: Trip
  transactionsByCategory: Transaction[]
  debtsInfo: { payer: User; debts: Debt[] }
}>) {
  const chartData = useMemo(() => {
    return transactionsByCategory.map((transaction) => ({
      id: transaction.id,
      value: parseFloat(transaction.amount.amount) / 100,
      label: _.upperFirst(transaction.category),
      color: CATEGORY_COLOR[transaction.category],
    }))
  }, [transactionsByCategory])

  return (
    <div>
      <header className="px-5 py-4">
        <h2 className="font-bold text-gray-800 text-4xl">
          {trip.totalExpenses.formatted}
        </h2>
        <div className="text-gray-500">Total Trip Expenses</div>
      </header>
      <div className="px-5 py-4">
        <h3 className="text-xl font-semibold">Your Summary</h3>
        <div>
          {!debtsInfo || debtsInfo.debts.length === 0 ? (
            <p>You have no pending debts</p>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <p>You owe</p>
              {debtsInfo.debts.map((debt) => (
                <div className='flex items-center gap-2' key={debt.payee.id}>
                  <Avatar
                    {...stringAvatar(debt.payee.name)}
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: 12,
                      bgcolor: stringToColor(debt.payee.name),
                    }}
                  />
                  <div>{debt.payee.name}</div>
                  <div className='text-red-500 font-semibold'>{debt.amount.formatted}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-5 py-4 w-full flex flex-col gap-4 flex-grow">
        <h3 className="text-xl font-semibold">Expense details</h3>
        <PieChart
          series={[
            {
              data: _.orderBy(chartData, 'value', 'desc'),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              valueFormatter: (d) => `$${d.value}`,
              cx: 100,
              cy: 120,
            },
          ]}
          sx={{
            '--ChartsLegend-rootOffsetX': '-80px',
            '--ChartsLegend-rootOffsetY': '-30px',
          }}
          width={500}
          height={300}
        />
      </div>
    </div>
  )
}
