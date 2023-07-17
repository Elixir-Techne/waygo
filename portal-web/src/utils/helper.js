export const removeAuthToken = () => {
    localStorage.clear()
}
  

export const getUser = () => {
  return {
    ...JSON.parse(localStorage.getItem('user') || '{}'),
    
  }
}