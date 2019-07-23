import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../components/tile_';

export default class TileHandler extends PureComponent {
    constructor({ data }) {
        super();

        this.state = {
            data,
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const id = e.target.getAttribute('data-id');
    }

    render() {
        const { data } = this.state;

        const { className, 'data-cy': cy } = this.props;

        return <section
            className={`tile-handler ${className}`}
            onClick={this.onClick}
        >
            {
                data.map((v, i) =>
                    <Tile
                        key={i}
                        data-id={v.id}
                        data-cy={`${cy}-tile-${i}`}
                        {...v}
                    />
                )
            }
        </section>;
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            })
        ).isRequired,
    }

    static defaultProps = {
        'data-cy': '',
        className: '',
    }
}