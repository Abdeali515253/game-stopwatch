import './popup.css'
import './highScorePopup.css'
import { AiFillCloseCircle } from 'react-icons/ai';
import Conefetti from './confetti';
import { useRef, useState } from 'react';
import { BsShare } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import Notification from './notification';


const HighScorePopup = ({popupOpen, setPopupOpen, score, buffer, getTimeString, highScore, highScoreChanged }) => {

    const expref = useRef();
    let difficulties = {0: "very hard", 20: "hard", 50: "medium", 100: "easy"}
    const shareImage = () => {
        let string = '\u23F1 Race Against Time \u23F1 \n\n'
        string += `Score: ${score}\nHigh Score: ${highScore}\n\n`
        string += `Difficulty: ${difficulties[buffer]}\n\nLink: https://raceagainsttime.xyz`

        if(!isMobile){
            //navigator.clipboard.write([new ClipboardItem({ 'image/png': image })])
            navigator.clipboard.writeText(string)
            setNotify(true)
        }   
        else if(navigator.share) {
            navigator.share({
                text: string,
                title: 'score',
            })

        }
                
    }

    const [canClose, setCanClose] = useState(false);
    const [notify, setNotify] = useState(false)

    const closePopup = (e) => {
        if(!canClose) return;
        if(e.target.className === "popup" || e.target.className === "bg") setPopupOpen(prev => !prev)
    }


    return (
        <div className='bg' onClick={closePopup} onAnimationEnd={() => {setCanClose(true)}}>

            <div className={popupOpen ? "popup" : "popup no"} >

                {highScoreChanged && <Conefetti />}

                <div className="popup-container">
                    <AiFillCloseCircle size={20} className={"popup-cancel"} onClick={() => setPopupOpen(prev => !prev)} />

                    <div className='popup-info'  ref={expref}>
                        {notify && <Notification text={"Text Copied To Clipboard"} perform={() => {setNotify(false)}} />}
                        <div className="popup-title">
                            <div className='heading'>{highScoreChanged ? "new high score!": "Score"}</div>
                        </div>
                        <div className='rules'>
                            <div className='rule'>
                                Score: {score}
                            </div>
                            <div className='rule'>
                                High Score: {highScore}
                            </div>
                            <div className='rule'>Difficulty: {difficulties[buffer]}</div>
                        </div>
                    </div>
                    <button className='share-button' onClick={shareImage} >
                        <div className='share'>
                            share
                        </div>
                        <BsShare size={20} className={"share"}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default HighScorePopup;