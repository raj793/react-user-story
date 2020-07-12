import React from 'react';
import { useCookies } from 'react-cookie';
import {COOKIE_KEY} from '../../config'

const Auth = ({children, component}) => {

  const [cookie] = useCookies()

  if(cookie[COOKIE_KEY])
    return children;
  else
    return component;
}

export default Auth;