export const removeAuthToken = () => {
    localStorage.clear()
}
  

export const getUser = () => {
  return {
    ...JSON.parse(localStorage.getItem('user') || '{}'),
    
  }
}

export const getChamberStatus = (code) => {
  if (code === "0") return "Operating";
  else return "Idle";
};