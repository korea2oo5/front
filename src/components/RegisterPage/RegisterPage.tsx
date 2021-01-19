import { useState } from 'react';
import { registerUser } from 'features/user/userSlice';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store/index';

function RegisterPage() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    function onEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }
    function onNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }
    function onPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }
    function onConfirmPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }
    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        // e.preventDefault() 가 없으면 submit 실행할 때마다 페이지 새로고침이 되어버림
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        dispatch(registerUser({ email, name, password })).then((response) => {
            if (response.payload.data.isAuth) {
                history.push('/login');
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
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="Password" value={password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="Password" value={confirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
