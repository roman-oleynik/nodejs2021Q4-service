const http = require("http");
const { v1, validate } = require('uuid');
const data = require("./data/data");
const { isBoardValid, isUserValid, isTaskValid } = require('./resources/validators/validators');


const app = (req, res) => {
  try {
      if (req.url.match(/^\/users\/?$/) && req.method === "GET") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data.users));
      } else if (req.url.match(/^\/users\/?$/) && req.method === "POST") {
          let body = "";
          req.on("data", chunk => {
              body += chunk;
          });
          req.on('end', () => {
              const person = data.users && data.users.find(_ => _.id === JSON.parse(`${body}`).id);
              const parsedBody = JSON.parse(`${body}`);
              parsedBody.id = v1();
              if (person) {
                  res.statusCode = 400;
                  res.end("Error: Person with this id already exists");
              } else if (!isUserValid(parsedBody)) {
                  res.statusCode = 400;
                  res.end("Error: Person's data is invalid");
              } else {
                  res.statusCode = 201;
                  res.setHeader("Content-Type", "application/json");
                  data.users.push(parsedBody);
                  delete parsedBody.password;
                  res.end(JSON.stringify(parsedBody));
              }
          });
      } else if (req.url.match(/^\/users\/[a-z0-9-]+$/) && req.method === "GET") {
              const person = data.users.find(_ => _.id === req.url.split("/").slice(-1)[0]);
              if (person && validate(person.id)) {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(person));
              } else if (person && !validate(person.id)) {
                  res.statusCode = 400;
                  res.end("Error: Person's id doesn't correspond to uuid v1");
              } else {
                  res.statusCode = 404;
                  res.end("Error: Person with this id doesn't exist");
              }
      } else if (req.url.match(/^\/users\/[a-z0-9-]+$/) && req.method === "PUT") {
          const personIndex = data.users.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
              let body = "";
              req.on("data", chunk => {
                  body += chunk;
              });
              req.on('end', () => {
                  const parsedBody = JSON.parse(`${body}`);
                  if (data.users[personIndex] && validate(parsedBody.id)) {
                      data.users[personIndex] = parsedBody;
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(parsedBody));
                  } else if (data.users[personIndex] && !validate(parsedBody.id)) {
                      res.statusCode = 400;
                      res.end("Error: Person's id doesn't correspond to uuid v1");
                  }  else {
                      res.statusCode = 404;
                      res.end("Error: Person is not found");
                  }
              });
      } else if (req.url.match(/^\/users\/[a-z0-9-]+$/) && req.method === "DELETE") {
          const personIndex = data.users.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
          if (personIndex > -1 && data.users[personIndex] && validate(data.users[personIndex].id)) {
              data.tasks.forEach(el => {
                
                if (el.userId === data.users[personIndex].id) {
                  const task = el;
                  task.userId = null;
                }
              })
              data.users.splice(personIndex, 1);
              res.statusCode = 204;
              res.setHeader("Content-Type", "application/json");
              res.end("[]");
          } else if (data.users[personIndex] && !validate(data.users[personIndex].id)) {
              res.statusCode = 400;
              res.end("Error: Person's id doesn't correspond to uuid v1");
          } else {
              res.statusCode = 404;
              res.end("Error: Person is not found");
          }
      } else if (req.url.match(/^\/boards\/?$/) && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data.boards));
      } else if (req.url.match(/^\/boards\/?$/) && req.method === "POST") {
          let body = "";
          req.on("data", chunk => {
              body += chunk;
          });
          req.on('end', () => {
              const person = data.boards && data.boards.find(_ => _.id === JSON.parse(`${body}`).id);
              const parsedBody = JSON.parse(`${body}`);
              parsedBody.id = v1();
              if (person) {
                  res.statusCode = 400;
                  res.end("Error: Person with this id already exists");
              } else if (!isBoardValid(parsedBody)) {
                  res.statusCode = 400;
                  res.end("Error: Person's data is invalid");
              } else {
                  res.statusCode = 201;
                  res.setHeader("Content-Type", "application/json");
                  data.boards.push(parsedBody);
                  res.end(JSON.stringify(parsedBody));
              }
          });
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+$/) && req.method === "GET") {
              const person = data.boards.find(_ => _.id === req.url.split("/").slice(-1)[0]);
              if (person && validate(person.id)) {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(person));
              } else if (person && !validate(person.id)) {
                  res.statusCode = 400;
                  res.end("Error: Person's id doesn't correspond to uuid v1");
              } else {
                  res.statusCode = 404;
                  res.end("Error: Person with this id doesn't exist");
              }
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+$/) && req.method === "PUT") {
          const personIndex = data.boards.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
              let body = "";
              req.on("data", chunk => {
                  body += chunk;
              });
              req.on('end', () => {
                  const parsedBody = JSON.parse(`${body}`);
                  if (data.boards[personIndex] && validate(parsedBody.id)) {
                      data.boards[personIndex] = parsedBody;
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(parsedBody));
                  } else if (data.boards[personIndex] && !validate(parsedBody.id)) {
                      res.statusCode = 400;
                      res.end("Error: Person's id doesn't correspond to uuid v1");
                  }  else {
                      res.statusCode = 404;
                      res.end("Error: Person is not found");
                  }
              });
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+$/) && req.method === "DELETE") {
          const personIndex = data.boards.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
          if (personIndex > -1 && data.boards[personIndex] && validate(data.boards[personIndex].id)) {
              data.tasks.forEach((el, i) => {
                if (el.boardId === data.boards[personIndex].id) {
                  data.tasks.splice(i, 1);
                }
              })
              data.boards.splice(personIndex, 1);

              res.statusCode = 204;
              res.setHeader("Content-Type", "application/json");
              res.end("[]");
          } else if (data.boards[personIndex] && !validate(data.boards[personIndex].id)) {
              res.statusCode = 400;
              res.end("Error: Person's id doesn't correspond to uuid v1");
          } else {
              res.statusCode = 404;
              res.end("Error: Person is not found");
          }
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+\/tasks$/) && req.method === "GET") {
          const id = req.url.split("/")[2];
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data.tasks.filter(el => el.boardId === id)));
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+\/tasks$/) && req.method === "POST") {
          let body = "";
          const id = req.url.split("/")[2];
          req.on("data", chunk => {
              body += chunk;
          });
          req.on('end', () => {
              const person = data.tasks && data.tasks.find(_ => _.id === JSON.parse(`${body}`).id);
              const parsedBody = JSON.parse(`${body}`);
              parsedBody.id = v1();
              parsedBody.boardId = id;
              if (person) {
                  res.statusCode = 400;
                  res.end("Error: Person with this id already exists");
              } else if (!isTaskValid(parsedBody)) {
                  res.statusCode = 400;
                  res.end("Error: Person's data is invalid");
              } else {
                  res.statusCode = 201;
                  res.setHeader("Content-Type", "application/json");
                  data.tasks.push(parsedBody);
                  res.end(JSON.stringify(parsedBody));
              }
          });
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+\/tasks\/[a-z0-9-]+$/) && req.method === "GET") {
              const person = data.tasks.find(_ => _.id === req.url.split("/").slice(-1)[0]);
              if (person && validate(person.id)) {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(person));
              } else if (person && !validate(person.id)) {
                  res.statusCode = 400;
                  res.end("Error: Person's id doesn't correspond to uuid v1");
              } else {
                  res.statusCode = 404;
                  res.end("Error: Task with this id doesn't exist");
              }
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+\/tasks\/[a-z0-9-]+$/) && req.method === "PUT") {
          const personIndex = data.tasks.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
              let body = "";
              req.on("data", chunk => {
                  body += chunk;
              });
              req.on('end', () => {
                  const parsedBody = JSON.parse(`${body}`);
                  if (data.tasks[personIndex] && validate(parsedBody.id)) {
                      data.tasks[personIndex] = parsedBody;
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(parsedBody));
                  } else if (data.tasks[personIndex] && !validate(parsedBody.id)) {
                      res.statusCode = 400;
                      res.end("Error: Person's id doesn't correspond to uuid v1");
                  }  else {
                      res.statusCode = 404;
                      res.end("Error: Person is not found");
                  }
              });
      } else if (req.url.match(/^\/boards\/[a-z0-9-]+\/tasks\/[a-z0-9-]+$/) && req.method === "DELETE") {
          const personIndex = data.tasks.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
          if (personIndex > -1 && data.tasks[personIndex] && validate(data.tasks[personIndex].id)) {
              data.tasks.splice(personIndex, 1);
              res.statusCode = 204;
              res.setHeader("Content-Type", "application/json");
              res.end("[]");
          } else if (data.tasks[personIndex] && !validate(data.tasks[personIndex].id)) {
              res.statusCode = 400;
              res.end("Error: Person's id doesn't correspond to uuid v1");
          } else {
              res.statusCode = 404;
              res.end("Error: Person is not found");
          }
      } else {
          res.statusCode = 404;
          res.end("Error: Invalid request");
      }
  } catch (err) {
      res.statusCode = 500;
      res.end("Error: Internal server error!");
  }
};
const httpServer = http.createServer(app);
module.exports = httpServer;
