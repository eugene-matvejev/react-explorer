import React from 'react';
import RagTile from '../components/RagTile/RagTile';
import HealthCheck from '../components/Dialog/HealthCheck';

const fetchStatuses = callBack => callBack([
    {
      id: 1,
      status : "red",
      name : "Health Check 1",
      parent: null
    },
    {
      id: 2,
      status: "green",
      name: "Health Check 2",
      parent: null
    },
    {
      id: 3,
      status: "amber",
      name: "Health Check 3",
      parent: null
    }
]);

export default class RagTileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      isExpanded: false,
      isExpandedIndex: 0,
    }

    this.onClick = this.onClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount() {
    fetchStatuses(statusArray => 
      this.setState({
        statuses: statusArray,
    }));
  }

  setExpandedState(tileIndex) {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
      isExpandedIndex: tileIndex
    });
  }

  onClick(tileId) {
    this.setExpandedState(tileId);
  }

  handleClose(){
    this.setExpandedState(0);
  }

  render() {
    const {statuses, isExpanded, isExpandedIndex} = this.state;
    const dialogStatus = statuses.filter(status => status.id === isExpandedIndex);

    return (
      <div>
        {statuses.map(
          (status) => <RagTile key = {status.id} {...status} onClick={this.onClick} />
        )}
        {this.state.isExpanded ? 
          <HealthCheck { ...{ isExpanded, ...dialogStatus[0] }} handleClose={this.handleClose}/>
          : null
        }
      </div>
    );
  }
}