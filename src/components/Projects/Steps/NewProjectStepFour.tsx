import React, { useState } from "react";
import { makeStyles, Typography, Button, TextField, IconButton } from '@material-ui/core';
import { PRIMARY_COLOR, TRANSPARENT, PRIMARY_DARK_COLOR, GREY_COLOR } from "utils/constants/colorsConstants";
import { BOLD, CENTER, COLUMN, FLEX, FLEX_END, NONE, POSITION_ABSOLUTE, ROW } from "utils/constants/stringConstants";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import { StepTwo, StretegyMilestone } from '../../../utils/types/index';

const NewProjectStepFour = (props: any) => {

    const classes = useStyles();
    const { projectData: {stepFour}, projectData, setProjectData } = props;
    const [tasksData, setTasks] = useState([1]);

    const onProjectDataChange = (stepFour: StepTwo) => {
        const newData = {...projectData, stepFour: {...stepFour}}
        setProjectData(newData);
    }
    
    const handleInputChange = (event: any, label: string) => {
        let newStepThree: StepTwo = stepFour;
        switch (label) {
            case 'Campaign Budget':
                newStepThree = {...stepFour, campaignBudget: event.target.value}
                onProjectDataChange(newStepThree)
                break;
            case 'Campaign Expences':
                newStepThree = {...stepFour, campaignExpenses: event.target.value}
                onProjectDataChange(newStepThree)
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
                <>
                    <Typography variant={'h6'} className={classes.headerTitle}>
                        Set Milestone Payments.
                    </Typography>
                    <Typography variant={'body2'}>
                        Get paid upon completion of each task or date.
                    </Typography>
                </>
            </div>
        );
    }

    const renderInputField = (_type: string, label: string, _value: any) => {
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
                            root: (_value == undefined || _value === '') ? classes.labelRoot : classes.labelRootFilled,
                            focused: classes.labelFocused
                        }
                }}
            />
        );
    }

    const renderTasksView = (data: StretegyMilestone, index: number) => {
        return (
            <div className={classes.tasksContainer}>
            <div style={{ flex: 0.5 }}>
                {renderInputField('', 'Milestone One   ie; Production', data.milestone)}
            </div>
            <div style={{ flex: 0.3 }}>
                {renderInputField('number', 'Payment 1 $', data.payment)}
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

    const renderMiddleView = () => {
        return (
            <div className={classes.middleView}>
                <div style={{ height: '150px', overflowY: 'scroll', marginTop: 25, paddingTop: 5, paddingBottom: 10 }}>
                    {stepFour.milestone && stepFour.milestone.length > 0 ? 
                        stepFour.milestone.map((data: StretegyMilestone, index: number) => {
                            return renderTasksView(data, index);
                        })
                        : null
                    }
                </div>
                {renderAddMoreView()}
            </div>
        )
    }

    const renderBackButton = () => {
        return (
            <IconButton aria-label="back" className={classes.backButton} onClick={() => props.setCurrentStep(3)}>
                <ArrowBackIosIcon className={classes.backButton}/>
            </IconButton>
        );
    }

    const renderBottomView = () => {
        return (
            <div className={classes.bottomView}>
                    {renderBackButton()}
                    <Typography variant={'caption'} className={classes.stepLabel}>
                        Step {'4'} of 5
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
        marginTop: 20
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
        alignItems: CENTER,
    },
    stepLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 30,
        justifyContent: FLEX_END,
    },
    bottomLeftView: {
        flex: 0.65,
        display: FLEX,
        alignItems: CENTER,
        color: GREY_COLOR,
        fontSize: 10,
    },
    bottomRightView: {
        flex: 0.35,
        display: FLEX,
        alignItems: CENTER,
        justifyContent: FLEX_END,
    },
    addMoreLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 10
    },
    estimatedCostLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginTop: 30
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

export default NewProjectStepFour;

