import React from 'react'
// @ts-ignore
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, YAxis } from 'recharts'

export default function Chart(props: any) {
  return (
    <LineChart
      width={200}
      height={120}
      data={[
        { name: 'Page', uv: 400, pv: 1600, amt: 2400 },
        { name: 'Page2 B', uv: 200, pv: 1500, amt: 2800 },
        { name: 'Page C', uv: 225, pv: 1800, amt: 2600 }
      ]}
      margin={{ top: 20, right: 20, bottom: 5, left: -20 }}>
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='name' style={{ fontSize: 8 }} />
      <YAxis style={{ fontSize: 8 }} />
      <Tooltip />
      <Line type='monotone' dataKey='pv' stroke='#000000' />
    </LineChart>
  )
}
