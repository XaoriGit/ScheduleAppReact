export const WEEK_DAYS = [
    { short: "Вс", full: "Воскресенье" },
    { short: "Пн", full: "Понедельник" },
    { short: "Вт", full: "Вторник" },
    { short: "Ср", full: "Среда" },
    { short: "Чт", full: "Четверг" },
    { short: "Пт", full: "Пятница" },
    { short: "Сб", full: "Суббота" },
]

export function formatWeekDay(weekDay: number, date: string, full: boolean) {
    const weekday = WEEK_DAYS[weekDay]
    const dayNum = new Date(date).getDate()

    return full ? `${weekday.full}, ${dayNum}` : `${weekday.short}, ${dayNum}`
}
