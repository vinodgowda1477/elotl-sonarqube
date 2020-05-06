import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from './store/store';
import Layout from './containers/layoutContainer';

interface IAppProps {
}

interface IAppState {
}


export default class App extends React.Component<IAppProps, IAppState>{
  constructor(props) {
    super(props);

    this.state = {}
  }
  render(){
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    ); 
  }

}
