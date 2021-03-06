import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import AddReview from "./components/add-review"
import Restaurant from "./components/restaurants"
import RestaurantsList from "./components/restaurants-list"
import Login from "./components/login"

function App() {
  const [user, setUser] = React.userState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Review
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {
              user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                  Logout {user.name}
                </a>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              )
            }
          </li>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={"/", "restaurants"} component={RestaurantsList} />
          <Route exact path="/redirect" render={() => {
            handleRedirect();
            return <RestaurantsList />;
          }} />
          <Route
            path="restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
