import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

// Routes
import dateRoutes from "./Routes/DateRoutes";
import matchRoutes from "./Routes/MatchRoutes";
import userRoutes from "./Routes/UserRoutes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.options('*', cors());
app.use(cors({ credentials: false, origin: true }));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 9100 || process.env.PORT;

const ExpectUserId = (req: any): boolean => {
  return !req.body.user.id;
};

// Routes definition
app.use(userRoutes, dateRoutes, matchRoutes);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app;
