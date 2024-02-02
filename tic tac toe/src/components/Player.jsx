import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(initialName);

    function handleEditClick() {
        if (isEditing) {
            setPlayerName(editedName);
        }
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setEditedName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = (
            <input type="text" required value={editedName} onChange={handleChange} />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
