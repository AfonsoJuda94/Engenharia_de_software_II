import { Router, Route, Routes } from "react-router"
import Login from './Login.js'
import Principal from "./Principal.js"
export default function routes(){
    <Router>
        
        <Routes>
            <Route path="/" component={Principal}/>
            <Route path = '/Login' component={Login}/>
        </Routes>
    </Router>
}