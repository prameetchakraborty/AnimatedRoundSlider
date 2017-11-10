import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, PanResponder, View, Animated, Image } from 'react-native';
import Svg, { Circle, G, LinearGradient, Path, Defs, Stop } from 'react-native-svg';
import range from 'lodash.range';
import * as Animatable from 'react-native-animatable';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';
import Geekyants from '../images/geekyants.png';
import extractBrush from 'react-native-svg/lib/extract/extractBrush';

function calculateArcColor(index0, segments, gradientColorFrom, gradientColorTo) {
    const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo);

    return {
        fromColor: interpolate(index0 / segments),
        toColor: interpolate((index0 + 1) / segments),
    }
}

function calculateArcCircle(index0, segments, radius, startAngle0 = 0, angleLength0 = 2 * Math.PI) {
    const startAngle = startAngle0 % (2 * Math.PI);
    const angleLength = angleLength0 % (2 * Math.PI);
    const index = index0 + 1;
    const fromAngle = angleLength / segments * (index - 1) + startAngle;
    const toAngle = angleLength / segments * index + startAngle;
    const fromX = radius * Math.sin(fromAngle);
    const fromY = -radius * Math.cos(fromAngle);
    const realToX = radius * Math.sin(toAngle);
    const realToY = -radius * Math.cos(toAngle);
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
    
    state = {
        circleCenterX: false,
        circleCenterY: false,
    }
    
    static propTypes = {
        fill: PropTypes.string,
        path: PropTypes.string.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.lastFill = this.props.fill;
        this.state = {
            fillValue: new Animated.Value(0),
        };
        this.state.fillValue.addListener(() => {
            const { fill } = this.props;
            const { fillValue } = this.state;
            const color = fillValue.interpolate({
                inputRange: [0, 1.4, 3.1, 4.8, 6],
                outputRange: ['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,255)'],
            });
            this.path.setNativeProps({
                fill: extractBrush(color.__getAnimatedValue()),
            });
        });
    }

    animate = () => {
        const { fillValue } = this.state;
        const { angleLength } = this.props;
        Animated.spring(fillValue, {
            toValue: angleLength,
          }).start();
    };

    componentWillMount() {
        this._sleepPanResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
            onPanResponderMove: (evt, { moveX, moveY }) => {
                const { circleCenterX, circleCenterY } = this.state;
                const { angleLength, startAngle, onUpdate } = this.props;

                const currentAngleStop = (startAngle + angleLength) % (2 * Math.PI);
                let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2;

                if (newAngle < 0) {
                    newAngle += 2 * Math.PI;
                }

                let newAngleLength = currentAngleStop - newAngle;

                if (newAngleLength < 0) {
                    newAngleLength += 2 * Math.PI;
                }

                onUpdate({ startAngle: newAngle, angleLength: newAngleLength % (2 * Math.PI) });
        },
        });

        this._wakePanResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
            onPanResponderMove: (evt, { moveX, moveY }) => {
                const { circleCenterX, circleCenterY } = this.state;
                const { angleLength, startAngle, onUpdate } = this.props;

                let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2;
                let newAngleLength = (newAngle - startAngle) % (2 * Math.PI);

                if (newAngleLength < 0) {
                    newAngleLength += 2 * Math.PI;
                }

                onUpdate({ startAngle, angleLength: newAngleLength });
            },
        });
    }

    componentDidUpdate() {
        this.animate();
    }

    setNativeProps = (props) => {
        this._component && this._component.setNativeProps(props);
    }

    onLayout = () => {
        this.setCircleCenter();
    }

    setCircleCenter = () => {
        this._circle.measure((x, y, w, h, px, py) => {
            const halfOfContainer = this.getContainerWidth() / 2;
            this.setState({ circleCenterX: px + halfOfContainer, circleCenterY: py + halfOfContainer });
        });
    }

    getContainerWidth() {
        const { strokeWidth, radius } = this.props;
        return strokeWidth + radius * 2 + 2;
    }

    render() {
        const { startAngle, angleLength, segments, strokeWidth, radius, gradientColorFrom, gradientColorTo, bgCircleColor,
            showClockFace, clockFaceColor, startIcon, stopIcon } = this.props;
        const containerWidth = this.getContainerWidth();
        const start = calculateArcCircle(0, segments, radius, startAngle, angleLength);
        const stop = calculateArcCircle(segments - 1, segments, radius, startAngle, angleLength);
        return (
            <View style={{ width: containerWidth, height: containerWidth }} onLayout={this.onLayout}>
            <Svg
                    height={containerWidth}
                    width={containerWidth}
                    ref={circle => this._circle = circle}
                >
                    <Defs>
                        {
                            range(segments).map(i => {
                                const { fromX, fromY, toX, toY } = calculateArcCircle(i, segments, radius, startAngle, angleLength);
                                const { fromColor, toColor } = calculateArcColor(i, segments, gradientColorFrom, gradientColorTo)
                                return (
                                    <LinearGradient key={i} id={getGradientId(i)} x1={fromX.toFixed(2)} y1={fromY.toFixed(2)} x2={toX.toFixed(2)} y2={toY.toFixed(2)}>
                                        <Stop offset="0%" stopColor={fromColor} />
                                        <Stop offset="1" stopColor={toColor} />
                                    </LinearGradient>
                                )
                            })
                        }
                    </Defs>
                    <G transform={{ translate: `${strokeWidth / 2 + radius + 1}, ${strokeWidth / 2 + radius + 1}` }}>
                        <Circle
                            r={radius}
                            strokeWidth={strokeWidth}
                            ref={ref => (this.path = ref)}
                            fill={this.state.lastFill}
                            stroke={bgCircleColor}
                        />
                       {
                            range(segments).map(i => {
                                const { fromX, fromY, toX, toY } = calculateArcCircle(i, segments, radius, startAngle, angleLength);
                                const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(2)} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`;
                                return (
                                    <Path
                                        d={d}
                                        key={i}
                                        strokeWidth={strokeWidth}
                                        stroke={`url(#${getGradientId(i)})`}
                                        fill="transparent"
                                    />
                                )
                            })
                        }
                       
                        <G
                            fill={gradientColorTo}
                            transform={{ translate: `${stop.toX}, ${stop.toY}` }}
                            onPressIn={() => this.setState({ angleLength: angleLength + Math.PI / 2 })}
                            {...this._wakePanResponder.panHandlers}
                        >
                            <Circle
                                r={(strokeWidth - 1) / 2}
                                fill={bgCircleColor}
                                stroke={gradientColorTo}
                                strokeWidth="1"
                            />
                            {
                                stopIcon
                            }
                        </G>

                        <G
                            fill={gradientColorFrom}
                            transform={{ translate: `${start.fromX}, ${start.fromY}` }}
                            onPressIn={() => this.setState({ startAngle: startAngle - Math.PI / 2, angleLength: angleLength + Math.PI / 2 })}
                            {...this._sleepPanResponder.panHandlers}
                        >
                            <Circle
                                r={(strokeWidth - 1) / 2}
                                fill={bgCircleColor}
                                stroke={gradientColorFrom}
                                strokeWidth="1"
                            />
                            {
                                startIcon
                            }
                        </G>
                    </G>
                </Svg>
            </View>
        );
}
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
    },
    image: {
        width: 500,
        height: 500,
    }
});