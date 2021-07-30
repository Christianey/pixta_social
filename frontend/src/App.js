import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoadingAppIcon from "./components/loadingAppIcon";

const PageRender = lazy(() => import("./utils/pageRender"));
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Router>
      {/* <input type="checkbox" name="check" id="theme" /> */}
      <div className="App">
        <Suspense fallback={<LoadingAppIcon />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:id" component={PageRender} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
