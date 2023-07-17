import * as React from 'react';
import "./ThreeCanvas.css";
import * as THREE from 'three';
import NaviBar from './Navi';

export interface ThreeCanvasProps {
    x_pos: number
}

export default class ThreeCanvas extends React.Component<ThreeCanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    containerRef: React.RefObject<HTMLDivElement>;

    scene: THREE.Scene;
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;

    // cube: THREE.Mesh;

    constructor(props: ThreeCanvasProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.containerRef = React.createRef();

        this.clearCanvas = this.clearCanvas.bind(this);
        this.renderCanvas = this.renderCanvas.bind(this);
        this.handleAddCube = this.handleAddCube.bind(this);
        this.handleAddCircle = this.handleAddCircle.bind(this);
    }

    componentDidUpdate(
        prevProps: Readonly<ThreeCanvasProps>, 
        prevState: Readonly<{}>, 
        snapshot?: any
    ): void {
        console.warn("Props", this.props);
        console.warn("prev Props", prevProps);

        /*if(this.props.x_pos !== prevProps.x_pos) {
            this.cube.position.x = this.props.x_pos;
            this.renderer.render(this.scene, this.camera);
        }*/
    }

    componentDidMount(): void {
        if(this.canvasRef.current) {
            const { clientWidth, clientHeight } = this.canvasRef.current;

            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvasRef.current,
                antialias: true,
            });
            this.renderer.setSize(clientWidth, clientHeight)

            this.camera = new THREE.PerspectiveCamera( 
                75, 
                clientWidth / clientHeight, 
                0.1, 
                1000 
            );
            this.camera.position.z = 5;

            this.scene = new THREE.Scene();
           
            this.renderer.render(this.scene, this.camera);
        }
    }

    clearCanvas() {
        this.scene.clear();
        // this.renderer.render(this.scene, this.camera);
    }

    renderCanvas() {
        this.renderer.render(this.scene, this.camera);
    }

    handleAddCube() {
        this.clearCanvas();
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add(cube );
        this.renderCanvas();
    }

    handleAddCircle() {
        this.clearCanvas();
        const geometry = new THREE.CircleGeometry( 2, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
        const circle = new THREE.Mesh( geometry, material ); 
        this.scene.add( circle );
        this.renderCanvas();
    }

    render() {
        return (
            <div className='CanvasContainer' ref={this.containerRef}>
                <NaviBar onClickMove={() => {}}/>
                <div className='Canvas_Lower'>
                    <div className='Canvas_LeftBar'>
                        <div onClick={this.handleAddCube}>Cube</div>
                        <div onClick={this.handleAddCircle}>Circle</div>
                    </div>
                    <canvas className='Canvas' ref={this.canvasRef}/>
                </div>
            </div>
        )
    }
}