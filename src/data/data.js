const users = [
    {
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Roman",
        login: "roman-oleynik",
        password: "123qwe"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Ivan",
        login: "ivan3421",
        password: "123qwer"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174002",
        name: "Selena",
        login: "selena8",
        password: "ssl123456"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174003",
        name: "Ken",
        login: "ken-superman",
        password: "123qwe"
    },
];

const boards = [
    {
        id: "123e4567-e89b-12d3-a456-426614174004",
        title: "some board",
        columns: [
            {
                id: "b1c1",
                title: "todo",
                order: "0"
            },
            {
                id: "b1c2",
                title: "in progress",
                order: "1"
            },
            {
                id: "b1c3",
                title: "done",
                order: "2"
            }
        ]
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174005",
        title: "some board 2",
        columns: [
            {
                id: "b2c1",
                title: "todo",
                order: "0"
            },
            {
                id: "b2c2",
                title: "in progress",
                order: "1"
            },
            {
                id: "b2c3",
                title: "done",
                order: "2"
            }
        ]
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174006",
        title: "some board 3",
        columns: [
            {
                id: "b3c1",
                title: "todo",
                order: "0"
            },
            {
                id: "b3c2",
                title: "in progress",
                order: "1"
            },
            {
                id: "b3c3",
                title: "done",
                order: "2"
            }
        ]
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174007",
        title: "some board 4",
        columns: [
            {
                id: "b4c1",
                title: "todo",
                order: "0"
            },
            {
                id: "b4c2",
                title: "in progress",
                order: "1"
            },
            {
                id: "b4c3",
                title: "done",
                order: "2"
            }
        ]
    },
];

const tasks = [
    {
        id: "123e4567-e89b-12d3-a456-426614174008",
        title: "Make a form for the website",
        order: "0",
        description: "make form that has 3 inputs and a submit button",
        userId: "123e4567-e89b-12d3-a456-426614174001", // assignee
        boardId: "123e4567-e89b-12d3-a456-426614174004",
        columnId: "b1c1"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174009",
        title: "Make a mainscreen for the website",
        order: "1",
        description: "make it faster",
        userId: "123e4567-e89b-12d3-a456-426614174001", // assignee
        boardId: "123e4567-e89b-12d3-a456-426614174006",
        columnId: "b1c1"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174010",
        title: "Make a header for the website",
        order: "0",
        description: "make a beautiful header",
        userId: "123e4567-e89b-12d3-a456-426614174001", // assignee
        boardId: "123e4567-e89b-12d3-a456-426614174004",
        columnId: "b1c2"
    },
    {
        id: "123e4567-e89b-12d3-a456-426614174011",
        title: "Make a logo for the website",
        order: "0",
        description: "make a beautiful header",
        userId: "123e4567-e89b-12d3-a456-426614174000", // assignee
        boardId: "123e4567-e89b-12d3-a456-426614174005",
        columnId: "b1c3"
    },
];

module.exports = {
    users,
    boards,
    tasks
};