import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from 'react-aria-components'
import styles from './AddCalendar.module.css'
import { useEffect, useState } from 'react'

export function AddCalendar({ onChange, date }) {
  const [selectedDate, setSelectedDate] = useState(
    date instanceof Date ? date : null
  )
  console.log(selectedDate)

  useEffect(() => {
    setSelectedDate(date instanceof Date ? date : null)
  }, [date])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onChange(date)
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      style={{ marginBottom: 10 }}
    >
      <Label>Дата</Label>
      <Group className={styles[`${'calendar-group'}`]}>
        <DateInput
          className={styles[`${'date-input'}`]}
          value={date}
          onChange={handleDateChange}
        >
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className={styles[`${'calendar-button'}`]}>▼</Button>
      </Group>
      <Popover>
        <Dialog>
          <Calendar className={styles[`${'calendar-conteiner'}`]}>
            <header className={styles[`${'calendar-header'}`]}>
              <Button
                className={styles[`${'calendar-button'}`]}
                slot="previous"
              >
                ◀
              </Button>
              <Heading className={styles[`${'calendar-heading'}`]} />
              <Button className={styles[`${'calendar-button'}`]} slot="next">
                ▶
              </Button>
            </header>
            <CalendarGrid style={{ margin: 'auto', cursor: 'pointer' }}>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  )
}
