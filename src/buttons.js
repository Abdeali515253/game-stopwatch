import './buttons.css'

const Buttons = ({ running, handleReset, handleStart,  handleStop, gameOver }) => {

    const StartButton = (
        <button className={gameOver ? "button fade" : "button"} onClick={handleStart}>
          Start
        </button>
      );
      const StopButton = (
        <button className='button' onClick={handleStop}>
          Stop
        </button>
      );
      
      return (
        <div className='buttons'>
          <button className={!gameOver ? "button fade" : "button"} onClick={handleReset}>
            Reset
          </button>
          {running ? StopButton : StartButton }
        </div>
      );
}
 
export default Buttons;