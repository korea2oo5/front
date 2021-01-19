import { useEffect } from 'react';
import { userAuth } from 'features/user/userSlice';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useAppDispatch } from 'store/index';

export default function (SpecificComponent: any, option: any) {
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    function AuthCheck({ history }: RouteComponentProps) {
        const dispatch = useAppDispatch();
        //useEffect를 사용해서 초기 검증을 실행해준다
        console.log(option);
        useEffect(() => {
            dispatch(userAuth()).then((response: any) => {
                // console.log(response);
                // console.log(response.payload.data.isAuth);
                // 로그인 하지 않은 상태
                if (!response.payload.data.isAuth) {
                    // true => 로그인한 유저만 출입 가능
                    if (option === true) history.push('/login');
                    // 로그인 한 상태
                } else {
                    // false => 로그인한 유저는 출입 불가능
                    if (option === false) history.push('/');
                }
            });
        }, []);

        return <SpecificComponent />;
    }

    return withRouter(AuthCheck);
}
