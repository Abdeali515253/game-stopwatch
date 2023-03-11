import { useEffect, useRef, useState } from "react";

const Test = () => {

    const val = useRef(1);
    const [st, setSt] = useState(false);
    const int = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log("fass")
    }, [st])

    const changeState = () => {
        setSt(st => !st);
        
    }
    
    const changeRef = () => {
        val.current+=1;
    }
    
    const manageInterval = () => {
        if(int.current == null){
            int.current = setInterval(() => {
                setIndex(Math.random())
            },100)
        } else {
            clearInterval(int.current);
            int.current=null
        }
    }

    return ( 
        <div>
            <p>{val.current}</p>
            <p>{index}</p>
            <p>{st ? "false" : "true"}</p>
            <input type={"button"} value="change ref" onClick={changeRef} />
            <input type={"button"} value="change state" onClick={changeState}/>
            <input type={"button"} value="manage interval" onClick={manageInterval}/>
        </div>
    );
}
 
export default Test;