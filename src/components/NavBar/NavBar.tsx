import { useHistory } from 'react-router-dom';
import { userLogout } from 'features/user/userSlice';
import { useAppDispatch } from 'store/index';
import 'components/NavBar/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { user } from 'features/user/userSlice';

function NavBar() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const userData: any = useSelector(user);
    console.log(userData);

    const [isActive, setIsActive] = useState(false);
    function onClickHandler() {
        dispatch(userLogout()).then((response: any) => {
            history.push('/');
        });
    }
    function toggleBtn() {
        setIsActive(!isActive);
    }
    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="navbarLogo">
                        <a href="/">ONECLICKAI</a>
                    </div>
                    <ul className={`navbarMenu ${isActive ? 'active' : ''}`}>
                        {userData.isAuth ? (
                            <>
                                <li>
                                    <a href="/logout">{userData.name}님</a>
                                </li>
                                <li>
                                    <a href="" onClick={onClickHandler}>
                                        로그아웃
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/login">로그인</a>
                                </li>
                                <li>
                                    <a href="/register">회원가입</a>
                                </li>
                            </>
                        )}
                        <li>
                            <a href="/train">시작하기</a>
                        </li>
                    </ul>
                    <div className="navbarToggleBtn" onClick={toggleBtn}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </nav>
            </header>
        </>
    );
}
export default NavBar;
