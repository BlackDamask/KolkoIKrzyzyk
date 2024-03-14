import cross from '../assets/cross.png';
import heart from '../assets/heart.png';

export default function GameBoard({ onSquareSelect, board }) {
    

    function ChooseImage(symbol) {
        if (symbol === 'X') {
            return <img src={cross} className="symbol-image" alt="cross"/>;
        } else if (symbol === 'O') {
            return <img src={heart} className="symbol-image" alt="heart"/>;
        }
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => {onSquareSelect(rowIndex, colIndex)}} disabled = {playerSymbol != null}>
                                    {playerSymbol && ChooseImage(playerSymbol)}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
