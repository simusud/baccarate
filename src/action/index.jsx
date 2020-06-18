import React from 'react';

const Actions = ({
  gameState,
  totalBets,
  handleActionClick,
}) => {
  if (!gameState) {
    return (
      <div
        className={`deal-btn ${!totalBets ? 'inactive' : ''}`}
        onClick={handleActionClick('deal')}
      >
        Deal
      </div>
    );
  }
};
export default Actions;