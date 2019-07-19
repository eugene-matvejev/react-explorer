import React from 'react';
import RAGTile from '../components/RAGTile/RAGTile';
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


class RAGTileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      isExpanded: false,
      isExpandedIndex: 0,
    }
  }
  
  componentDidMount() {
    fetchStatuses(statusArray => 
      this.setState({
        statuses: statusArray
    }));
  }

  setExpandedState(tileIndex) {
    this.setState(state => ({
      isExpanded: !state.isExpanded,
      isExpandedIndex: tileIndex
    }));
  }

  render() {
    const {statuses, isExpanded, isExpandedIndex} = this.state;
    const dialogStatus = statuses.filter(status => status.id === isExpandedIndex);

    return (
      <div>
        {statuses.map(
          (status) => <RAGTile key = {status.id} {...status} handleClick={() => this.setExpandedState(status.id)} />
        )}
        {this.state.isExpanded ? 
          <HealthCheck { ...{ isExpanded, ...dialogStatus[0] }} handleClose={() => this.setExpandedState(0)}/>
          : null
        }
      </div>
    );
  }
}

export default RAGTileContainer;