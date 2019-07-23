import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';

export default class ButtonHandler extends PureComponent {
    constructor() {
        super();
        this.state = {
            data : [
                {
                   name: 'ADD', 
                },
                {
                    name: 'FILTER',
                }
            ]
        }
    }

    render() {
        const { data } = this.state;
        return <section 
            className='button-handler'
        >
        {
            data.map((v, index) => 
                <Button 
                    data-cy={`tile-${index}`} 
                    key={index} 
                    {...v} 
                />)
        }</section>; 
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.oneOfType([PropTypes.string]).isRequired
            })
        ).isRequired,
    }

    static defaultProps = {
        'data-cy': '',
    }
}