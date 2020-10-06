import React from 'react';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import storage from 'libraries/local-storage';
import {badgeStyles, avatarStyles} from 'assets/js/user/Avatar';

const StyledBadge = withStyles(badgeStyles)(Badge);
const useStyles = makeStyles(avatarStyles);

export default function AvatarComponent(props) {
    const classes = useStyles(props);
    const currentUser = JSON.parse(storage.get('user'));

    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                variant="dot">
                <Avatar alt="Remy Sharp" src={currentUser !== null && currentUser.image !== undefined ? JSON.parse(storage.get('user')).image : ''}/>
            </StyledBadge>
        </div>
    );
}