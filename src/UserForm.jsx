import React, {useState} from "react";
import { auth } from './firebase'


export default function UserForm(){
    const [name, setName] = useState('')
    async function handleSubmit(e){
        e.preventDefault()
        localStorage.setItem('userName', name)
        await auth.signInAnonymously()
    }
    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h1>Enter your name</h1>
            <br/>
            <div className="field">
                <p className="control">
                    <input 
                    type="text" 
                    className="input" 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required />
                </p>
            </div>
            <div className="field">
                    <p className="control">
                        <button className="button is-success" type="submit">
                            Submit
                        </button>
                    </p>
            </div>
        </form>
    )
}