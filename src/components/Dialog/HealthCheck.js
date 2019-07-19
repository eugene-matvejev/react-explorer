import React from 'react';
import {Dialog} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';


const HealthCheck = props => {
  const {handleClose, isExpanded, name, status} = props;
  return (
    
    <div>
      <Dialog
        onClose={ handleClose }
        open={ isExpanded }>
        <MuiDialogTitle> {name} </MuiDialogTitle>
        <MuiDialogContent> {status} </MuiDialogContent>
      </Dialog>
    </div>
  ) 
}

export default HealthCheck;