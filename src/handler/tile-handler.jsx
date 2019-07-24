import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tile from '../component/tile';
import composeInput from '../component/form/compose-input';

const ComposedInput = composeInput((props) => <input {...props} />);

export default class TileHandler extends PureComponent {
    constructor({ data, pattern }) {
        super();

        this.state = {
            data,
            pattern,
        };
    }

    onChange(e) {
        const { onFilter } = this.props;

        const { target: { value: pattern } } = e;

        const data = onFilter(this.props, this.state, pattern);

        /** change of pattern alone, should trigger re-render */
        this.setState({ pattern, data });
    }

    render() {
        const { pattern, data } = this.state;

        const { className, 'data-cy': cy } = this.props;

        return <section className={`tile-handler ${className}`}>
            <ComposedInput
                onChange={this.onChange}
                placeholder="type pattern to search..."
                // className="tile-handler_pattern"
                label="filter"
                value={pattern}
                data-cy={`${cy}-pattern`}
            />
            <div className="tile-handler__container">
                {
                    data.map((v, i) =>
                        <Tile
                            key={i}
                            data-cy={`${cy}-tile-${i}`}
                            to={`/explore/${v.id}`}
                            target="_blank"
                            {...v}
                        />
                    )
                }
                <Tile
                    data-cy={`${cy}-add`}
                    className="tile__add-control"
                    to="/new"
                    target="_blank"
                />
            </div>
        </section>;
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        onFilter: PropTypes.func,
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
