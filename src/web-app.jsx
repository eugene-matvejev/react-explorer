import React from 'react';
import RagTileContainer from './containers/RagTileContainer';

export default class WebApp extends React.Component {
    render() {
        return (
            <div className="App">
              
              <RagTileContainer />
            </div>
          );
    }

    static propTypes = {
    };

    static defaultProps = {
    };
}
