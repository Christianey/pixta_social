import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

const PageRender = lazy(() => import("./utils/pageRender"));
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Router>
      {/* <input type="checkbox" name="check" id="theme" /> */}
      <div className="App">
        <Suspense fallback={<p>...This App is Loading...</p>}>
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
