import {grey, primary} from "../../components/partials/Colors";

export const paginationStyle = {
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        '& ul': {
            '& li': {
                '& button': {
                    borderRadius: '0',
                    margin: '0',
                    borderColor: grey.tooLight,
                    color: primary,
                    padding: '13px'
                }
            }
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: primary,
            color: 'white',
            border: '0'
        }
    }
}


