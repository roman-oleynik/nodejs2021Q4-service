
export type User = {
    id: string
    name: string
    login: string
    password: string
}

export type UserOutput = {
    id: string
    name: string
    login: string
}

export type Column = {
    id: string
    title: string
    order: string
}

export type Board = {
    id: string
    title: string
    columns: Column[]
}

export type Task = {
    id: string
    title: string
    order: string
    description: string
    userId: string | null
    boardId: string
    columnId: string
}

export type RequestObject = {
    originalUrl: string
    params: {
        userId?: string
    }
    body: object
}

export type ResultObject = {
    send: (arg: string) => void
    json: (arg: UserOutput[] | Board[] | Task[] | UserOutput | Board | Task) => void
    status: (arg: number) => ResultObject
}
