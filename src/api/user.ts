import axios from 'axios';

export async function login(email: string, password: string) {
    const { data } = await axios.post('/api/users/login', {
        email: email,
        password: password,
    });
    return data;
}

export async function register(email: string, name: string, password: string) {
    const { data } = await axios.post('/api/users/register', {
        email: email,
        name: name,
        password: password,
    });
    return data;
}

export async function logout() {
    return axios.get('/api/users/logout');
}
export async function auth() {
    return axios.get('/api/users/auth');
}
