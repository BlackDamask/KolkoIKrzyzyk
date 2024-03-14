import React, {useState} from 'react';

export default function Player( {name, symbol, isActive, changeNameEvent } ){
    const [isEditing, setIsEditing] = useState(false);
    
    
    const buttonHandler = () => {
        setIsEditing((current) => !current);
      }
    
    
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className = "player">
                {isEditing ? <input required value={name} 
                onChange={changeNameEvent}/> : <span className = "player-name">{name}</span> }
                <span className = "player-symbol">{symbol}</span>

            </span>
            <button onClick={buttonHandler}>{isEditing ? "Zapisz" : "Zmień"}</button>
        </li>
    );
}