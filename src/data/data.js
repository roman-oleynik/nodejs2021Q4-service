const users = [
    {
        id: "1",
        name: "Roman",
        login: "roman-oleynik",
        password: "123qwe"
    },
    {
        id: "2",
        name: "Ivan",
        login: "ivan3421",
        password: "123qwer"
    },
    {
        id: "3",
        name: "Selena",
        login: "selena8",
        password: "ssl123456"
    },
    {
        id: "4",
        name: "Ken",
        login: "ken-superman",
        password: "123qwe"
    },
];

const boards = [
    {
        id: "b1",
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
        id: "b2",
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
        id: "b3",
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
        id: "b4",
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
        id: "t1",
        title: "Make a form for the website",
        order: "0",
        description: "make form that has 3 inputs and a submit button",
        userId: "1", // assignee
        boardId: "b1",
        columnId: "b1c1"
    },
    {
        id: "t2",
        title: "Make a mainscreen for the website",
        order: "1",
        description: "make it faster",
        userId: "1", // assignee
        boardId: "b1",
        columnId: "b1c1"
    },
    {
        id: "t3",
        title: "Make a header for the website",
        order: "0",
        description: "make a beautiful header",
        userId: "1", // assignee
        boardId: "b1",
        columnId: "b1c2"
    },
    {
        id: "t4",
        title: "Make a logo for the website",
        order: "0",
        description: "make a beautiful header",
        userId: "1", // assignee
        boardId: "b1",
        columnId: "b1c3"
    },
];

module.exports = {
    users,
    boards,
    tasks
};