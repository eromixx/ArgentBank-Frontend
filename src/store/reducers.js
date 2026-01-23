
export const authReducers = {
  logout: (state) => {
    state.token = null
    state.user = null
    state.error = null
    localStorage.removeItem('token')
  },
  clearError: (state) => {
    state.error = null
  },
}