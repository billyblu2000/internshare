import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Lottie from 'lottie-react-web'

export default class AnimatedIcon extends Component {

    state = { active: this.props.initActive }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.changeActiveTo !== undefined) {
            if (nextProps.changeActiveTo !== prevState.active) {
                return { active: nextProps.changeActiveTo };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    render() {
        return (<>
            {
                this.props.tooltip ? <Tooltip title={this.props.tooltip} color='#57068C' mouseEnterDelay={1.5}>
                    <div style={{ width: this.props.width, height: this.props.height, cursor: this.props.toggleable?'pointer':null, display:this.props.inline?'inline-block':'block' }}
                        onClick={() => {
                            if (this.props.onClick) {
                                this.props.onClick();
                            }
                            if (this.props.toggleable){
                                this.setState({ active: !this.state.active });
                            }
                            
                        }}
                    >
                        {this.state.active ?
                            <Lottie
                                speed={this.props.speed?this.props.speed:2}
                                options={{
                                    animationData: this.props.activeData,
                                    loop: false,

                                }}
                            /> :
                            <Lottie
                                speed={this.props.speed?this.props.speed:2}
                                options={{
                                    animationData: this.props.inactiveData,
                                    loop: false,

                                }}
                            />
                        }
                    </div>
                </Tooltip> :
                    <div style={{ width: this.props.width, height: this.props.height, cursor: this.props.toggleable?'pointer':null,display:this.props.inline?'inline-block':'block' }}
                        onClick={() => {
                            if (this.props.onClick) {
                                this.props.onClick();
                            }
                            if (this.props.toggleable){
                                this.setState({ active: !this.state.active });
                            }
                        }}
                    >
                        {this.state.active ?
                            <Lottie
                                speed={this.props.speed?this.props.speed:2}
                                options={{
                                    animationData: this.props.activeData,
                                    loop: false,

                                }}
                            /> :
                            <Lottie
                                speed={this.props.speed?this.props.speed:2}
                                options={{
                                    animationData: this.props.inactiveData,
                                    loop: false,

                                }}
                            />
                        }
                    </div>
            }
        </>)
    }
}