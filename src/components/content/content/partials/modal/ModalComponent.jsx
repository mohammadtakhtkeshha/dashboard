import React, {useContext} from "react"

import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import {makeStyles} from "@material-ui/styles"
import {withStyles} from "@material-ui/core/styles"
import DialogContent from '@material-ui/core/DialogContent'

import ContentListOfContentType from "./insideModal/contentTypeList/ContentTypeListModalComponent.jsx"
import {useStyles} from "assets/js/content/partials/contentModal"
import NewContent from "./insideModal/modalForm/Index.jsx"
import ContentsContext from "contexts/ContentsContext"

import AppContext from "contexts/AppContext"
import {getImagesCategory} from "core/services/content.service"

const useStyle = makeStyles(useStyles)

const dialogStyles = (theme) => ({
    root: {
        outline: 0,
        display: 'flex',
        justifyContent: 'center',
        width: 'fit-content',
    }
})

const DialogContentWithStyles = withStyles(dialogStyles)(DialogContent)

export default function ModalComponent({openRegisterForm, handleCloseContentForm, setContent}) {
    const classes = useStyle()

    const contentContext = useContext(ContentsContext)

    const handleCloseRegisterForm = () => {
        handleCloseContentForm()
        contentContext.setContentType('')
        contentContext.setId('')
        contentContext.setImgAndUrl([])
        contentContext.setImgsAndUrls([])
        contentContext.setVoicesAndUrl([])
        contentContext.setVideosAndUrl([])
    }

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRegisterForm}
        onClose={handleCloseRegisterForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>
        <DialogContentWithStyles>
            {contentContext.id === '' ? (contentContext.contentType === '' ?
                    <ContentListOfContentType
                        handleCloseRegisterForm={handleCloseRegisterForm}
                        openRegisterForm={openRegisterForm}
                    />
                    : <NewContent newsCategory={contentContext.newsCategory}
                                  states={contentContext.states}
                                  openRegisterForm={openRegisterForm}
                                  handleCloseRegisterForm={handleCloseRegisterForm}/>
            ) : (<NewContent states={contentContext.states}
                             newsCategory={contentContext.newsCategory}
                             openRegisterForm={openRegisterForm}
                             handleCloseRegisterForm={handleCloseRegisterForm}/>)}
        </DialogContentWithStyles>
    </Modal>)
}

