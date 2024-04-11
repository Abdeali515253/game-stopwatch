import { useEffect, useRef, useState } from "react";
import './stopwatch.css'
import Buttons from "./buttons";
import Timer from "./timer";
import Header from "./header";
import RoundInfo from "./roundInfo";
import Difficulty from "./difficulty";
import Popup from "./popup";
import HighScorePopup from "./highScorePopup";

import ding from "./ding-100501.mp3"
import loose from "./wrong-buzzer-6268.mp3"

import useSound from 'use-sound';
import ReactGA4 from 'react-ga4';

const Stopwatch = () => {
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false);
    const [buffer, setBuffer] = useState(50);
    const [score , setScore] = useState(0);
    const [css , setCSS] = useState("");
    const [gameOver, setGameOver] = useState(false)
    const [intervalID, setIntervalID] = useState(null);

    const [highScores, setHighScores] = useState({0: 0, 20: 0, 50: 0, 100: 0});
    const [oldHighScores, setOldHighScores] = useState(0);
    const [highScoreChanged, setHighScoreChanged] = useState(false);

    const [justOpened, setJustOpened] = useState(true);

    const [popupOpen, setPopupOpen] = useState(false)

    const [dingSound] = useSound(ding);
    const [looseSound] = useSound(loose);

    const personalTimer = useRef(0);
    useEffect(() => {
        let scores = JSON.parse(localStorage.getItem("highscores"));
        if(scores !== null){
            setHighScores(scores);
            setOldHighScores(scores[buffer])
        }
        let firstTime = localStorage.getItem("firstTime");
        if(firstTime === null){
            setPopupOpen(true)
            localStorage.setItem("firstTime", false)
        }
    }, [])

    useEffect(() => {
        if(!running && justOpened) {
            setJustOpened(false)
        }
        else if(!running && !justOpened) {
            clearInterval(intervalID);
            setIntervalID(null)
            let center = (score+1)*1000;
            if(personalTimer.current > center+buffer+9 || personalTimer.current < center-buffer){
                setCSS("shake")
                looseSound()

                setGameOver(true)
                if(highScores[buffer] > oldHighScores) {
                    setOldHighScores(highScores[buffer])
                    setHighScorePopupOpen(true)
                    setHighScoreChanged(true)
                }
            } else{
                dingSound()
                setScore(prev => prev+1)
            }
        }
    }, [running])

    useEffect(() => {
        if(score > highScores[buffer]) {
            let scores = { ...highScores }
            scores[buffer] = score
            setHighScores(scores)
            localStorage.setItem('highscores', JSON.stringify(scores))
        }
    }, [score])

    const startTime = useRef(null);

    const handleStart = () => {
        if (intervalID != null) return;
        startTime.current = Date.now() - personalTimer.current

        if(score === 0) {
            ReactGA4.event({
                category: "Someone Played The Game",
                action: "Someone Played The Game",
                label: "Someone Played The Game",
            });
        }

        let interval = setInterval(() => {
            personalTimer.current = Date.now() - startTime.current;

            let upperLimit = (score+1)*1000+buffer;
            if (personalTimer.current > upperLimit+10) personalTimer.current = upperLimit+10

            setTimer(personalTimer.current);

            
            if(personalTimer.current > upperLimit+9) setRunning(false)
        },10)
        setIntervalID(interval)
        setRunning(true)
    }

    const handleStop = () => {
        setRunning(false)
    }

    const handleReset = () => {

        setTimer(0)
        personalTimer.current = 0
        setScore(0)
        setCSS("")
        setGameOver(false)
        setRunning(false)
        setHighScoreChanged(false)
        startTime.current = null
    }

    const changeBuffer = (e) => {
        setOldHighScores(highScores[parseInt(e.target.value)])
        setBuffer(parseInt(e.target.value))
    }

    const changePopupOpen = () => {
        if(running===false) setPopupOpen(prev => !prev)
    }

    const [highScorePopupOpen, setHighScorePopupOpen] = useState(false)
    const changeHighScorePopupOpen = () => {
        if(running===false) setHighScorePopupOpen(prev => !prev)
    }

    const getTimeString = (time) => {
        return (
            ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" +
            ("0" + Math.floor((time/ 1000) % 60)).slice(-2) + "." +
            ("0" + Math.floor((time / 10) % 100)).slice(-2)
        )
    }

    return ( 
        <div className="stopwatch" id="stopwatch">
            <Header 
                changeHighScorePopupOpen={changeHighScorePopupOpen}
                changePopupOpen={changePopupOpen}
            />

            {popupOpen && <Popup 
                popupOpen={popupOpen}
                setPopupOpen={setPopupOpen}
            />}

            {highScorePopupOpen && <HighScorePopup 
                popupOpen={highScorePopupOpen}
                setPopupOpen={changeHighScorePopupOpen}
                score={score}
                buffer={buffer}
                getTimeString={getTimeString}
                highScore={highScores[buffer]}
                highScoreChanged={highScoreChanged}
            />}

            <RoundInfo 
                score={score}
                highScore={highScores[buffer]}
                buffer={buffer}
                gameOver={gameOver}
            />
            <Difficulty 
                timer={timer}
                changeBuffer={changeBuffer}
                buffer={buffer}
                highScores={highScores}
            />
            <Timer 
                timer={timer}
                css={css}
                score={score}
                buffer={buffer}
                getTimeString={getTimeString}
            />
            <Buttons 
                running={running}
                gameOver={gameOver}
                handleReset={gameOver ? handleReset : () => {}}
                handleStart={!gameOver ? handleStart : () => {}}
                handleStop={handleStop}
            />
        </div>
    );
}
 
export default Stopwatch;