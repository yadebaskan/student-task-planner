import Calendar from "react-calendar";

function CalendarSection({
  selectedDate,
  setSelectedDate,
  selectedDateString,
  tasksForSelectedDate,
}) {
  return (
    <div className="calendarSection">
      <h2>Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <div className="calendarTasks">
        <h3>Tasks on {selectedDateString}</h3>

        {tasksForSelectedDate.length === 0 ? (
          <p>No tasks for this date.</p>
        ) : (
          tasksForSelectedDate.map((task) => (
            <div
              className="calendarTask"
              key={task.id}
            >
              {task.title} - {task.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarSection;