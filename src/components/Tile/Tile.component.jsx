import React from 'react';
import './Tile.styles.css';

const Tile = ({ mode, title, cases, total }) => {
  const content = mode ?
    cases :
    `${((parseInt(cases) / parseInt(total)) * 100).toFixed(2)}%`;

  const bottomLine = mode ? `Total: ${total}` : '';

  return (
    <div className='tile'>
      <h3 className="tile__header">{title}</h3>
      <h1>{content}</h1>
      <p>{bottomLine}</p>
    </div>
  );
};

export default Tile;