import React from 'react';
import RAGTileContainer from './containers/RAGTileContainer';

export default class WebApp extends React.Component {
    render() {
        return (
            <div className="App">
              
              <RAGTileContainer />
            </div>
          );
    }

    static propTypes = {
    };

    static defaultProps = {
    };
}
