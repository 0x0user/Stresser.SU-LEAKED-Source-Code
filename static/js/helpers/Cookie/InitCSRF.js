import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CSRFTokenAction from '../../requests/Utils/CSRF';
import Cookies from 'js-cookie';

export function InitCSRF(){

    const csrf = useSelector(state => state.csrf);

    const dispatch = useDispatch();

    const session_cookie = Cookies.get("SESSION");

    useEffect(() => {
        if(csrf.loaded || session_cookie) return;
        dispatch(CSRFTokenAction());
    }, [csrf, dispatch, session_cookie]);

};
