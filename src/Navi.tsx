import * as React from 'react';
import "./navi.css"

interface NaviProps  {
    onClickMove: () => void;
}

const NaviBar = (props: NaviProps) => {

    return (
        <div className='Navi'>
            <button onClick={props.onClickMove}>Move</button>
        </div>
    )
}

export default NaviBar;

/* export default class Navi extends React.Component<NaviInterface> {
    constructor(props: NaviInterface) {
        super(props);
    }

    render() {
        return (
            <div className='Navi'>
                Navi Bar
            </div>
        )
    }
} */