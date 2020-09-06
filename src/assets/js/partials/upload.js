import * as colors from "components/partials/Colors";
import {primary} from "components/partials/Colors";

export const uploadStyles = {
    uploadFile: {
        position: 'relative',
        minHeight: '120px',
        border: `1px solid ${colors.primary}`,
        '& input': {
            height: '100%',
            cursor: 'pointer',
        },
        '& .input': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            opacity: 0,
        },
        '& .file': {
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            '& .blockPart': {
                textAlign: 'center',
                width: '100%',
                fontSize:'1rem',
                '& .addIcon': {
                    cursor: 'pointer',
                    zIndex: '100',
                    '& svg': {
                        borderRadius: '100%',
                        color: 'white',
                        backgroundColor: primary,
                    }
                },
                '& #fileBlock': {
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    '& > div': {//for voice
                        margin: '0!important',
                    },
                    '& .cancel': {
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '10px',
                        left: '12px',
                        color: colors.primary,
                        zIndex: '100'
                    },
                    '& .cancelVoice': {
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '-13px',
                        left: '0',
                        color: colors.primary,
                    },
                    '& .item': {
                        boxSizing: 'border-box',
                        width: '100%!important',
                        padding: '10px',
                        height: '120px!important',
                    }
                },
                '& .previewText': {
                    textAlign: 'center',
                    width: '100%',
                }
            }
        },
    },
    video:{
       '& div':{
           boxSizing: 'border-box',
           width: '100%!important',
           padding: '10px',
           height: '120px!important',
       }
    }
};

export default uploadStyles;
