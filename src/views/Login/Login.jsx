import React, { Component } from 'react';
import './Login.scss'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import MaskedInput from 'react-text-mask';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputIcon from '@material-ui/icons/Input';
import AssignmentInd from '@material-ui/icons/AssignmentInd';

import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    }, margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    rightToLeftPosition:{
        left:'auto',
        right:0
    },
    DirLtr:{
        direction:'ltr'
    }
});
function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[ /[0]/, /[9]/, /\d/,/\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}

        />
    );
}
const bluetheme = createMuiTheme({
    palette: {
        primary: blue,
    },
});
const purpletheme = createMuiTheme({
    palette: {
        primary: purple,
    },
    overrides:{

        MuiCardHeader:{
            content:{
                background:purple
            },
            root:{
                background:purple
            }
        }
    }
});
const greenTheme = createMuiTheme({
    palette: {
        primary: green,
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    }
});
TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
class SignIn extends Component{
    static propTypes = {
        handelViewEvent: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            textmask: '',
        };
        this.handleView=this.handleView.bind(this);
    }
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleSubmit=event=>{
        console.log(event);
        event.preventDefault();
    };

    handleView=()=>{
      this.props.handelViewEvent('SignUp');
    };

    render(){
        const { classes } = this.props;
        return (
        <Grid container style={{padding:30}}>
            <Grid container item xs={12} justify="center" alignItems="center" spacing={16}>
                <MuiThemeProvider theme={bluetheme}>
                    <Card className="loginWrapper" expanded='true'>

                        <CardHeader color="blue" className="CardHeaderA text-center">
                            <Grid item container justify="center" xs={12} spacing={0}>
                                <Grid item xs={2}>

                                    <Tooltip title="عضویت" placement="left-start">
                                        <IconButton
                                            onClick={this.handleView}
                                        >
                                        <InputIcon  />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="rounded-circle center-block">
                                        <AssignmentInd style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>

                        </CardHeader>
                        <CardBody profile>
                            <form className="container-fluid" noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                                <Grid container alignItems="center" justify="center">
                                    <FormControl className={classNames( classes.textField,classes.formControl)} aria-describedby="name-helper-text">
                                        <InputLabel htmlFor="name-helper" className={classes.rightToLeftPosition}>نام کاربری</InputLabel>
                                        <Input id="name-helper"
                                               name="phone"
                                               className={classes.DirLtr}
                                               value={this.state.textmask}
                                               inputComponent={TextMaskCustom}
                                               onChange={this.handleChange('textmask')} />
                                        <FormHelperText id="name-helper-text" className='text-right'>شماره تلفن همراه  (*******09)</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid container alignItems="center" justify="center">
                                    <FormControl className={classNames( classes.textField)}>
                                        <InputLabel htmlFor="adornment-password" className={classes.rightToLeftPosition}>کلمه عبور</InputLabel>
                                        <Input
                                            id="adornment-password"
                                            name="password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <br/>
                                <Grid container alignItems="center" justify="center">

                                    <Button variant="contained" type="submit" color="primary">
                                        ورود
                                    </Button>

                                </Grid>
                                <br/>
                                <Grid container alignItems="center" justify="center">
                                    <Button className={classes.button} variant='outlined'>کلمه عبور خود را فراموش کرده ام!</Button>
                                    <br/>
                                    <br/>
                                    <p className='text-center mt-4'>
                                        چنانچه پس از ثبت نام کد تأیید برای شما پیامک شده آن را در صفحه تأیید کد وارد کنید.
                                    </p>
                                    <br/>
                                    <MuiThemeProvider theme={greenTheme}>
                                        <Button className={classes.button} variant='contained' color='primary'>تأیید کد</Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </form>
                        </CardBody>

                    </Card>
                </MuiThemeProvider>
            </Grid>
        </Grid>
        );
    }

}
class SignUp extends Component{
    static propTypes = {
        handelViewEvent: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            textmask: '',
        };
        this.handleView=this.handleView.bind(this);
    }
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleSubmit=event=>{
        console.log(event);
        event.preventDefault();
    };

    handleView=()=>{
        this.props.handelViewEvent('SignIn');
    };

    render(){
        const { classes } = this.props;
        return (
            <Grid container style={{padding:30}}>
                <Grid container item xs={12} justify="center" alignItems="center" spacing={16}>
                    <MuiThemeProvider theme={purpletheme}>
                        <Card className="RegisterWrapper" expanded='true'>

                            <CardHeader color="primary" className="CardHeaderA text-center">
                                <Grid item container justify="center" xs={12} spacing={0}>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <div className="rounded-circle center-block">
                                            <InputIcon style={{ fontSize: 50 }}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <Tooltip title="ورود" placement="right-start">
                                            <IconButton
                                                onClick={this.handleView}
                                            >
                                                <AssignmentInd  />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>

                            </CardHeader>
                            <CardBody profile>
                                <form className="container-fluid" noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                                    <Grid container alignItems="center" justify="center" >
                                        <Grid item xs={12} md={6}>
                                            <FormControl className={classNames( classes.textField,classes.formControl)} aria-describedby="name-helper-text">
                                                <InputLabel htmlFor="name-helper" className={classes.rightToLeftPosition}>نام کاربری</InputLabel>
                                                <Input id="FirstName"
                                                       name="FirstName"
                                                       value={this.state.textmask}
                                                       onChange={this.handleChange('FirstName')} />
                                                <FormHelperText id="name-helper-text" className='text-right'>شماره تلفن همراه  (*******09)</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl className={classNames( classes.textField,classes.formControl)} aria-describedby="name-helper-text">
                                                <InputLabel htmlFor="name-helper" className={classes.rightToLeftPosition}>نام کاربری</InputLabel>
                                                <Input id="name-helper"
                                                       name="phone"
                                                       className={classes.DirLtr}
                                                       value={this.state.textmask}
                                                       inputComponent={TextMaskCustom}
                                                       onChange={this.handleChange('textmask')} />
                                                <FormHelperText id="name-helper-text" className='text-right'>شماره تلفن همراه  (*******09)</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" justify="center">
                                        <FormControl className={classNames( classes.textField)}>
                                            <InputLabel htmlFor="adornment-password" className={classes.rightToLeftPosition}>کلمه عبور</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                name="password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <br/>
                                    <Grid container alignItems="center" justify="center">

                                        <Button variant="contained" type="submit" color="primary">
                                            عضویت
                                        </Button>

                                    </Grid>
                                    <br/>

                                </form>
                            </CardBody>

                        </Card>
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        );
    }

}
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            CurrentView:'SignIn'
        };
        this.handelViewFn = this.handelViewFn.bind(this);
    }
    componentDidMount() {
        document.body.classList.toggle('loginPage', this.props.isDark);

    }
    componentWillUnmount() {
        document.body.classList.remove('loginPage')
    }

    handelViewFn=view=>{
      this.setState({CurrentView:view})  ;
    };


    render() {
        const {

            ...rest
        } = this.props;

            if(this.state.CurrentView==='SignIn'){
                return(
                    <SignIn handelViewEvent={this.handelViewFn}  {...rest}/>
                    );

            }else if(this.state.CurrentView==='SignUp'){
                return(
                    <SignUp handelViewEvent={this.handelViewFn}  {...rest}/>
                    );

            }else{
                return(
                <p>other</p>
                );
            }

    }
}

export default withStyles(styles)(Login);