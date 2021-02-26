import React, {useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootState} from './store'
import {appStatusType, initializeTC} from "./Reducers/appReducer";
import {CustomizedSnackbars} from "./ErrorSnackBar";
import {AppWithRedux} from "./AppWithRedux";
import {Login} from "./Login";
import {Route} from 'react-router-dom'
import {logOutTC} from "./Reducers/loginReduce";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const dispatch = useDispatch()
    const status = useSelector<AppRootState, appStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootState, boolean>((state) => state.app.initialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoginIn)

    const LogOutHandler = () => {
        debugger
        dispatch(dispatch(logOutTC))
    }

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(initializeTC())
    }, [])

    if (!initialized) {
        return <div style={{position: "fixed", width: '100%', top: '30%', textAlign: 'center'}}><CircularProgress/>
        </div>

    }


    return (
        <div className="App">
            <h1>todo</h1>
            <CustomizedSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={LogOutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/'} render={() => <AppWithRedux demo={demo}/>}/>
            </Container>
        </div>
    )
}

export default App
