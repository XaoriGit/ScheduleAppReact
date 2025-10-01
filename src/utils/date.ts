export const WEEK_DAYS = [
    { short: "Пн", full: "Понедельник" },
    { short: "Вт", full: "Вторник" },
    { short: "Ср", full: "Среда" },
    { short: "Чт", full: "Четверг" },
    { short: "Пт", full: "Пятница" },
    { short: "Сб", full: "Суббота" },
    { short: "Вс", full: "Воскресенье" },
]

export function formatWeekDay(weekDay: number, date: string, full: boolean) {
    const weekday = WEEK_DAYS[weekDay]
    const dayNum = new Date(date).getDate()

    return [full ? `${weekday.full}` : `${weekday.short}`, dayNum]
}


function pluralize(value: number, forms: [string, string, string]): string {
    const n = Math.abs(value) % 100
    const n1 = n % 10

    if (n > 10 && n < 20) return forms[2]
    if (n1 > 1 && n1 < 5) return forms[1]
    if (n1 === 1) return forms[0]
    return forms[2]
}

export function formatTimeUpdate(isoDate: string): string {
    const lastUpdate = new Date(isoDate)
    const now = new Date()

    const diffMs = now.getTime() - lastUpdate.getTime()
    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (minutes < 1) {
        return "только что"
    }
    if (minutes < 60) {
        return `${minutes} ${pluralize(minutes, ["минута", "минуты", "минут"])} назад`
    }
    if (hours < 24) {
        return `${hours} ${pluralize(hours, ["час", "часа", "часов"])} назад`
    }
    if (days === 1) {
        return "вчера"
    }
    if (days < 7) {
        return `${days} ${pluralize(days, ["день", "дня", "дней"])} назад`
    }
    if (days < 30) {
        const weeks = Math.floor(days / 7)
        return `${weeks} ${pluralize(weeks, ["неделя", "недели", "недель"])} назад`
    }
    if (days < 365) {
        const months = Math.floor(days / 30)
        return `${months} ${pluralize(months, ["месяц", "месяца", "месяцев"])} назад`
    }
    const years = Math.floor(days / 365)
    return `${years} ${pluralize(years, ["год", "года", "лет"])} назад`
}
