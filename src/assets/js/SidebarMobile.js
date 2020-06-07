import {makeStyles} from '@material-ui/core/styles/index';

export const styles = makeStyles((theme) => ({

    show: {
        marginTop: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1000000000,
        left: 0,
        overflow: 'hidden',
        '& #openedSidebar': {
            width: '300px',
            transition: 'width .1s',
            backgroundColor: 'white',
            '& .MuiBox-root': {
                paddingTop: '0',
                paddingRight: '0',
                '& nav': {
                    paddingTop: '0',
                },
            },
            '& #myheader': {
                height: '100vh'
            }
            , '& .MuiPaper-root': {
                borderRadius: '0',
                marginRight:'0',
            },
            '& .MuiTabs-flexContainer': {
                height: '100vh',
            }
        },
        width: '100%',
    },

    notShow: {
        width: '0',
        marginTop: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1000000000,
        left: 0,
        overflow: 'hidden',
        '& #openedSidebar': {
            width: '0%',
            backgroundColor: 'white',
            '& .MuiBox-root': {
                paddingTop: '0',
                paddingRight: '0',
                '& nav': {
                    paddingTop: '0',
                },
            },
            '& #myheader': {
                height: '100vh'
            }
            , '& .MuiPaper-root': {
                borderRadius: '0'
            },
        },
    }

}));