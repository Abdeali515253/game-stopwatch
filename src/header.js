import './header.css'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { BsShare } from 'react-icons/bs';

const Header = ({ changePopupOpen, changeHighScorePopupOpen }) => {

    const shareGame = () => {
        if(navigator.share) {
            navigator.share({
                title: 'Race Against Time',
                url: 'https://raceagainsttime.xyz'
            })
        }
    }

    return ( 
      <div className="header">
            <BsShare size={20} className={"icon"}
                onClick={changeHighScorePopupOpen}
            />
           <div className={"title"} onClick={shareGame}>R.A.T</div>
            <FaRegQuestionCircle size={20} className={"icon"}
                onClick={changePopupOpen}
            />
      </div>
    );
}
 
export default Header;