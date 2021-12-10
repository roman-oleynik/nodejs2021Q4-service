
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
    }
    body: object
}

type StatusObject = {
    status: number
}
type TrelloData = UserOutput[] | Board[] | Task[] | UserOutput | Board | Task;
export type ResultObject = {
    send: (arg: string | StatusObject) => void
    json: (arg: TrelloData) => void
    status: (arg: number) => ResultObject
}
