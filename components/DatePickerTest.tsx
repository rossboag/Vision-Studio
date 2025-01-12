import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

const DatePickerTest: React.FC = () => {
  const [selected, setSelected] = useState<Date>()

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Date Picker Test</h2>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={selected && <p>You selected {format(selected, 'PPP')}.</p>}
      />
    </div>
  )
}

export default DatePickerTest

