import React, { useState } from "react";
import "../../App.css";
import { Modal, makeStyles, IconButton } from '@material-ui/core';
import { WHITE_COLOR } from "utils/constants/colorsConstants";
import { APP_BAR_HEIGHT, COLUMN, FLEX, NONE, POSITION_ABSOLUTE } from "utils/constants/stringConstants";
import ClearIcon from '@material-ui/icons/Clear';
import NewProjectStepOne from './Steps/NewProjectStepOne';
import NewProjectStepTwo from './Steps/NewProjectStepTwo';
import NewProjectStepThree from './Steps/NewProjectStepThree';
import NewProjectStepFour from './Steps/NewProjectStepFour';
import { ProjectData } from '../../utils/types/index';
import { getProductData } from '../../utils/index';
  
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
    const [modalStyle] = React.useState(getModalStyle);
    const [currentStep, setCurrentStep] = useState(1);
    const [projectData, setProjectData] = useState(getProductData());

    const handleClose = () => {
    }

    const renderCloseButton = () => {
        return (
            <IconButton aria-label="delete" className={classes.closeButton}>
                <ClearIcon fontSize="large"/>
            </IconButton>
        );
    }

    const renderStepsView = () => {
        switch (currentStep) {
            case 1:
                return (<NewProjectStepOne projectData={projectData} setProjectData={(newData: ProjectData) => setProjectData(newData)} setCurrentStep={(step: number) => setCurrentStep(step)}/>)
            case 2:
                return (<NewProjectStepTwo projectData={projectData} setProjectData={(newData: ProjectData) => setProjectData(newData)} setCurrentStep={(step: number) => setCurrentStep(step)}/>)
            case 3:
                return (<NewProjectStepThree projectData={projectData} setProjectData={(newData: ProjectData) => setProjectData(newData)} setCurrentStep={(step: number) => setCurrentStep(step)}/>)
            case 4:
                return (<NewProjectStepFour projectData={projectData} setProjectData={(newData: ProjectData) => setProjectData(newData)} setCurrentStep={(step: number) => setCurrentStep(step)}/>)
            default:
                return (<NewProjectStepOne projectData={projectData} setProjectData={(newData: ProjectData) => setProjectData(newData)} setCurrentStep={(step: number) => setCurrentStep(step)}/>)
        }
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
                            {renderStepsView()}
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
    closeButton: {
        position: POSITION_ABSOLUTE,
        top: 10,
        right: 10
    },
    }));

export default NewProjectModal;

