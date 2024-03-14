import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import GameApp from "./GameApp";
import UserForm from './UserForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

export default function App(){
    const [user, loading, error] = useAuthState(auth)
    if (loading){
        return 'loading...'
    }
    if (error){
        return 'error...'
    }
    if (!user){
        return <UserForm />
    }
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/game/:id" element={<GameApp/>} />
            </Routes>
        </Router>
    )
}