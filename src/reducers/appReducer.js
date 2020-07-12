import {appReducerConstants} from '../constants/appReducerConstants'

let initialState = {
    user: {},
    stories: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case appReducerConstants.RESET: {
            const stateObj = {...initialState}
            return stateObj
        }
        case appReducerConstants.SET_USER_DATA: {
          const stateObj = {...state}
          stateObj.user = Object.assign({}, action.data)
          return stateObj
        }
        case appReducerConstants.SET_STORIES: {
          const stateObj = {...state}
          stateObj.stories = action.data
          return stateObj
        }
        case appReducerConstants.UPDATE_STORY_STATUS: {
          const stateObj = {...state}
          stateObj.stories.map((story, index) => {
            if(story.id === action.data.id)
            {
              return action.data;
            }
            return story;
          })
          return stateObj
        }
        default: return state
    }
}