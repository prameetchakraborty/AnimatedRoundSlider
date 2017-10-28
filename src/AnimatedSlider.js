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

function calculateArcCircle(index0, segments, radius, startAngle0 = 0, angleLength0 = 2 * Math.PI) {
    // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
    const startAngle = startAngle0 % (2 * Math.PI);
    const angleLength = angleLength0 % (2 * Math.PI);
    const index = index0 + 1;
    const fromAngle = angleLength / segments * (index - 1) + startAngle;
    const toAngle = angleLength / segments * index + startAngle;
    const fromX = radius * Math.sin(fromAngle);
    const fromY = -radius * Math.cos(fromAngle);
    const realToX = radius * Math.sin(toAngle);
    const realToY = -radius * Math.cos(toAngle);

    // add 0.005 to start drawing a little bit earlier so segments stick together
    const toX = radius * Math.sin(toAngle + 0.005);
    const toY = -radius * Math.cos(toAngle + 0.005);

    return {
        fromX,
        fromY,
        toX,
        toY,
        realToX,
        realToY,
    };
}

function getGradientId(index) {
    return `gradient${index}`;
}

export default class AnimatedSlider extends PureComponent {

}