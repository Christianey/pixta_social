import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoadingAppIcon from "./components/loadingAppIcon";
import authThunk from "./redux/reducers/auth/auth.thunk";

const PageRender = lazy(() => import("./utils/pageRender"));
const Home = lazy(() => import("./pages/home"));
const LoginSignUp = lazy(() => import("./pages/loginSignUp"));
const Header = lazy(() => import("./components/Header"));

function App() {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk.refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <input type="checkbox" name="check" id="theme" className="hidden" />
      <div className="App">
        <Suspense fallback={<LoadingAppIcon />}>
          {accessToken && <Header />}
          <main
            className={`${
              accessToken &&
              "bg-white border border-gray-100 p-8 mx-auto my-4 max-w-3xl"
            }`}
          >
            <Switch>
              <Route
                exact
                path="/"
                component={accessToken ? Home : LoginSignUp}
              />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:id" component={PageRender} />
            </Switch>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
