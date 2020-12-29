import React, { useState } from "react";
import "../../App.css";
import { Modal, makeStyles, Typography, Button, TextField, IconButton } from '@material-ui/core';
import { PRIMARY_COLOR, TRANSPARENT, WHITE_COLOR, PRIMARY_DARK_COLOR, GREY_COLOR } from "utils/constants/colorsConstants";
import { APP_BAR_HEIGHT, BOLD, CENTER, COLUMN, FLEX, FLEX_END, NONE, POSITION_ABSOLUTE, ROW } from "utils/constants/stringConstants";
import ClearIcon from '@material-ui/icons/Clear';
import profileIcon from '../../assets/userAvatar.png';
  
  function getModalStyle() {
    const top = APP_BAR_HEIGHT - 10;
    const left = APP_BAR_HEIGHT - 10;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const NewProjectModal = (props: any) => {

    const classes = useStyles();
    let imageInputRef: any = React.useRef();
    const [modalStyle] = React.useState(getModalStyle);
    const [selectedLogo, setLogo] = useState('');
    const [campaignName, setcampaignName] = useState('');
    const [campaignDate, setcampaignDate] = useState('');
    const [clientName, setclientName] = useState('');
    const [clientEmail, setclientEmail] = useState('');
    const [address, setaddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');


    const handleClose = () => {

    }

    const handleChange = (event: any) => {
        if(event.target && event.target.files && event.target.files.length > 0) {
            setLogo(URL.createObjectURL(event.target.files[0]));
        }
      }
    
    const handleInputChange = (event: any, label: string) => {
        switch (label) {
            case 'Campaign Name':
                setcampaignName(event.target.value)
                break;
            case 'Campaign Date':
                setcampaignDate(event.target.value)
                break;
            case 'Client Name':
                setclientName(event.target.value)
                break;
            case 'Client Email':
                setclientEmail(event.target.value)
                break;
            case 'Address':
                setaddress(event.target.value)
                break;
            case 'City':
                setCity(event.target.value)
                break;
            case 'State/Province':
                setState(event.target.value)
                break;
            case 'Country':
                setCountry(event.target.value)
                break;
            default:
                break;
        }
    }

    const renderClientLogoView = () => {
        return (
            <div className={classes.clientLogoContainer}>
                    <Button
                        variant="contained"
                        onClick={() => imageInputRef.click()}
                        className={classes.clientLogo}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            name="avatar"
                            ref={(input) => { imageInputRef = input; }}
                            onChange={handleChange}
                        />
                        <img src={(selectedLogo !== '') ? selectedLogo : profileIcon } className={classes.clientLogoImg}/>
                    </Button>
                    <Typography variant={'caption'} className={classes.addLogoText}>
                        Add Client Logo
                    </Typography>
            </div>
        )
    }

    const renderTopView = () => {
        return (
            <div className={classes.headerView}>
                <div style={{  }}>
                    <Typography variant={'h6'} className={classes.headerTitle}>
                        New Project
                    </Typography>
                    <Typography variant={'body2'}>
                        Get Started
                    </Typography>
                </div>
                {renderClientLogoView()}
            </div>
        );
    }

    const renderInputField = (_type: string, label: string, _value: string) => {
        return (
            <TextField
                id={_type}
                label={label}
                variant="outlined"
                size="small"
                type={_type}
                className={classes.textField}
                margin="normal"
                onChange={(e) => handleInputChange(e, label)}//{handleInputChange}
                value={_value}
                InputProps={{ classes: { root: classes.inputRoot} }}
                InputLabelProps={{
                classes: {
                    root: (_value === '') ? classes.labelRoot : classes.labelRootFilled,
                    focused: classes.labelFocused
                }
                }}
            />
        );
    }

    const renderMiddleView = () => {
        return (
            <div className={classes.middleView}>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Campaign Name', campaignName)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('date', 'Campaign Date', campaignDate)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Client Name', clientName)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Client Email', clientEmail)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Address', address)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'City', city)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('number', 'State/Province', state)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Country', country)}
                    </div>
                </div>
            </div>
        )
    }

    const renderBottomView = () => {
        return (
            <div className={classes.bottomView}>
                    <Typography variant={'caption'} className={classes.stepLabel}>
                        Step {'1'} of 5
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {}}
                        color="primary"
                        className={classes.button}
                    >
                        Continue
                    </Button>
            </div>
        );
    }

    const renderCloseButton = () => {
        return (
            <IconButton aria-label="delete" className={classes.closeButton}>
                <ClearIcon fontSize="large"/>
            </IconButton>
        );
    }

    return (
        <div className="background">
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <>
                        <div style={modalStyle} className={classes.paper}>
                            {renderTopView()}
                            {renderMiddleView()}
                            {renderBottomView()}
                            {renderCloseButton()}
                        </div>
                    </>
            </Modal>
        </div>
        );
    };

const useStyles = makeStyles((theme) => ({
    paper: {
        position: POSITION_ABSOLUTE,
        width: 650,
        height: 450,
        backgroundColor: WHITE_COLOR,
        boxShadow: theme.shadows[5],
        outline: NONE,
        borderRadius: 20,
        display: FLEX,
        padding: 20,
        flexDirection: COLUMN,
        paddingLeft: 30,
        paddingRight: 30
    },
    headerView: {
        flex: 0.4,
        marginTop: 20
    },
    headerTitle: {
        fontWeight: BOLD
    },
    clientLogoContainer: {
        display: FLEX,
        flex: 1,
        marginTop: -30,
        alignItems: CENTER,
        justifyContent: CENTER,
        flexDirection: COLUMN
    },
    clientLogo: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: TRANSPARENT,
        marginBottom: 5
    },
    clientLogoImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
        position: POSITION_ABSOLUTE
    },
    addLogoText: {
        fontSize: 10,
        color: GREY_COLOR
    },
    middleView: {
        flex: 0.5,
        display: FLEX,
        flexDirection: COLUMN
    },
    textFiledContainer: {
        display: FLEX,
        flex: 0.25,
        flexDirection: ROW,
    },
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 500,
        fontSize: 8,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: GREY_COLOR,
            borderRadius: 20,
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_COLOR
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_COLOR
          }
    },
    input: {
        color: PRIMARY_COLOR,
        fontSize: 8
    },
    inputRoot: {
        fontSize: 10,
        height: 25
      },
    labelRoot: {
        fontSize: 10,
        color: GREY_COLOR,
        "&$labelFocused": {
            color: PRIMARY_DARK_COLOR,
            marginTop: 2,
        },
        height: 25,
        marginTop: -5
    },
    labelRootFilled: {
        fontSize: 10,
        color: GREY_COLOR,
        "&$labelFocused": {
            color: PRIMARY_DARK_COLOR,
            marginTop: 2,
        },
        height: 25,
        marginTop: 0
    },
    labelFocused: {
    
    },
    bottomView: {
        flex: 0.1,
        display: FLEX,
        alignItems: CENTER,
        justifyContent: FLEX_END,
    },
    stepLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 30
    },
    button:{
        width: 70,
        height: 25,
        fontSize: 8,
        borderRadius: 15,
        background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
        textTransform: NONE
    },
    closeButton: {
        position: POSITION_ABSOLUTE,
        top: 10,
        right: 10
    },
    }));

export default NewProjectModal;

