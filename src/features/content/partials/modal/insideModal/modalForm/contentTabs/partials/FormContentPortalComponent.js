export const handleAffiliateChangeMethod = (e,newContentContext) => {
    const checked = e.currentTarget.checked;
    newContentContext.setContent(prevState => {
        return {
            ...prevState, field_domain_all_affiliates: checked
        }
    });
}

export default {handleAffiliateChangeMethod};