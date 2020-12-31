import React, { useState } from "react";
import { makeStyles, Typography, Button, TextField, IconButton } from '@material-ui/core';
import { PRIMARY_COLOR, TRANSPARENT, PRIMARY_DARK_COLOR, GREY_COLOR } from "utils/constants/colorsConstants";
import { BOLD, CENTER, COLUMN, FLEX, FLEX_END, NONE, POSITION_ABSOLUTE, ROW } from "utils/constants/stringConstants";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import { StepTwo, StretegyTask } from '../../../utils/types/index';

const NewProjectStepTwo = (props: any) => {

    const classes = useStyles();
    const { projectData: {stepTwo}, projectData, setProjectData } = props;
    const [tasksData, setTasks] = useState([1]);

    const onProjectDataChange = (stepTwo: StepTwo) => {
        const newData = {...projectData, stepTwo: {...stepTwo}}
        setProjectData(newData);
    }
    
    const handleInputChange = (event: any, label: string) => {
        let newStepOne: StepTwo = stepTwo;
        switch (label) {
            case 'Campaign Objective':
                newStepOne = {...stepTwo, campaignObjective: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'Campaign DadeLine':
                newStepOne = {...stepTwo, campaignDeadLine: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            case 'description':
                newStepOne = {...stepTwo, description: event.target.value}
                onProjectDataChange(newStepOne)
                break;
            default:
                break;
        }
    }

    const addMoreClicked = () => {
        let newData: Array<number> = [...tasksData];
        newData.push(1);
        setTasks(newData);
    }

    const renderTopView = () => {
        return (
            <div className={classes.headerView}>
                <div style={{  }}>
                    <Typography variant={'h6'} className={classes.headerTitle}>
                        Plan The Strategy.
                    </Typography>
                    <Typography variant={'body2'}>
                        Work scope.
                    </Typography>
                </div>
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
                onChange={(e) => handleInputChange(e, label)}
                value={_value}
                InputProps={{ classes: { root: classes.inputRoot} }}
                InputLabelProps={(_type === 'date') ? {
                    shrink: true,
                    classes: {
                        root: (_value === '') ? classes.dateRoot : classes.dateRootFilled,
                        focused: classes.labelFocused
                    }
                    } : {
                        classes: {
                            root: (_value === '') ? classes.labelRoot : classes.labelRootFilled,
                            focused: classes.labelFocused
                        }
                }}
            />
        );
    }

    const renderTasksView = (data: StretegyTask, index: number) => {
        return (
            <div className={classes.tasksContainer}>
            <div style={{ flex: 0.4 }}>
                {renderInputField('', 'Task One   ie; preplan', data.task)}
            </div>
            <div style={{ flex: 0.2 }}>
                {renderInputField('date', 'Campaign DadeLine', data.startDay)}
            </div>
            <div style={{ flex: 0.2 }}>
                {renderInputField('date', 'Campaign DadeLine', data.deadLine)}
            </div>
            <div style={{ flex: 0.2 }}/>
        </div>
        );
    }

    const renderAddMoreView = () => {
        return (
            <div className={classes.addMore}>
                <Typography variant={'caption'} className={classes.addMoreLabel}>
                    Add More
                </Typography>
                <IconButton aria-label="back" className={classes.backButton} onClick={() => addMoreClicked()}>
                    <AddIcon className={classes.addMoreButton}/>
                </IconButton>
            </div>
        );
    }

    const renderProjectDescriptionView = () => {
        return (
            <TextField
                id={'description'}
                label={'Project Description'}
                variant="outlined"
                size="small"
                type={'text'}
                className={classes.textFieldDes}
                margin="normal"
                onChange={(e) => handleInputChange(e, 'description')}
                value={stepTwo.description}
                InputProps={{ classes: { root: classes.inputRootDes} }}
                InputLabelProps={{
                classes: {
                    root: (stepTwo.description === '') ? classes.labelRoot : classes.labelRootFilled,
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
                    <div style={{ flex: 0.4 }}>
                        {renderInputField('', 'Campaign Objective', stepTwo.campaignObjective)}
                    </div>
                    <div style={{ flex: 0.4 }}>
                        {renderInputField('date', 'Campaign DadeLine', stepTwo.campaignDeadLine)}
                    </div>
                    <div style={{ flex: 0.2 }}/>
                </div>
                <div style={{ height: '120px', overflowY: 'scroll', marginTop: 5, paddingTop: 5, paddingBottom: 10 }}>
                    {stepTwo.tasks && stepTwo.tasks.length > 0 ? 
                        stepTwo.tasks.map((data: StretegyTask, index: number) => {
                            return renderTasksView(data, index);
                        })
                        : null
                    }
                </div>
                {renderAddMoreView()}
                {renderProjectDescriptionView()}
            </div>
        )
    }

    const renderBackButton = () => {
        return (
            <IconButton aria-label="back" className={classes.backButton} onClick={() => props.setCurrentStep(1)}>
                <ArrowBackIosIcon className={classes.backButton}/>
            </IconButton>
        );
    }

    const renderBottomView = () => {
        return (
            <div className={classes.bottomView}>
                    {renderBackButton()}
                    <Typography variant={'caption'} className={classes.stepLabel}>
                        Step {'2'} of 5
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => props.setCurrentStep(3)}
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
        flex: 0.2,
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
        flex: 0.7,
        display: FLEX,
        flexDirection: COLUMN
    },
    textFiledContainer: {
        display: FLEX,
        flex: 0.25,
        flexDirection: ROW,
    },
    tasksContainer: {
        display: FLEX,
        flex: 0.25,
        flexDirection: ROW,
        marginTop: 15,
        marginBottom: 15
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
    textFieldDes: {
        marginTop: 10,
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
    inputRootDes: {
        fontSize: 10,
        height: 80
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
    dateRoot: {
        fontSize: 10,
        color: GREY_COLOR,
        "&$labelFocused": {
            color: PRIMARY_DARK_COLOR
        },
        height: 25
    },
    dateRootFilled: {
        fontSize: 10,
        color: GREY_COLOR,
        "&$labelFocused": {
            color: PRIMARY_DARK_COLOR,
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
    addMore: {
        flex: 0.1,
        display: FLEX,
        alignItems: CENTER
    },
    stepLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 30
    },
    addMoreLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 10
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
    backButton: {
        width: 12,
        height: 18
    },
    addMoreButton: {
        width: 13,
        height: 13
    }
    }));

export default NewProjectStepTwo;

