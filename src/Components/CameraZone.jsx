import React, { Component, createRef, cloneElement, Children } from "react";
import { create } from 'zustand';

const CameraData = {
    Speed: 2.5
};

const directions = {
    w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0],
    ArrowUp: [0, -1], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowRight: [1, 0]
};

const useCameraStore = create((set) => ({
    position: [0, 0],
    setPosition: (position) => set({ position: position || [0, 0] }),
}));

const offsetStore = create((set) => ({
    offset: [0, 0],
    setOffset: (offset) => set({ offset: offset || [0, 0] }),
}));

class CameraZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: useCameraStore.getState().position,
            viewportSize: [0, 0],
            pressedKeys: {}
        };
        this.containerRef = createRef();
        this.handleResize = this.handleResize.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        this.updateViewportSize();
        this.interval = setInterval(this.updatePosition.bind(this), 1);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        clearInterval(this.interval);
    }

    handleResize() {
        this.updateViewportSize();
    }

    updateViewportSize() {
        if (this.containerRef.current) {
            const { clientWidth, clientHeight } = this.containerRef.current;
            const newOffset = [clientWidth / 2, clientHeight / 2];
            this.setState({ viewportSize: newOffset });
            offsetStore.setState({ offset: newOffset });
        }
    }

    handleKeyDown(event) {
        if (directions[event.key] && !this.state.pressedKeys[event.key]) {
            this.setState(prevState => ({
                pressedKeys: { ...prevState.pressedKeys, [event.key]: true }
            }));
        }
    }

    handleKeyUp(event) {
        if (directions[event.key]) {
            this.setState(prevState => ({
                pressedKeys: { ...prevState.pressedKeys, [event.key]: false }
            }));
        }
    }

    updatePosition() {
        let deltaX = 0;
        let deltaY = 0;

        Object.keys(this.state.pressedKeys).forEach(key => {
            if (this.state.pressedKeys[key]) {
                const direction = directions[key];
                deltaX += direction[0] * CameraData.Speed;
                deltaY += direction[1] * CameraData.Speed;
            }
        });

        if (deltaX !== 0 || deltaY !== 0) {
            const newPosition = [this.state.position[0] + deltaX, this.state.position[1] + deltaY];
            this.setState({ position: newPosition });
            useCameraStore.setState({ position: newPosition });
        }
    }

    render() {
        const { children } = this.props;
        const styles = this.props.positionStyles || { color: 'white', zIndex: 100, position: 'absolute', top: 0, left: 0, margin: "20px" };
        const { position, viewportSize } = this.state;

        const transformStyle = {
            transform: `translate(${viewportSize[0] - position[0]}px, ${viewportSize[1] - position[1]}px)`
        };

        return (
            <div id="camera-zone" ref={this.containerRef} style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
                <p id="posText" style={this.props.hideCoordinates ? {...styles, display: 'none'} : {...styles, display: 'block'}}>{`${Math.floor(position[0] / 15)}, ${-Math.floor(position[1] / 15)}`}</p>
                <div style={{ ...transformStyle, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {Children.map(children, child => {
                        const childPos = child.props.pos;
                        const childStyle = {
                            position: 'absolute',
                            left: `${childPos[0]}px`,
                            top: `${childPos[1]}px`,
                            zIndex: "inherit"
                        };
                        return cloneElement(child, { style: { ...child.props.style, ...childStyle } });
                    })}
                </div>
            </div>
        );
    }
}

const useCamPos = () => useCameraStore(state => state.position);
const useOffset = () => offsetStore(state => state.offset);

export { CameraZone, useCamPos, useOffset };