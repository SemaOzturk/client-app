import React, { Fragment, useEffect, useState } from 'react';
import {Activity} from '../models/activity'
import { Container, Header, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../fetures/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { Route } from 'react-router-dom';
import HomePage from '../../fetures/home/HomePage';
import ActivityForm from '../../fetures/activities/form/ActivityForm';

function App() {

  const {activityStore} = useStore();


  // axios basta direk cagrilirken
  // useEffect(()=>{
  //   axios.get<Activity[]>('activities').then(response=>{
  //     setActivities(response.data);
  //   })
  // },[])

  //istegi agentlara tasidiktan sonra

  // useEffect(()=>{
  //   agent.Activities.list().then(response => {
  //     let activities : Activity[] = [];
  //     response.forEach(activity => {
  //       activity.date = activity.date.split('T')[0];
  //       activities.push(activity);
  //     })
  //     setActivities(response);
  //     setLoading(false);
  //   })
  // },[] )

  //MobX den sonra

  useEffect(()=>{
   activityStore.loadActivities();
  },[activityStore])

 

 if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <Route path='/'>  <HomePage/> </Route>
      <Route path='/activities'>  <ActivityDashboard/> </Route>
      <Route path='/createActivity'>  <ActivityForm/> </Route>
     </Container>
    </Fragment>
  );
}

export default App;
