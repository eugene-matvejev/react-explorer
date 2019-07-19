import React from 'react';
import PropTypes from 'prop-types';
import {TileHeader, TileWrapper} from './RAGTileStyling';


const RAGTile = props => {
  const {name, status, handleClick} = props;
    return (
      <React.Fragment>
        <TileWrapper tileColour = {status} onClick = {handleClick}>
            <TileHeader> {name} </TileHeader>
        </TileWrapper>
      </React.Fragment>    
    );
}

RAGTile.propTypes = {
  name : PropTypes.string.isRequired,
  status : PropTypes.oneOf(['red', 'amber', 'green']).isRequired,
}

export default RAGTile;