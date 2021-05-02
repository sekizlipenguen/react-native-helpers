import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

function SPImageBackground(props) {
    const {children, style = {}, imageStyle} = props;
    return (
        <View style={style}>
            <AnimatedFastImage
                source={props.source}
                resizeMode={props.resizeMode}
                style={[
                    StyleSheet.absoluteFill,
                    {
                        width: style.width,
                        height: style.height,
                    },
                    imageStyle,
                ]}
            />
            {children}
        </View>
    );
}

SPImageBackground.propTypes = {
    source: PropTypes.object.isRequired,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
    imageStyle: PropTypes.object,
    style: PropTypes.object,
};

SPImageBackground.defaultProps = {
    resizeMode: 'cover',
};

export default SPImageBackground;
