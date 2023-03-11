import './roundInfo.css'
import { BsShare } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import Notification from './notification';

const RoundInfo = ({score, highScore, buffer, gameOver }) => {

    const [notify, setNotify] = useState(false)

    let difficulties = {0: "very hard", 20: "hard", 50: "medium", 100: "easy"}
    const shareImage = () => {
        let string = '\u23F1 Stop \u23F1 \n\n'
        string += `Score: ${score}\nHigh Score: ${highScore}\n\n`
        string += `Difficulty: ${difficulties[buffer]}\n\nLink: https://abdeali515253.github.io/game-stopwatch/`

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


    return (  
        <div className={"roundInfo"}>
            <div className='details'>
                <div>high score: {highScore}</div>
                <div>current score: {score}</div>
            </div>
        </div>
    );
}
 
export default RoundInfo;