import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'antd';
import { useCookies } from 'react-cookie'
import { setUserStoriesAction } from '../../actions/appActions';
import StoryApi from '../../api/storyApi';
import {COOKIE_KEY} from '../../config';
import './home.css';

/* 
Component to display stories for user or admin.
*/
const Home = ({user, stories, history}) => {
  const story = new StoryApi(user.token);
  const dispatch = useDispatch();
  const isAdmin = user.role === 'Admin'
  const [cookies, setCookie, removeCookie] = useCookies();

  const processData = (data) => {
    return data.map((story, index) => {
      story.key = index;
      //Setting story status
      story.status = 2;
      return story;
    })
  }

  const getStory = async () => {
    const stories = await story.getStories()
    if(stories.status === 200) {
      const processedData = processData(stories.data)
      dispatch(setUserStoriesAction(processedData));
    }
  }

  const logout = () => {
    window.localStorage.clear();
    removeCookie(COOKIE_KEY);
    history.push('/')
    window.location.reload();
  }

  useEffect(() => {
    if(stories.length === 0 || !isAdmin)
      getStory();
  }, [])

  const complexityTypes = {
    low: 0,
    mid: 1,
    high: 2
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id > b.id,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Summary',
      key: 'summary',
      dataIndex: 'summary'
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description'
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      filters: [
        {
          text: 'Enhancement',
          value: 'enhancement',
        },
        {
          text: 'BugFix',
          value: 'bugfix',
        },
        {
          text: 'Development',
          value: 'development',
        },
        {
          text: 'QA',
          value: 'QA',
        }
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: 'Complexity',
      dataIndex: 'complexity',
      key: 'complexity',
      sorter: (a, b) => complexityTypes[a.complexity] > complexityTypes[b.complexity],
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Estimated time for completion',
      key: 'estimatedHrs',
      dataIndex: 'estimatedHrs'
    },
    {
      title: 'Cost',
      key: 'cost',
      dataIndex: 'cost'
    }
  ]

  const rowRedirect = (record) => {
    if(isAdmin) {
      history.push(`/story/${record.id}`)
    }
  }

  const colors = [
    'success',
    'error',
    'none'
  ]

  const getRowClassName = (status) => {
    return colors[status]
  }

  return <div className="home-container">
      <Table
        rowClassName={(record) => isAdmin ? getRowClassName(record.status): null}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {rowRedirect(record)}
          };
        }}
        columns={columns} 
        dataSource={stories} 
      />

      <Button onClick={logout} type="danger" size={'large'} >
          Logout
      </Button>
    </div>
}

function mapStateToProps(store){
  return{
      user: store.app.user,
      stories: store.app.stories
  };
}

export default connect(mapStateToProps)(withRouter(Home));