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

  //   componentDidMount() {
  //   const { onMount } = this.props;

  //   onMount && onMount(this.props, this.state, this.onSuccess, this.onError);

  //   fetchStatuses(statusArray => 
  //     this.setState({
  //       statuses: statusArray,
  //   }));
  // }

  setExpandedState(tileIndex) {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
      isExpandedIndex: tileIndex
    });
  }


  onClose(){
    this.setExpandedState(0);
  }

  onClick(e) {
    this.setExpandedState(tileId);
  }

  render() {
    const {statuses, isExpanded, isExpandedIndex} = this.state;
    const dialogStatus = statuses.filter(status => status.id === isExpandedIndex);

    const { className, 'data-cy': cy } = this.props;

    return (
      <section
       className={`tile-handler ${className}`} 
       onClick={this.onClick} 
       data-cy={`tile-handler-${cy}`}>
        {statuses.map(
          (status) => <Tile key={status.id} {...status} />
        )}
        {/* {this.state.isExpanded ? 
          <HealthCheck { ...{ isExpanded, ...dialogStatus[0] }} handleClose={this.handleClose}/>
          : null
        } */}
      </section>
    );
  }
}