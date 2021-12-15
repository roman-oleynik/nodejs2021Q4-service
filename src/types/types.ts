type ItemsGetter<T> = {
    (): T[] | Promise<T[]>
    (id: string): T[] | Promise<T[]>
}

export interface CRUD<T> {
    getAll: ItemsGetter<T>
    get: (id: string) => T | Promise<T>
    add: (obj: T) => T | Promise<T>
    put: (id: string, obj: T) => T | Promise<T>
    remove: (id: string) => object | Promise<object>
}
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
export type BoardOutput = Board;

export type Task = {
    id: string
    title: string
    order: string
    description: string
    userId: string | null
    boardId: string
    columnId: string
}
export type TaskOutput = Task;

export type RequestObject = {
    originalUrl: string
    params: {
        userId?: string
        boardId?: string
        taskId?: string
    }
    body: object
    baseUrl: string
}

type StatusObject = {
    status: number
    error?: unknown
}
type TrelloData = UserOutput[] | Board[] | Task[] | UserOutput | Board | Task;
export type ResponseObject = {
    send: (arg: string | StatusObject) => void
    json: (arg: TrelloData) => void
    status: (arg: number) => ResponseObject
}
