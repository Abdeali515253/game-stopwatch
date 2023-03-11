import './popup.css'
import { AiFillCloseCircle } from 'react-icons/ai';

const Popup = ({popupOpen, setPopupOpen}) => {

    const closePopup = (e) => {
        if(e.target.className === "popup" || e.target.className === "bg") setPopupOpen(prev => !prev)    
    }

    return (
        <div className='bg'   onClick={closePopup}>
            <div className={popupOpen ? "popup" : "popup no"}>
                <div className="popup-container">
                    <AiFillCloseCircle size={20} className={"popup-cancel"}  onClick={() => {setPopupOpen(prev => !prev)}}/>

                    <div className="popup-title">
                        <div className='heading'>rules</div>
                    </div>
                    <ul className='rules'>
                        <div className='rule'><li>get the timer between the values defined in the target to advance to next round</li></div>
                        <div className='rule'><li>you have one attempt each round</li></div>
                        <div className='rule'><li>missing the target will put you back at start</li></div>
                        <div className='rule'><li>challenge yourself at different difficulties</li></div>
                    </ul>

                </div>
            </div>
        </div>
    );
}
 
export default Popup;