import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Grid,Item,ItemContent,ItemDescription,ItemHeader,Label,List, Segment } from "semantic-ui-react";
import {Activity} from '../../../app/models/activity'
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityList(){

    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;
    
    const[target,settarget]=useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
      settarget(e.currentTarget.name)
      deleteActivity(id)
    }
    return(
     <Segment>
         <Item.Group divided>
             {activitiesByDate.map(activity=>(
                 <Item key={activity.id}>
                     <ItemContent>
                         <ItemHeader as='a'>{activity.title}</ItemHeader>
                         <Item.Meta>{activity.date}</Item.Meta>
                         <ItemDescription>
                             <div>{activity.description}</div>
                             <div>{activity.city},{activity.venue}</div>
                         </ItemDescription>
                         <Item.Extra>
                             <Button onClick={()=>activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                             <Button 
                             //name={activity.id}
                             loading={loading && target === activity.id} 
                             onClick={(e)=>handleActivityDelete(e,activity.id)} 
                             floated='right' 
                             content='Delete' 
                             color='red'/>
                             <Label basic content={activity.category}/>
                         </Item.Extra>
                     </ItemContent>
                 </Item>
             ))}
         </Item.Group>
     </Segment>
    )
})