import React from 'react';
import PropTypes from 'prop-types';
import {TileWrapper, TileHeader} from './RagTileStyling';


const RagTile = ({id, name, status, onClick}) => {
  return (
    <TileWrapper tileColour = {status} onClick = {() => onClick(id)}>
        <TileHeader> {name} </TileHeader>
    </TileWrapper> 
  )
}
  
RagTile.propTypes = {
  id: PropTypes.number.isRequired,
  name : PropTypes.string.isRequired,
  status : PropTypes.oneOf(['red', 'amber', 'green']).isRequired,
  onClick : PropTypes.func.isRequired,
}

export default RagTile;