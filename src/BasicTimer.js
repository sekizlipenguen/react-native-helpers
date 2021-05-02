import PropTypes from 'prop-types';
import React, {useState} from 'react';

function BasicTimer(props) {
    const [counter, setCounter] = useState(props.duration);

    React.useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter < 1) {
            return props.complete(counter);
        }
        return () => clearInterval(timer);
    }, [counter, props.duration]);

    return props.children(counter);
}

BasicTimer.propTypes = {
    duration: PropTypes.number.isRequired,
    complete: PropTypes.func,
};

BasicTimer.defaultProps = {
    resizeMode: 'cover',
    complete: () => {

    },
    duration: 0,
};

export default BasicTimer;
