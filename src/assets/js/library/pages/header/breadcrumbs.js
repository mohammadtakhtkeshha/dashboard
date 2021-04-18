import {green, white} from "../../abstracts/colors";

export const breadStyles ={
    breadcrumbs: {
        '& a:hover': {
            textDecoration: 'none',

        },
        '& li:last-child': {
            '& a': {
                color: white[0],
            }
        },
        '& li': {
            '& a': {
                color: green[7],
            },
            color: green[7],
        }
    }
}
