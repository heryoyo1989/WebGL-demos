import * as React from 'react';
import "./root.css";
import Navi from './Navi';
import ThreeCanvas from './ThreeCanvas';

interface RootState {
    x: number
}

export default class Root extends React.Component<any, RootState> {
    constructor(props: any) {
        super(props);
        this.state = { x: 0 }

        this.handleClickMove = this.handleClickMove.bind(this);
    }

    handleClickMove() {
        const { x } = this.state;

        this.setState({ x: x + 1 })
    }

    render() {
        return (
            <div className='Root'>
                <ThreeCanvas x_pos={this.state.x}/>
            </div>
        )
    }
}