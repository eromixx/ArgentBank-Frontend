import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginAPI, getUserProfileAPI, updateUsernameAPI } from '../services/api'
import { authReducers } from './reducers'

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isLoading: false,
  error: null,
}

// Thunk pour le login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await loginAPI(email, password)
      localStorage.setItem('token', token)
      return token
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk pour récupérer le profil
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const user = await getUserProfileAPI(token)
      return user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk pour mettre à jour le username
export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (userName, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const updatedUser = await updateUsernameAPI(token, userName)
      return updatedUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authReducers,
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    // Get User Profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    // Update Username
    builder
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer