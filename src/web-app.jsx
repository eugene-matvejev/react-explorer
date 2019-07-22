import React from 'react';
import TileHandler from './handlers/TileHandler';

export default class WebApp extends React.Component {
    render() {
        return (
            <div className="App">
              
              <TileHandler />
            </div>
          );
    }

    static propTypes = {
    };

    static defaultProps = {
    };
}
