import React, {useEffect, useRef, useCallback} from 'react';
import i18next from 'i18next';

import ProfileContentComponent from './partials/UserDrawerContent.jsx';
import AppContext from 'contexts/AppContext';
import { StyledUserDrawer, StyledDrawerContent} from 'assets/js/library/pages/user/profile';


export default function () {
    const node = useRef();
    const {toggleUserDrawer, showUserDrawer} = React.useContext(AppContext);
    let lang = i18next.language;

    const handleClick = useCallback(
        e => {
            if (!node.current.contains(e.target)) {
                toggleUserDrawer(false);
            }
        },
        [toggleUserDrawer]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [handleClick]);

    return (
        <StyledUserDrawer lang={lang} showUserDrawer={showUserDrawer}>
            <StyledDrawerContent ref={node} showUserDrawer={showUserDrawer}>
                <ProfileContentComponent changeUserDrawer={handleClick}/>
            </StyledDrawerContent>
        </StyledUserDrawer>
    );
}
