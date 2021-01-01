import React, {ChangeEvent, useState} from "react";
import { makeStyles, Typography, Button, TextField, IconButton } from '@material-ui/core';
import { PRIMARY_COLOR, TRANSPARENT, PRIMARY_DARK_COLOR, GREY_COLOR } from "utils/constants/colorsConstants";
import { BOLD, CENTER, COLUMN, FLEX, FLEX_END, NONE, POSITION_ABSOLUTE, ROW } from "utils/constants/stringConstants";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import { StretegyTask } from '../../../utils/types/index';
import AppTextField from "../../Common/Core/AppTextField";

const NewProjectStepTwo = (props: any) => {
    const classes = useStyles();
    const { projectData, setProjectData } = props;
    const [tasksData, setTasks] = useState([1]);

    const handleInputChange = (event: any) =>  (key: string) => {
        const value = event.target.value
        setProjectData({...projectData, [key]: value})
    }

    const addMoreClicked = () => {
        let newData: Array<number> = [...tasksData];
        newData.push(1);
        setTasks(newData);
    }

    const renderTopView = () => {
        return (
            <div className={classes.headerView}>
                <div style={{ marginBottom: 40 }}>
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

    const renderTasksView = (data: StretegyTask, index: number) => {
        return (
            <div className={classes.tasksContainer}>
            <div style={{ flex: 0.5, marginRight: 15 }}>
                <AppTextField type={""} label={'Task One   ie: preplan'} value={data.task} onChange={(e: ChangeEvent) => handleInputChange(e)("task")} />
            </div>
            <div style={{ flex: 0.2, marginRight: 15 }}>
                <AppTextField type={"date"} label={'Campaign DadeLine'} value={data.startDay} onChange={(e: ChangeEvent) => handleInputChange(e)("startDay")} />
            </div>
            <div style={{ flex: 0.2 }}>
                <AppTextField type={"date"} label={'Campaign DadeLine'} value={data.deadLine} onChange={(e: ChangeEvent) => handleInputChange(e)("deadLine")} />
            </div>
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
                onChange={(e) => handleInputChange(e)("description")}
                value={projectData.description}
                InputProps={{ classes: { root: classes.inputRootDes} }}
                InputLabelProps={{
                classes: {
                    root: (projectData.description === '') ? classes.labelRoot : classes.labelRootFilled,
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
                    <div style={{ flex: 1, marginRight: 15 }}>
                        <AppTextField type={""} label={'Campaign Objective'} value={projectData.campaignObjective} onChange={(e: ChangeEvent) => handleInputChange(e)("campaignObjective")} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <AppTextField type={"date"} label={'Campaign DadeLine'} value={projectData.campaignDeadLine} onChange={(e: ChangeEvent) => handleInputChange(e)("campaignDeadLine")} />
                    </div>
                </div>
                <div style={{marginTop: 20}}>
                    {projectData.tasks && projectData.tasks.length > 0 ?
                        projectData.tasks.map((data: StretegyTask, index: number) => {
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
            <IconButton aria-label="back" className={classes.backButton} onClick={() => props.onBack()}>
                <ArrowBackIosIcon className={classes.backButton}/>
            </IconButton>
        );
    }

    const renderBottomView = () => {
        return (
            <div className={classes.bottomView}>
                    {renderBackButton()}
                    <Typography variant={'caption'} className={classes.stepLabel}>
                        Step 2 of 5
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => props.onNext()}
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
        flex: 1,
        flexDirection: ROW,
        marginBottom: 20
    },
    tasksContainer: {
        display: FLEX,
        flex: 1,
        flexDirection: ROW,
        marginBottom: 20
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
        minHeight: 80
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
        },
    },
    labelRootFilled: {
        fontSize: 10,
        color: GREY_COLOR,
        "&$labelFocused": {
            color: PRIMARY_DARK_COLOR,
        },
    },
    labelFocused: {
    
    },
    bottomView: {
        flex: 0.1,
        display: FLEX,
        alignItems: CENTER,
        justifyContent: FLEX_END,
        marginTop: 20
    },
    addMore: {
        marginTop: -10,
        marginBottom : 20
    },
    stepLabel: {
        color: GREY_COLOR,
        fontSize: 10,
        marginRight: 30
    },
    addMoreLabel: {
        color: GREY_COLOR,
        fontSize: 10,
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

