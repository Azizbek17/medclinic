export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('token', serializedState)
  } catch (e) {
    console.log('Could not save state')
  }
}

export const loadState = () => {
  try {
    const serializedStorage = localStorage.getItem('token')
    if (serializedStorage === null) {
      return undefined
    }

    return JSON.parse(serializedStorage)
  } catch (e) {
    return undefined
  }
}
