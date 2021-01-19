import { useState } from 'react';
import { userLogin } from 'features/user/userSlice';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store/index';

function LoginPage() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [email, seteEmail] = useState('');
    const [password, setPassword] = useState('');
    function onEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
        seteEmail(e.target.value);
    }
    function onPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }
    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        // e.preventDefault() 가 없으면 submit 실행할 때마다 페이지 새로고침이 되어버림
        e.preventDefault();

        dispatch(userLogin({ email, password })).then((response: any) => {
            console.log(response);
            if (response.payload.loginSuccess) {
                history.push('/');
            }
        });
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="Password" value={password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
