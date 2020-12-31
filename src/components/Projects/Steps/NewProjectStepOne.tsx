import React, { useState } from "react";
import {  Modal, makeStyles, Typography, Button, TextField, IconButton } from '@material-ui/core';
import { PRIMARY_COLOR, TRANSPARENT, WHITE_COLOR, PRIMARY_DARK_COLOR, GREY_COLOR } from "utils/constants/colorsConstants";
import { BOLD, CENTER, COLUMN, FLEX, FLEX_END, NONE, POSITION_ABSOLUTE, ROW } from "utils/constants/stringConstants";
import profileIcon from '../../../assets/userAvatar.png';
import { ProjectData, StepOne } from '../../../utils/types/index';

const NewProjectStepOne = (props: any) => {

    const classes = useStyles();
    const { projectData: {stepOne}, projectData, setProjectData } = props;
    let imageInputRef: any = React.useRef();

    const handleChange = (event: any) => {
        if(event.target && event.target.files && event.target.files.length > 0) {
            const newData = {...projectData, stepOne: {...stepOne, logo: URL.createObjectURL(event.target.files[0])}}//{...stepOne, logo: URL.createObjectURL(event.target.files[0])}
            setProjectData(newData);
        }
      }

    const onProjectDataChange = (stepOne: StepOne) => {
        const newData = {...projectData, stepOne: {...stepOne}}
        setProjectData(newData);
    }
    
    const handleInputChange = (event: any, label: string) => {
        let newStepOne: StepOne = stepOne;
        switch (label) {
            case 'Campaign Name':
                newStepOne = {...stepOne, campaignName: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Campaign Date':
                newStepOne = {...stepOne, campaignDate: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Client Name':
                newStepOne = {...stepOne, clientName: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Client Email':
                newStepOne = {...stepOne, clientEmail: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Address':
                newStepOne = {...stepOne, address: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'City':
                newStepOne = {...stepOne, city: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'State/Province':
                newStepOne = {...stepOne, state: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Country':
                newStepOne = {...stepOne, country: event.target.value}
                onProjectDataChange(newStepOne)
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
                        <img src={(stepOne.logo !== '') ? stepOne.logo : profileIcon } className={classes.clientLogoImg}/>
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
                        {renderInputField('', 'Campaign Name', stepOne.campaignName)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('date', 'Campaign Date', stepOne.campaignDate)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Client Name', stepOne.clientName)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Client Email', stepOne.clientEmail)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Address', stepOne.address)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'City', stepOne.city)}
                    </div>
                </div>
                <div className={classes.textFiledContainer}>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('number', 'State/Province', stepOne.state)}
                    </div>
                    <div style={{ flex: 0.5 }}>
                        {renderInputField('', 'Country', stepOne.country)}
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
                        onClick={() => props.setCurrentStep(2)}
                        color="primary"
                        className={classes.button}
                    >
                        Continue
                    </Button>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            {renderTopView()}
            {renderMiddleView()}
            {renderBottomView()}
        </div>
        );
    };

const useStyles = makeStyles((theme) => ({
    container: {
        display: FLEX,
        flex: 1,
        flexDirection: COLUMN,
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

export default NewProjectStepOne;

