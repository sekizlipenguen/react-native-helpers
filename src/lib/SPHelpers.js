import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SPHelpers = {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    adjustSize: (sourceWidth, sourceHeight, localProps) => {
        const {width, height} = localProps;
        let ratio = 1;
        if (width && height) {
            ratio = Math.min(width / sourceWidth, height / sourceHeight);
        } else if (width) {
            ratio = width / sourceWidth;
        } else if (height) {
            ratio = height / sourceHeight;
        }
        const computedWidth = sourceWidth * ratio;
        const computedHeight = sourceHeight * ratio;
        return {
            width: computedWidth,
            height: computedHeight,
        };
    },
};
export default SPHelpers;
