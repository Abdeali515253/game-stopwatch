import './difficulty.css'


const Difficulty = ({timer, changeBuffer, buffer, highScores}) => {
    return ( 
        <div className="difficulty">
            <div className="diftitle">difficuly: </div>
                <select className={timer===0 ? "options" : "options disabled"}
                value={buffer}
                onChange={changeBuffer} disabled={!(timer===0)}>
                    <option value={0}>very hard ---- hs: {highScores[0]}</option>
                    <option value={20}>hard ---- hs: {highScores[20]}</option>
                    <option value={50}>medium ---- hs: {highScores[50]}</option>
                    <option value={100}>easy ---- hs: {highScores[100]}</option>
                </select>
        </div> 
);
}
 
export default Difficulty;