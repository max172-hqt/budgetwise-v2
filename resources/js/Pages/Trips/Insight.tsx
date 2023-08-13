import { DebtTable, PageProps, Trip } from '@/types'
import { stringAvatar, stringToColor } from '@/utils/helper'
import { Avatar } from '@mui/material'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

export default function Insight({
  auth,
  trip,
  debtTable,
  balanceTable,
}: PageProps<{
  trip: Trip
  debtTable: DebtTable
  balanceTable: any
}>) {
  console.log(balanceTable)
  const [user, setUser] = useState(auth.user)

  const debts = useMemo(() => {
    if (!debtTable[user.id]) {
      return []
    }
    return debtTable[user.id].debts
  }, [user])

  const chartData = useMemo(() => {
    return balanceTable.map((balance) => ({
      user: balance.payer,
      name: balance.payer.name.split(' ')[0],
      fullName: balance.payer.name,
      amount: balance.amount.amount / 100,
      formattedAmount: balance.amount.formatted,
    }))
  }, [balanceTable])

  return (
    <div>
      <header className="px-5 pt-4 pb-8">
        <h2 className="font-semibold text-gray-800 text-4xl">Insights</h2>
        <div className="text-gray-400 mt-1">
          Suggestions on resolving debts among trip members
        </div>
      </header>
      <div className="pb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value, index) => {
                if (value === 0) return trip.contribution.formatted
                if (value > 0) return `$${value}`
                return `-$${Math.abs(value)}`
              }}
            />
            <Tooltip
              cursor={{ fill: '#fff' }}
              label="dsadsa"
              formatter={(value, name, item) => item.payload.formattedAmount}
              labelFormatter={(label, item) => {
                return item.length > 0 ? item[0].payload.fullName : label
              }}
            />
            <ReferenceLine y={0} stroke="gray" strokeWidth={1} />
            <Bar
              dataKey="amount"
              name="Trip Balance"
              onClick={(data) => setUser(data.user)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.amount < 0 ? '#ef4444' : '#10b981'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex">
        <div className="px-5">
          <h3 className="text-xl font-semibold mb-5">Members</h3>
          <nav
            className="flex flex-col"
            aria-label="Tabs"
            role="tablist"
            data-hs-tabs-vertical="true"
          >
            {trip.members?.map((member) => (
              <button
                className={classNames('flex items-center px-4 py-1', {
                  'border-l-2 border-sky-500 font-bold': member.id === user.id,
                  'hover:bg-gray-200': member.id !== user.id,
                })}
                onClick={() => setUser(member)}
                key={member.id}
              >
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 flex items-center">
                  <Avatar
                    {...stringAvatar(member.name)}
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: 12,
                      bgcolor: stringToColor(member.name),
                    }}
                  />
                </div>
                <div
                  className={classNames('text-gray-600 text-sm', {
                    'text-gray-800 font-bold': member.id === user.id,
                  })}
                >
                  {member.name} {member.id === auth.user.id && '(You)'}
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="ml-3">
          <h3 className="text-xl font-semibold mb-5">Settle-up Suggestions</h3>
          {debts.length === 0 ? (
            <p>{user.name} is all set.</p>
          ) : (
            <div>
              <div className="flex flex-col gap-2 my-4">
                <p
                  className={classNames('font-semibold mb-2', {
                    'text-red-500': debts[0].isDebt,
                    'text-green-600': !debts[0].isDebt,
                  })}
                >
                  {user.name} {debts[0].isDebt ? 'owed' : 'is all set.'}
                </p>
                {debts.map((debt) => (
                  <div className="flex items-center gap-2" key={debt.user.id}>
                    <Avatar
                      {...stringAvatar(debt.user.name)}
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 12,
                        bgcolor: stringToColor(debt.user.name),
                      }}
                    />
                    <div>
                      <span className="font-semibold">{debt.user.name} </span>
                      {!debt.isDebt && 'owes'}
                    </div>
                    <div
                      className={classNames('font-semibold', {
                        'text-red-500': debt.isDebt,
                        'text-green-600': !debt.isDebt,
                      })}
                    >
                      {debt.amount.formatted}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
