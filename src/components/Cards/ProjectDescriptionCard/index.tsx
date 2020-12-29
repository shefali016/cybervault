import React from "react";
import { Button, Card, Grid, MenuItem, IconButton } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Popover from '@material-ui/core/Popover';
import { AUTO, BLOCK, CENTER, FLEX } from "utils/constants/stringConstants";
import { BLACK_COLOR } from "utils/constants/colorsConstants";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ReceiptIcon from '@material-ui/icons/Receipt';

function ProjectCard(props: {
    projectDetails?: any,
    openProject?: any,
    isPopover?: boolean
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const ITEM_HEIGHT = 48;
    const classes = useStyles();
    return (<Button onClick={props.openProject}>
        {props.isPopover ? (<Grid style={{ position: "absolute", top: 0, right: 0 }}>

            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            {...bindTrigger(popupState)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            id={"long-menu"}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 2.5,

                                    borderRadius: 15,
                                    border: 1,
                                    fontSize: 12,
                                    borderColor: 'black',
                                    paddingTop: 8,
                                    paddingBottom: 8,

                                },
                            }}
                            style={{ marginLeft: -20, marginTop: -20 }}
                            {...bindPopover(popupState)}
                        >

                            <MenuItem style={{ fontSize: 12 }}>
                                <div style={{ display: FLEX }}>
                                    <AddBoxIcon style={{ marginRight: 5 }} fontSize="small" />
                                          Edit Project Info
                                      </div>
                            </MenuItem>
                            <MenuItem style={{ fontSize: 12 }}>
                                <div style={{ display: FLEX }}>
                                    <ReceiptIcon style={{ marginRight: 5 }} fontSize="small" />
                                          Send Invoice
                                      </div>
                            </MenuItem>
                            <MenuItem style={{ fontSize: 12 }}>
                                <div style={{ display: FLEX, color: 'red' }}>
                                    <DeleteSharpIcon style={{ marginRight: 5 }} fontSize="small" />
                                          Delete Project
                                      </div>
                            </MenuItem>

                        </Popover>
                    </div>
                )}
            </PopupState>
        </Grid>) : null}
        <Card className={classes.card}>

            <Grid container spacing={4} direction={'column'}>

                <Grid item xs={12} className={classes.imageWrapper}>
                    <img className={classes.img} src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} alt="Logo" />
                </Grid>
                <Grid item xs={12}>
                    <h5 className={classes.title}>
                        {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Project Name"}
                    </h5>
                    <h6 className={classes.bodyText}>Value: {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "value"} . {(props.projectDetails && props.projectDetails.date) ? props.projectDetails.date : "Starting Date"}</h6>
                </Grid>
            </Grid>
        </Card>
    </Button>);
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: '10rem',
        height: '10rem',
        borderRadius: 15,
        flexGrow: 1
    },
    imageWrapper: {
        boxShadow: '0 0px 1px 2px #DCDCDC',
        alignItems: CENTER,
        display: FLEX,
        justifyContent: CENTER,
    },
    title:
    {
        fontSize: '12px',
        color: BLACK_COLOR,
        fontWeight: 600,
        margin: 0,
    },
    bodyText:
    {
        fontSize: '8px',
        color: BLACK_COLOR,
        margin: 0,
    },
    img: {
        width: AUTO,
        height: AUTO,
        display: BLOCK,
        maxWidth: 300,
        maxHeight: 200,
        marginTop: 10
    }

}));
export default ProjectCard;