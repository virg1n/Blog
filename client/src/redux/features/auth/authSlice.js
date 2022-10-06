import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
    email:null,
    token:null,
    isLoading:false,
    status:null
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({email, password})=>{
    try {
        const {data} = await axios.post('/registration', {
            email,
            password
        })
        if(data.token){
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error);
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({email, password})=>{
    try {
        const {data} = await axios.post('/login', {
            email,
            password
        })
        if(data.token){
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error);
    }
})

export const getMe = createAsyncThunk('auth/getme', async ()=>{
    try {
        const {data} = await axios.get('/getme')
        return data
    } catch (error) {
        console.log(error);
    }
})


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.email = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers:{
        //register User

        [registerUser.pending]:(state)=>{
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.status = action.payload.message
            state.email = action.payload.email
            state.token = action.payload.token
        },
        [registerUser.rejected]:(state, action)=>{
            state.status = action.payload.message
            state.isLoading = false
        },

        //login User

        [loginUser.pending]:(state)=>{
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.status = action.payload.message
            state.email = action.payload.email
            state.token = action.payload.token
        },
        [loginUser.rejected]:(state, action)=>{
            state.status = action.payload.message
            state.isLoading = false
        },

        //Провекра Авторизации

        [getMe.pending]:(state)=>{
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.status = null
            state.email = action.payload?.email
            state.token = action.payload?.token
        },
        [getMe.rejected]:(state, action)=>{
            state.status = action.payload.message
            state.isLoading = false
        }
    }
})

export const checkIsAuth = (state)=> Boolean(state.auth.token)
export const { logout } = authSlice.actions

export default authSlice.reducer
