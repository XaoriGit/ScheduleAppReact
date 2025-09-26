export interface ScheduleDataResponse {
    client_name: string
    last_update: string
    schedules: ScheduleDayDTO[]
}

export interface ScheduleDayDTO {
    date: string
    week_day: number
    lessons: LessonDTO[]
}

export interface LessonDTO {
    number: number
    time: string
    items: LessonItemDTO[]
}

export interface LessonItemDTO {
    title: string
    type: string
    partner: string
    location: string
}

export interface ClientsResponse {
    groups: string[]
    teachers: string[]
}