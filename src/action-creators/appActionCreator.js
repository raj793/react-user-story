import { appReducerConstants } from '../constants/appReducerConstants'

export function setUserData(obj) {
  return { type: appReducerConstants.SET_USER_DATA,
  data: obj
  }
}

export function setUserStories(obj) {
  return { type: appReducerConstants.SET_STORIES,
  data: obj
  }
}

export function updateStoryStatus(obj) {
  return {
    type: appReducerConstants.UPDATE_STORY_STATUS,
    data: obj
  }
}