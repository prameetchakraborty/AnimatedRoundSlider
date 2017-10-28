import React, { PureComponent, PropTypes } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Circle, G, LinearGradient, Path, Defs, Stop } from 'react-native-svg';
import range from 'lodash.range';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';
import ClockFace from './ClockFace';


function calculateArcColor(index0, segments, gradientColorFrom, gradientColorTo) {
    const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo);

    return {
        fromColor: interpolate(index0 / segments),
        toColor: interpolate((index0 + 1) / segments),
    }
}