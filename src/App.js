import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";

function App() {
  const {tg,user,onClose} = useTelegram()
  useEffect(()=>{
      tg.ready()
  },[])
  return (
    <div className="App">
        <button onClick={onClose}>close</button>
        <p>
            {JSON.stringify(user,null, 2)}
        </p>
    </div>
  );
}

export default App;
