import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tile from '../component/tile';
import GenericInput from '../component/form/generic-input';

import { Switch, Route } from 'react-router-dom';

import Portal from '../portal';

export default class TileHandler extends PureComponent {
    constructor({ data, pattern }) {
        super();

        this.state = {
            data,
            pattern,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { onFilter } = this.props;

        const { target: { value: pattern } } = e;

        const data = onFilter(this.props, this.state, pattern);

        /** change of pattern alone, should trigger re-render */
        this.setState({ pattern, data });
    }

    render() {
        const { pattern, data, expanded } = this.state;

        const { className, 'data-cy': cy, location, label, placeholder, modals } = this.props;

        const isModal = location.state && location.state.isModal;

        return <Fragment>
            <section className={`tile-handler ${className}`}>
                <GenericInput
                    onChange={this.onChange}
                    placeholder={placeholder}
                    label={label}
                    value={pattern}
                    data-cy={`${cy}-pattern`}
                />
                <div className="tile-handler__container">
                    {
                        data.map((v, i) =>
                            <Tile
                                key={i}
                                data-cy={`${cy}-tile-${i}`}
                                to={{
                                    pathname: `/explore/${v.id}`,
                                    state: { isModal: true },
                                }}
                                {...v}
                            />
                        )
                    }
                    <Tile
                        data-cy={`${cy}-add`}
                        className="tile__add-control"
                        to={{
                            pathname: "new",
                            state: { isModal: true },
                        }}
                    />
                </div>
            </section>
            {
                isModal &&
                <Portal onClose={this.props.history.goBack} className="modal--fullscreen">
                    <Switch>
                        {
                            modals.map((props, i) => <Route key={i} {...this.props} {...props} />)
                        }
                    </Switch>
                </Portal>
            }
        </Fragment>;
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
