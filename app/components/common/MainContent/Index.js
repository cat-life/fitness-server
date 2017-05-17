import React from 'react';

const MainContent = function(props) {
  return (
    <div className="page-wrapper">
      {props.children}
    </div>
  );
}

export default MainContent;
