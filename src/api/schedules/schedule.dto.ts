export interface ScheduleDataResponse {
    client_name: string
    last_update: string
    schedules: ScheduleDay[]
}

export interface ScheduleDay {
    date: string
    week_day: number
    lessons: Lesson[]
}

export interface Lesson {
    number: number
    time: string
    items: LessonItem[]
}

export interface LessonItem {
    title: string
    type: string
    partner: string
    location: string
}

export interface ClientsResponse {
    groups: string[]
    teachers: string[]
}