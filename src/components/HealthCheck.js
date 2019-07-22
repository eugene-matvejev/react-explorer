import React from 'react';
import {Dialog} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';

const HealthCheck = ({handleClose, isExpanded, name, status}) => {
  
  return (  
    <Dialog
      onClose={ handleClose }
      open={ isExpanded }>
      <MuiDialogTitle> {name} </MuiDialogTitle>
      <MuiDialogContent> {status} </MuiDialogContent>
    </Dialog>
  ) 
}

HealthCheck.propTypes = {
  name : PropTypes.string.isRequired,
  status : PropTypes.oneOf(['red', 'amber', 'green']).isRequired,
  isExpanded : PropTypes.bool.isRequired,
  handleClose : PropTypes.func.isRequired,
}

export default HealthCheck;