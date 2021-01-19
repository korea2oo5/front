import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, logout, auth } from 'api/user';
import { RootState } from 'store';

interface User {
    email: string;
    isAdmin: boolean;
    isAuth: boolean;
    name: string;
    _id: string;
}

const initialState: User = {
    email: '',
    isAdmin: false,
    isAuth: false,
    name: '',
    _id: '',
};

export const userLogin = createAsyncThunk('user/login', async (userData: any) => {
    const { email, password } = userData;
    return await login(email, password);
});

export const registerUser = createAsyncThunk('user/register', async (userData: any) => {
    const { email, name, password } = userData;
    return await register(email, name, password);
});

export const userLogout = createAsyncThunk('user/logout', async () => {
    return await logout();
});

export const userAuth = createAsyncThunk('user/auth', async () => {
    return await auth();
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [userLogin.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userLogin.fulfilled.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userLogin.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [registerUser.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [registerUser.fulfilled.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [registerUser.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userLogout.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userLogout.fulfilled.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
            state.email = '';
            state.isAdmin = false;
            state.isAuth = false;
            state.name = '';
            state._id = '';
        },
        [userLogout.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userAuth.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [userAuth.fulfilled.toString()]: (state, action) => {
            console.log(state);
            console.log(action);
            // return { ...state, User: action.payload.data };
            state.email = action.payload.data.email;
            state.isAdmin = action.payload.data.isAdmin;
            state.isAuth = action.payload.data.isAuth;
            state.name = action.payload.data.name;
            state._id = action.payload.data._id;
        },
        [userAuth.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
    },
});

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
