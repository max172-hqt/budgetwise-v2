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
  const [user, setUser] = useState(auth.user ?? trip.members[0]);

  const debts = useMemo(() => {
    if (!debtTable[user.id]) {
      return []
    }
    return debtTable[user.id].debts
  }, [user, debtTable])

  const chartData = useMemo(() => {
    return balanceTable.map((balance) => ({
      user: balance,
      name: balance.name.split(' ')[0],
      fullName: balance.name,
      amount: balance.amount.amount / 100,
      formattedAmount: balance.amount.formatted,
    }))
  }, [balanceTable])

  return (
    <div>
      <header className="px-5 pt-4 pb-8">
        <h2 className="font-semibold text-gray-800 text-4xl">Insights</h2>
        <div className="text-gray-400 mt-1">
          Suggestions on settling up debts among trip members
        </div>
      </header>
      {chartData.length > 0 && (
        <div className="pb-8">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              maxBarSize={50}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" fontSize={14} fontWeight="bold" />
              <YAxis
                fontSize={14}
                tickFormatter={(value, index) => {
                  if (value >= 0) return `$${value}`
                  return `-$${Math.abs(value)}`
                }}
              />
              <Tooltip
                cursor={{ fill: '#fff' }}
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
                radius={[8, 8, 0, 0]}
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
      )}
      <div className="flex">
        <div className="p-5 pr-0 ml-5">
          <h3 className="text-xl font-semibold mb-5">Members</h3>
          <nav
            className="flex flex-col max-h-80 overflow-auto"
            aria-label="Tabs"
            role="tablist"
            data-hs-tabs-vertical="true"
          >
            {trip.members?.map((member) => (
              <button
                className={classNames('flex items-center py-1', {
                  'hover:bg-gray-200': member.id !== user.id,
                })}
                onClick={() => setUser(member)}
                key={member.id}
              >
                <div
                  className={classNames('w-1 h-10 mr-4', {
                    'bg-sky-500': member.id === user.id,
                  })}
                ></div>
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
                  className={classNames('text-gray-600 text-sm pr-4', {
                    'text-gray-800 font-bold': member.id === user.id,
                  })}
                >
                  {member.name} {auth.user && member.id === auth.user.id && '(You)'}
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="ml-3 p-5 flex-grow">
          <h3 className="text-xl font-semibold mb-5">Settle-up Suggestions</h3>
          {debts.length === 0 ? (
            <p>{user.name} is all set.</p>
          ) : (
            <div>
              <div className="flex flex-col gap-2 my-4 max-h-80 overflow-auto flex-grow">
                <p
                  className={classNames('font-semibold mb-2', {
                    'text-red-500': debts[0].isDebt,
                    'text-green-600': !debts[0].isDebt,
                  })}
                >
                  {user.name} {debts[0].isDebt ? 'owed' : 'is all set.'}
                </p>
                {debts.map((debt) => (
                  <div className="flex items-center gap-2" key={debt.id}>
                    <Avatar
                      {...stringAvatar(debt.name)}
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 12,
                        bgcolor: stringToColor(debt.name),
                      }}
                    />
                    <div>
                      <span className="font-semibold">{debt.name} </span>
                      {!debt.isDebt && 'owed'}
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
