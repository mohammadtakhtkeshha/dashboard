import React, {useContext} from "react";
import i18next from "i18next";
import {withNamespaces} from 'react-i18next';
import {useHistory,Link} from 'react-router-dom';

import {FormControl, MenuItem, ListItemIcon, Select} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import withStyles from "@material-ui/core/styles/withStyles";

import AppContext from 'contexts/AppContext';
import {logout} from 'core/services/auth.service';
import {
    StyledPowerBox,
    StyledBoxItem,
    styledSelect,
    StyledFlagsBlock,
    StyledBox,
    styledListItemIcon,
    StyledSearchBlock
} from "assets/js/header/leftWebHeader";
import Iran from 'assets/media/image/iran.png';
import Us from 'assets/media/image/us.jpg';
import UserDrawerComponent from "features/user/partials/userDrawer/Index.jsx";
import {ReactComponent as UserSvg} from 'assets/svg/user.svg';

const StyledSelect = withStyles(styledSelect)(Select);
const StyledListItemIcon = withStyles(styledListItemIcon)(ListItemIcon);

function LeftWebHeaderComponent({t}) {
    const {toggleUserDrawer} = useContext(AppContext);
    const lang = i18next.language;
    let history = useHistory();

    const changeDrawerUser = () => {
        toggleUserDrawer(true);
    }

    const handleChange = (event) => {
        i18next.changeLanguage(event.target.value);
    }

    return (<>
        <StyledBox>
            <StyledFlagsBlock>
                <FormControl variant="filled">
                    <StyledSelect
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={lang}
                        onChange={handleChange}>
                        <MenuItem value="fa">
                            <StyledListItemIcon>
                                <img src={Iran} alt="fa"/>
                            </StyledListItemIcon>
                        </MenuItem>
                        <MenuItem value="en">
                            <StyledListItemIcon>
                                <img src={Us} alt="en"/>
                            </StyledListItemIcon>
                        </MenuItem>
                    </StyledSelect>
                </FormControl>
            </StyledFlagsBlock>
            <StyledSearchBlock lang={lang}>
                <label htmlFor="" id="label">
                    <SearchIcon fontSize="small"/>
                </label>
                <input type="text" placeholder={t('translation:search')}/>
            </StyledSearchBlock>
            <StyledBoxItem>
                <button>
                    <MessageIcon/>
                </button>
            </StyledBoxItem>
            <StyledBoxItem>
                <button >
                    <Link to="/edit-profile">
                    <NotificationImportantIcon fontSize="small"/>
                    </Link>
                </button>
            </StyledBoxItem>
            <StyledBoxItem>
                <button onClick={changeDrawerUser}>
                    <UserSvg fontSize="small"/>
                </button>
            </StyledBoxItem>
            <StyledPowerBox lang={lang}>
                <button onClick={() => logout(history)}>
                    <PowerSettingsNewIcon/>
                </button>
            </StyledPowerBox>
            {/*<Box className={clsx(classes.avatar, "item")} onClick={changeDrawerUser}>*/}
            {/*    <AvatarComponent/>*/}
            {/*</Box>*/}
        </StyledBox>
        <UserDrawerComponent/>
    </>);
}

export default withNamespaces('sidebar,users,translation')(LeftWebHeaderComponent);

