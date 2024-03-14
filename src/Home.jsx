import React, {useState} from "react";
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
export default function Home(){
    const {currentUser} = auth
    const [showModal, setShowModal] = useState(false)
    const history = useNavigate()
    const newGameOptions = [
        {label : 'Black pieces', value: 'b'},
        {label : 'White pieces', value: 'w'},
        {label : 'Random', value: 'r'},
    ]

    function handlePlayOnline(){
        setShowModal(true)
    }

    async function startOnlineGame(startingPiece){
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'random' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true,
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        history(`game/${game.gameId}`)
    }
    function startLocalGame() {
        history('/game/local')
    }
    return (
        <>
            <div className="columns home">
                <div className="column has-backgound-primary home-columns">
                    <button className="button is-link" onClick={startLocalGame}>
                        Play Local Match
                    </button>
                </div>
                <div className="column has-backgound-link home-columns">
                    <button className="button is-primary" onClick={handlePlayOnline}>
                        Play Online Match
                    </button>
                </div>
            </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="card">
                            <div className="card-content">
                                Select the piece you want to start
                            </div>
                            <footer className="card-footer">
                            {newGameOptions.map(({label, value}) => (
                                <span className="card-footer-item pointer"
                                key={value}
                                onClick={() => startOnlineGame(value)}>
                                    {label}
                                </span>
                            ))}
                            </footer>
                        </div>
                    </div>
                    <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
            </div>
        </>
    )
}