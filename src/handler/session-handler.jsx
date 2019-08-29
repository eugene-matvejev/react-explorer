import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SessionHandler extends PureComponent {
    constructor() {
        super();

        this.onLogoutAll = this.onLogoutAll.bind(this);
        this.onLogoutOne = this.onLogoutOne.bind(this);
    }

    onLogoutAll(e) {
        this.props.onLogoutAll();
    }

    onLogoutOne(e) {
        this.props.onLogoutOne();
    }

    render() {
        const { data } = this.props;

        return <section className="session_handler">
            <h1>active sessions</h1>
            <div>
                {
                    data.map(({ device = 'DEVICE', location = 'LOCATION', hash, provider: { name: provider = 'PROVIDER' }, timestamp = 'TIMESTAMP' }, i) =>
                        <div className="session">
                            <div className="session_info">
                                <div className="session_hash" data-cy={`session-${i}-hash`}>UUID: {hash}</div>
                                <div className="session_row">
                                    <span className="session_device" data-cy={`session-${i}-device`}>{device}</span> | <span className="session_location" data-cy={`session-${i}-location`}>{location}</span>
                                </div>
                                <div className="session_row">
                                    <span className="session_provider" data-cy={`session-${i}-provider`}>{provider}</span> | <span className="session_timestamp" data-cy={`session-${i}-timestamp`}>{timestamp}</span>
                                </div>
                            </div>
                            <button data-id={i} onClick={this.onLogoutOne}>logout</button>
                        </div>
                    )
                }
            </div>
            <button className="session_logout-button" onClick={this.onLogoutAll}>log out from everywhere</button>
        </section>;
    }

    static propTypes = {

    }

    static defaultProps = {

    }
}
