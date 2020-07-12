import { setUserData, setUserStories, updateStoryStatus } from '../action-creators/appActionCreator'

export function setUserDataAction(value) {
  return function(dispatch) {
    dispatch(setUserData(value))
  }
}

export function setUserStoriesAction(stories) {
  return function(dispatch) {
    dispatch(setUserStories(stories))
  }
}

export function updateStoryAction(obj) {
  return function(dispatch) {
    dispatch(updateStoryStatus(obj))
  }
}