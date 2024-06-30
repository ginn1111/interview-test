const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const myMiddleware = (req, res, next) => {
  console.log("log in my middleware", req.body);
  next();
};

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(myMiddleware);
server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
