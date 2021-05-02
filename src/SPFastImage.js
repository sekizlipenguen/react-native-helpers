import React from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import SPHelpers from './lib/SPHelpers';


const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

class SPFastImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            imageInfo: {},
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.source != prevProps.source && this.state.loaded == true) {
            this.setState({
                loaded: false,
                imageInfo: {},
            });
        }
    }

    render() {

        const {loaded, imageInfo} = this.state;

        const source = this.props.source;
        const props = this.props;
        const newWidth = props.width ? props.width : SPHelpers.screenWidth;

        let autoHeight = {}, borderRadius = {};
        if (props.width && imageInfo.width) {
            autoHeight = {height: imageInfo.height, width: imageInfo.width};
        } else if (props.style && props.style.width && props.style.height) {
            autoHeight = {height: props.style.height, width: props.style.width};
        } else if (props.style && props.style.aspectRatio) {
            autoHeight = {aspectRatio: props.style.aspectRatio};
        } else if (Array.isArray(props.style)) {
            props.style.map((v) => {
                if (v.width && v.height) {
                    autoHeight = {height: v.height, width: v.width};
                } else if (v.aspectRatio) {
                    autoHeight = {aspectRatio: v.aspectRatio};
                }
                if (v.borderRadius) {
                    borderRadius = {borderRadius: v.borderRadius};
                }
            });
        } else if (props.width) {
            autoHeight = {width: props.width};
        }

        if (props.style && props.style.borderRadius) {
            borderRadius = {borderRadius: props.style.borderRadius};
        }

        return (
            <View style={[styles.f1_1, autoHeight]}>
                {
                    loaded == false && (
                        <View style={[styles.f1, borderRadius, autoHeight]}>
                            <ActivityIndicator size={30}/>
                        </View>
                    )
                }
                <AnimatedFastImage
                    {...props}
                    onLoadStart={() => {
                        if (props.onLoadStart) {
                            return props.onLoadStart(e);
                        }
                    }}
                    onLoad={(event) => {
                        let height = event.nativeEvent.height;
                        let width = event.nativeEvent.width;
                        const e = SPHelpers.adjustSize(width, height, {width: newWidth});
                        this.setState({imageInfo: e, loaded: true}, () => {
                            if (props.onLoadComplete) {
                                return props.onLoadComplete(e);
                            }
                        });
                    }}
                    onError={(e) => {
                        if (props.onError) {
                            return props.onError(e);
                        }
                    }}
                    style={[props.style, autoHeight]}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    f1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    f1_1: {
        position: 'relative',
        minHeight: 50,
    },
});

SPFastImage.propTypes = {
    source: PropTypes.object.isRequired,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
    style: PropTypes.object,
    width: PropTypes.number,
};

SPFastImage.defaultProps = {
    resizeMode: 'cover',
    style: {},
};


export default SPFastImage;
