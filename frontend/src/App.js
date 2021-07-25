import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageRender from "./utils/pageRender";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      {/* <input type="checkbox" name="check" id="theme" /> */}
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:id" component={PageRender} />
            <Route component={PageRender} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
