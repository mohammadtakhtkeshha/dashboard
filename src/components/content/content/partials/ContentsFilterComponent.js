import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Box, Typography} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";

import Input from "components/partials/inputComponent";
import ButtonComponent from "components/partials/ButtonComponent";
import {primary} from "components/partials/Colors";
import ContentsContext from "contexts/ContentsContext";
import {StyledFilterBlock} from "assets/js/content/contentFilter";
import {StyledButton} from "assets/js/App";


function ContentsFilterComponent({t}) {
    const contentsContext = useContext(ContentsContext);
    const [status, setStatus] = useState('');
    const [contentType, setContentType] = useState('');
    const [searchedContent, setSearchedContent] = useState({
        title: '',
        status: '',
        contentType: ''
    });

    let changeTitle = (e) => {
        const currentValue = e.currentTarget.value;
        setSearchedContent(prevState => {
            return {
                ...prevState, title: currentValue
            }
        });
    }

    const changeStatus = (event) => {
        switch (event.currentTarget.value) {
            case 'published':
                setStatus('published');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: "On"
                    }
                });
                break;
            case 'unpublished':
                setStatus('unpublished');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: "Off"
                    }
                });
                break;
            default:
                setStatus('');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: ""
                    }
                });
        }

    }

    const changeContentType = (e) => {
        const currentValue = e.currentTarget.value;
        setContentType(currentValue);
        setSearchedContent(prevState => {
            return{
                ...prevState,contentType: currentValue
            }
        });
    }

    const doFilterHandler = () => {
        const currentContents = contentsContext.contents;
        const filteredContent = currentContents.filter((content) => {
                return content['title'].includes(searchedContent.title)
                    && content.status.includes(searchedContent.status)
                    && content.type.includes(contentType)

            }
        );
        contentsContext.afterUpdateHandler(filteredContent, filteredContent.length, false);
    }

    return (<ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{t('translation:filter')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <StyledFilterBlock>
                  <Box>
                      {/*<Input placeholder={t('translation:title')}*/}
                      {/*       handleClick={changeTitle}/>*/}
                             <input placeholder={t('translation:title')} onClick={changeTitle}/>
                      <TextField
                          id="outlined-select-role-native"
                          select
                          value={status}
                          onChange={changeStatus}
                          SelectProps={{
                              native: true,
                          }}
                          variant="outlined"
                      >
                          <option value="">{t('translation:status')}</option>
                          <option value="published">{t('translation:published')}</option>
                          <option value="unpublished">{t('translation:unpublished')}</option>
                      </TextField>
                      <TextField
                          id="outlined-select-role-native"
                          select
                          value={contentType}
                          onChange={changeContentType}
                          SelectProps={{
                              native: true,
                          }}
                          variant="outlined"
                      >
                          <option>{t('contents:contentType')}</option>
                          {contentsContext.contentTypeList?.map((item, index) => (
                              <option key={index} value={item.name}>
                                  {item.name}
                              </option>
                          )) || ''}
                      </TextField>
                  </Box>
                    <StyledButton onClick={doFilterHandler}>
                        {t('translation:do')}
                    </StyledButton>
                </StyledFilterBlock>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withNamespaces('contents,translation')(ContentsFilterComponent);
