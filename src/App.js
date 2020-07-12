import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {Route, Switch, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDataAction } from './actions/appActions';
import { useCookies } from 'react-cookie';
import {COOKIE_KEY} from './config'

// Components/Pages
import Login from './components/Login';
import Auth from './components/Auth';
import Home from './components/Home';
import Story from './components/Story';
import Create from './components/Create';

function App({user}) {

  const [cookie] = useCookies();

  const location = useLocation();
  const dispatch = useDispatch();

  const Loading = () => {
    return <div>Loading...</div>
  }

  //Routes
  const loadingPage = [
    {
      pageLink: '/',
      view: Loading,
      displayName: 'Loading',
    }
  ]

  const userPages = [
    {
      pageLink: '/story',
      view: Home,
      displayName: 'Home',
    },
    {
      pageLink: '/',
      view: Create,
      displayName: 'Create Story'
    }
  ];

  const adminPages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Admin',
    },
    {
      pageLink: '/story/:id',
      view: Story,
      displayName: 'Story',
    }
  ];

  //Get user data from cookie
  const getUserData = () => { if(cookie[COOKIE_KEY]) {
    dispatch(setUserDataAction(cookie[COOKIE_KEY]))
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  //Routing and Authentication
  const pages = user.role === undefined ? loadingPage : user.role === 'Admin' ? adminPages : userPages;

  return (
    <div className="App">
      <Switch location={location}>
        <Auth component={<Login />}>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={({match}) => <page.view />}
                key={index}
              />
            );
          })}
        </Auth>
      </Switch>
    </div>
  );
}

function mapStateToProps(store){
  return{
      user: store.app.user
  };
}

export default connect(mapStateToProps)(App);
