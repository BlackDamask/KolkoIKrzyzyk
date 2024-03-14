export default function Log({nameX,nameO,turns}){

    return(
        <ol id = "log">
            {turns.map(turn => (<li key={`${turn.square.row}${turn.square.col}`}>{turn.player == 'X' ? nameX : nameO} wyblał {turn.square.row},{turn.square.col}</li>))}
        </ol>
    );
}