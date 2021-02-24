import React from "react"
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {logInTC} from "./Reducers/loginReduce";
import {AppRootState} from "./store";
import {Redirect} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoginIn)


    const formik = useFormik({
        validate: values => {
            if (!values.email) {
                return {email: 'Email required'}
            }
            if (!values.password) {
                return {password: 'Password required'}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        }, onSubmit: values => {
            dispatch(logInTC(values))
        },

    })
    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <div style={{marginBottom: 20}}>
                    <input type="text" placeholder={'email'} {...formik.getFieldProps('email')}/>
                    {formik.errors.email ? <div style={{display: "block"}}>{formik.errors.email}</div> : null}
                </div>

                <div>
                    <input type="password" placeholder={'password'}  {...formik.getFieldProps('password')}/>
                    {formik.errors.password ? <div style={{display: "block"}}>{formik.errors.password}</div> : null}
                </div>

                <div>
                    <input type="checkbox" checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>

                    <span>Remember me</span>
                    <button type={'submit'}>Login</button>
                </div>

            </form>
        </div>
    )
}