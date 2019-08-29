import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = ({ 'data-cy': cy, className, providers }) =>
    <section className={`landing-page ${className}`}>
        <ul className="sign-up_options">
            {
                providers.map(({ label, provider, href }, i) =>
                    <li key={i}
                        data-cy={`${cy}sign-up-with--${provider}`}
                        className={`sign-up-with sign-up-with--${provider}`}
                    >
                        <a href={href}>{label}</a>
                    </li>
                )
            }
        </ul>
    </section>;

LandingPage.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    providers: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            provider: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        }),
    ),
}
LandingPage.defaultProps = {
    'data-cy': '',
    className: '',
}

export default LandingPage;
