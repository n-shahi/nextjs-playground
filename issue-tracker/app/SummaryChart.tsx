"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react'
import { Box, Card } from '@radix-ui/themes';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const SummaryChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open Issues', value: open },
    { label: 'In Progress Issues', value: inProgress },
    { label: 'Closed Issues', value: closed },
  ]
  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="label" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" style={{ fill: "var(--accent-9)"}} barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
export default SummaryChart
