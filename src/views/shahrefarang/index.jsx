import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ColorPicker from 'material-ui-color-picker'

let intervalRotate={};

class VRScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                x:0,
                y:0,
                z:-5
            },
            scale:{
                x:50,
                y:50,
                z:1
            },
            rotation:{
                x:0,
                y:0,
                z:0
            },
            size:{
              w:.09,
              h:.06,
              card:'9*6'
            },
            material:{
                name:'',
                url:''

            },
            color:'#000',
            textures:[{name:'مخمل',url:'clean-gray-paper.png'},{name:'کتان',url:'body-bg3.png'}],
            numbers:[],
            cards:['9*6','8.4*4.5','6*6'],
            Turning:false
        };
        this.RotateCard = this.RotateCard.bind(this);

    }
    SetNumbers=()=>{
        let numbers=[];
        for(let i=-10;i<=10;i++){
            numbers.push(i);
        }
        this.setState({numbers});
    };
    SetTexture=(name='مخمل')=>{
        const m=this.state.textures.filter(itm=>{return itm.name===name})[0];
        const material={...this.state.material}
        material['url']=require(`../../assets/img/textures/${m.url}`)
        material['name']=m.name
        this.setState({['material']:material})
    };
    SetMaterial=(e)=>{
        this.SetTexture(e.target.value);
    }
    SetCard=(e)=>{
        const size={...this.state['size']};
        let sizeCard=e.target.value;
        let sizeArray=sizeCard.split('*');
        size['card']=sizeCard;
        size['w']=sizeArray[0]/100;
        size['h']=sizeArray[1]/100;

        this.setState({ ['size']: size });
    }
    componentDidMount() {
        this.SetTexture();
        this.SetNumbers('مخمل')
    }
    SetColor=(color)=>{
        this.setState({color});
    }
    StopRotate=()=>{
        clearInterval(intervalRotate);
        this.RotateCard(0);
        this.setState({Turning:false});
    }
    StarRotate=()=>{
        let y=0;
        let self=this;
        this.setState({Turning:true});
        intervalRotate=setInterval(function () {
            if(self.state['rotation'] != undefined){
                self.RotateCard(y);
                if(y>360){
                    self.StopRotate()
                }
                y+=1;
            }
        },17)

    }
    RotateCard=(y)=>{
        const rotation0={...this.state['rotation']}
        rotation0.y=y;
        this.setState({['rotation']:rotation0})
    }
    handleChange = name => event => {
        if(name.indexOf('.')!==-1){
            let parent=name.split('.')[0];
            let child=name.split('.')[1];

            const category = {...this.state[parent]};
            category[child] = event.target.value;
            this.setState({ [parent]: category });
        }else{
            this.setState({ [name]: event.target.value });
        }
    };
    renderSelectOptions = () => {
        return this.state.textures.map((dt, i) => (
            <MenuItem key={'id_'+i} value={dt.name} >{dt.name}</MenuItem>
        ));
    };
    render () {

        let Turning;

            Turning=!this.state.Turning? <Button variant="contained" color="primary" onClick={this.StarRotate}>
                چرخش کارت
            </Button>:

            <Button variant="contained" color="secondary" onClick={this.StopRotate}>
                روی کارت
            </Button>

        return (
            <Grid container alignItems="center" spacing={16}>
                <Grid item xs={12} md={3} >
                    <h2 className="text-center">مشخصات کارت</h2>
                    <hr/>
                    <Grid container alignItems="center" spacing={16}>
                        <Grid item xs={12} md={5} >
                            <FormControl className="form-control">
                                <InputLabel htmlFor="CardSize">سایز کارت</InputLabel>
                                <Select

                                    value={this.state.size.card}
                                    onChange={this.SetCard}
                                    inputProps={{
                                        name: 'CardSize',
                                        id: 'CardSize',
                                    }}
                                >
                                    {this.state.cards.map(itm=>(
                                        <option key={itm} value={itm}>{itm}</option>
                                    ))}

                                </Select>
                            </FormControl>
                           <br/>
                           <br/>
                            <FormControl className="form-control">
                                <InputLabel htmlFor="CardMaterial">جنس کارت</InputLabel>
                                <Select
                                    value={this.state.material.name}
                                    onChange={this.SetMaterial}
                                    inputProps={{
                                        name: 'materialName',
                                        id: 'CardMaterial',
                                    }}
                                >

                                    {
                                        this.renderSelectOptions()
                                    }

                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            <ColorPicker
                                name='color'
                                defaultValue='#000'
                                onChange={(c)=>this.SetColor(c)}
                            />
                        </Grid>
                        <Grid item xs={12} md={7} >

                            <img src={this.state.material.url} width={this.state.size.w*1000} height={this.state.size.h*1000}/>
                        </Grid>
                    </Grid>
                    <hr/>
                    {Turning}

                   {/* <h2 className="text-center">rotation</h2>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="X-rotation">X</InputLabel>
                        <Select
                            native
                            value={this.state.rotation.x}
                            onChange={this.handleChange('rotation.x')}
                            inputProps={{
                                name: 'XRotation',
                                id: 'X-rotation',
                            }}
                        >
                            <option value="" />
                            {this.state.numbers.map(itm=>(
                                <option value={itm}>{itm}</option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="Y-rotation">Y</InputLabel>
                        <Select
                            native
                            value={this.state.rotation.y}
                            onChange={this.handleChange('rotation.y')}
                            inputProps={{
                                name: 'YRotation',
                                id: 'Y-Pos',
                            }}
                        >
                            <option value="" />
                            {this.state.numbers.map(itm=>(
                                <option value={itm}>{itm}</option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="Z-rotation">Z</InputLabel>
                        <Select
                            native
                            value={this.state.rotation.z}
                            onChange={this.handleChange('rotation.z')}
                            inputProps={{
                                name: 'ZRotation',
                                id: 'Z-rotation',
                            }}
                        >
                            <option value="" />
                            {this.state.numbers.map(itm=>(
                                <option value={itm}>{itm}</option>
                            ))}

                        </Select>
                    </FormControl>*/}
              {/*      <h2 className="text-center">Positions</h2>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="X-Pos">X</InputLabel>
                        <Select
                            native
                            value={this.state.position.x}
                            onChange={this.handleChange('position.x')}
                            inputProps={{
                                name: 'XPos',
                                id: 'X-Pos',
                            }}
                        >
                            <option value="" />
                            {this.state.numbers.map(itm=>(
                                <option value={itm}>{itm}</option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl className="form-control">
                            <InputLabel htmlFor="Y-Pos">Y</InputLabel>
                            <Select
                                native
                                value={this.state.position.y}
                                onChange={this.handleChange('position.y')}
                                inputProps={{
                                    name: 'YPos',
                                    id: 'Y-Pos',
                                }}
                            >
                                <option value="" />
                                {this.state.numbers.map(itm=>(
                                    <option value={itm}>{itm}</option>
                                ))}

                            </Select>
                        </FormControl>
                    <FormControl className="form-control">
                            <InputLabel htmlFor="Z-Pos">Z</InputLabel>
                            <Select
                                native
                                value={this.state.position.z}
                                onChange={this.handleChange('position.z')}
                                inputProps={{
                                    name: 'ZPos',
                                    id: 'Z-Pos',
                                }}
                            >
                                <option value="" />
                                {this.state.numbers.map(itm=>(
                                    <option value={itm}>{itm}</option>
                                ))}

                            </Select>
                        </FormControl>

                    <hr/>
                    <h2 className="text-center">Scale</h2>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="X-Scale">X</InputLabel>
                        <Select
                            native
                            value={this.state.scale.x}
                            onChange={this.handleChange('scale.x')}
                            inputProps={{
                                name: 'XScale',
                                id: 'X-Scale',
                            }}
                        >
                            <option value="" />
                            {this.state.numbers.map(itm=>(
                                <option value={itm}>{itm}</option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl className="form-control">
                            <InputLabel htmlFor="Y-Scale">Y</InputLabel>
                            <Select
                                native
                                value={this.state.scale.y}
                                onChange={this.handleChange('scale.y')}
                                inputProps={{
                                    name: 'YScale',
                                    id: 'Y-Scale',
                                }}
                            >
                                <option value="" />
                                {this.state.numbers.map(itm=>(
                                    <option value={itm}>{itm}</option>
                                ))}

                            </Select>
                        </FormControl>
                    <FormControl className="form-control">
                            <InputLabel htmlFor="Z-Scale">Z</InputLabel>
                            <Select
                                native
                                value={this.state.scale.z}
                                onChange={this.handleChange('scale.z')}
                                inputProps={{
                                    name: 'ZScale',
                                    id: 'Z-Scale',
                                }}
                            >
                                <option value="" />
                                {this.state.numbers.map(itm=>(
                                    <option value={itm}>{itm}</option>
                                ))}

                            </Select>
                        </FormControl>

                    <hr/>*/}
                </Grid>
                <Grid item xs={12} md={9} style={{height:600}}>

                    <Scene embedded>
                        {/*<Entity source={{obj: asset('3d/simpleCard.obj'), mtl: asset('3d/simpleCard.mtl')}} position={{x: 0, y: 0, z: -5}}/>*/}
                        {/*<Entity camera={{active: true}} look-controls wasd-controls position="0 0 0" data-aframe-default-camera/>*/}
                        <Entity multicolored-cube geometry={{primitive: 'box',width:this.state.size.w,height:this.state.size.h,depth:.1}} material={{color: this.state.color,src:`url(${this.state.material.url})`,buffer:false}} position={{x: this.state.position.x, y: this.state.position.y, z: this.state.position.z}} scale={{x: this.state.scale.x, y: this.state.scale.y, z: this.state.scale.z}} rotation={{x: this.state.rotation.x, y: this.state.rotation.y, z: this.state.rotation.z}}/>
                        <Entity particle-system={{preset: 'snow'}}/>
                        <Entity light={{type: 'point'}}/>
                        <Entity text={{value: 'Hello, WebVR!'}} material={{color: 'red'}}/>
                    </Scene>
                </Grid>
            </Grid>
        );
    }
}
export default VRScene;