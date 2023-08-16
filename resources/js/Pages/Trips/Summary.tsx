import { Debt, PageProps, Transaction, Trip, User } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CATEGORY_COLOR, stringAvatar, stringToColor } from '@/utils/helper'
import _, { divide } from 'lodash'
import { Avatar } from '@mui/material'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from 'recharts'
import classNames from 'classnames'

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.label}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontWeight="semibold"
        fontSize={14}
      >
        <tspan>{payload.formatted}</tspan>
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={14}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export default function Summary({
  auth,
  trip,
  transactionsByCategory,
  debtsInfo: debts,
}: PageProps<{
  trip: Trip
  transactionsByCategory: Transaction[]
  debtsInfo: Debt[]
}>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const chartData = useMemo(() => {
    return transactionsByCategory.map((transaction) => ({
      id: transaction.id,
      value: parseFloat(transaction.amount.amount) / 100,
      label: _.upperFirst(transaction.category),
      color: CATEGORY_COLOR[transaction.category],
      formatted: transaction.amount.formatted,
    }))
  }, [transactionsByCategory])

  return (
    <div>
      <header className="px-5 py-4 flex justify-between">
        <div>
          <h2 className="font-bold text-gray-800 text-4xl">
            {trip.totalExpenses.formatted}
          </h2>
          <div className="text-gray-400 mt-1">Total Trip Expenses</div>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-4xl">
            {trip.contribution.formatted}
          </h2>
          <div className="text-gray-400 mt-1">Individual Contribution</div>
        </div>
      </header>
      <div className="px-5 py-4 ">
        <h3 className="text-xl font-semibold mb-4">Your Summary</h3>
        <div className='max-h-40 overflow-auto'>
          {!debts || debts.length === 0 ? (
            <p className="text-green-600">You are all set.</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p
                className={classNames('font-semibold mb-2', {
                  'text-red-500': debts[0].isDebt,
                  'text-green-600': !debts[0].isDebt,
                })}
              >
                You {debts[0].isDebt ? 'owed' : 'are all set.'}
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
                  <div>{debt.name}</div>
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
          )}
        </div>
      </div>
      <div className="py-4 w-full flex flex-col gap-4 flex-grow">
        <h3 className="px-5 text-xl font-semibold">Expense details</h3>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height={300} className="flex-grow">
            <PieChart width={500} height={300}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={chartData.length < 2 ? 0 : 8}
                cornerRadius={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry, index) => entry.payload.label}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10 font-bold text-gray-400">
            No data to display
          </div>
        )}
      </div>
    </div>
  )
}
