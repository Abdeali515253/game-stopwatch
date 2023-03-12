import './timer.css'

const Timer = ({ timer, css, score, buffer, getTimeString }) => {

    return ( 
        <div className="timer">
            <div className={"time " + css}>
                <span className="digits">
                    {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                    {("0" + Math.floor((timer/ 1000) % 60)).slice(-2)}.
                </span>
                <span className="digits mili-sec">
                    {("0" + Math.floor((timer / 10) % 100)).slice(-2)}
                </span>
            </div>
            {buffer !== 0 && <div className='target'>
                target: {getTimeString((score+1)*1000-buffer)}{"-"}{getTimeString((score+1)*1000+buffer)}
            </div>}
            {buffer === 0 && <div className='target'>
                target: {getTimeString((score+1)*1000+buffer)}
            </div>}
        </div>
    );
}
 
export default Timer;