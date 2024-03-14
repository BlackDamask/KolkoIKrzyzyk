export default function GameOver({winner, handleRematch}){
    return(
        <div id = 'game-over'>
            <h2>Gra skończona!</h2>
            <p>{winner}</p>
            <p>
                <button onClick={handleRematch}>Rewanż!</button>
            </p>
        </div>
    );
}