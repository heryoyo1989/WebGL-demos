import * as React from "react";
import InterLogo from "./images/inter_milan.png";
import "./style.css";

export interface ForzaProps {
    language: string;
}

export default class ForzaInter extends React.Component<ForzaProps>{
    render() {
        const { language } = this.props;

        return (
            <div>
                <div className="hello">{ language === "Chinese" ? "加油，国米！！！！" : "Forza Inter!!!!" }</div>
                <img src={InterLogo}  width={523} height={523} />
            </div>
        )
    }
};