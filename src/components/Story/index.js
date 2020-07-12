import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Descriptions, Badge, Button } from 'antd';
import { updateStoryAction } from '../../actions/appActions'
import './story.css'

/* 
Component to review story for admins
*/
const Story = withRouter(({match, stories, user, history}) => {

  const dispatch = useDispatch();
  const [story, setStory] = useState(stories.find(obj => obj.id === parseInt(match.params.id)))

  const statusTypes = [
    {badge:"success", text: "Accepted"},
    {badge:"error", text: "Rejected"},
    {badge:"processing", text: "To be reviewed"}
  ]

  const getStatus = (type) => {
    return statusTypes[type]
  }

  const onButtonPress = (accepted) => {
    if(accepted) {
      setStory(story => {
        story.status = 0
        dispatch(updateStoryAction(story))
        history.push('/')
        return story
      })
    }
    else {
      setStory(story => {
        story.status = 1
        dispatch(updateStoryAction(story))
        history.push('/')
        return story
      })
    }
  }

  return (
    <>
      <Descriptions title="Story Review" layout="vertical" bordered>
        <Descriptions.Item label="Summary">
          {story.summary}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {story.type}
        </Descriptions.Item>
        <Descriptions.Item label="Complexity">
          {story.complexity}
        </Descriptions.Item>
        <Descriptions.Item label="Estimated time for completion">
          {story.estimatedHrs}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status={getStatus(story.status).badge} text={getStatus(story.status).text} />
        </Descriptions.Item>
        <Descriptions.Item label="Cost">
          {`$${story.cost}`}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {story.description}
        </Descriptions.Item>
      </Descriptions>
      <div className='button-container'>
        <Button onClick={() => {onButtonPress(true)}} type="primary" size={'large'} style={{ background: "green", borderColor: "green" }}>
          Accept
        </Button>
        <Button onClick={() => {onButtonPress(false)}} type="primary" size={'large'} style={{ background: "red", borderColor: "red" }}>
          Reject
        </Button>
      </div>
    </>
  )
})

function mapStateToProps(store){
  return{
      user: store.app.user,
      stories: store.app.stories
  };
}

export default connect(mapStateToProps)(Story);