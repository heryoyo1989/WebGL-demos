import * as React from 'react';
import "./root.css";
import Navi from './Navi';
import ThreeCanvas from './ThreeCanvas';

interface RootState {
    x: number,
    name: string
}

export default class Root extends React.Component<any, RootState> {
    constructor(props: any) {
        super(props);
        this.state = { x: 0 , name: 'empty'}

        this.handleClickMove = this.handleClickMove.bind(this);
    }

    componentDidMount() {
        fetch('/api')
          .then(res => res.json())
          .then(users => {
            console.warn("Users", users)
            if(users.name) {
                this.setState({ name: users.name })
            }
          });
      }

    handleClickMove() {
        const { x } = this.state;

        this.setState({ x: x + 1 })
    }

    render() {
        return (
            <div className='Root'>
                <div>{this.state.name}</div>
                <ThreeCanvas x_pos={this.state.x}/>
            </div>
        )
    }
}