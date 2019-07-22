import React from 'react';
import Tile from '../components/Tile';
import HealthCheck from '../components/HealthCheck';

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

export default class TileHandler extends React.Component {
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
    let className;
    return (
      <section className={`tile-handler ${className}`}>
        {statuses.map(
          (status) => <Tile key = {status.id} {...status} onClick={this.onClick} />
        )}
        {this.state.isExpanded ? 
          <HealthCheck { ...{ isExpanded, ...dialogStatus[0] }} handleClose={this.handleClose}/>
          : null
        }
      </section>
    );
  }
}