const baseUrl =process.env.REACT_APP_API_URL;

export const getTenNumberOfCommentsUrl = `${baseUrl}/last_comment/dashboard?_format=json`
export const getUsersUrl = `${baseUrl}/api/users/dashboard/chart?_format=json`
export const getTenNumberOfUsersUrl = `${baseUrl}/api/users/dashboard/ten`
export const getTenNumberOfContentsUrl = `${baseUrl}/api/content/dashboard/last_ten?_format=json`
export const getContentLisUrl = `${baseUrl}/api/dashboard/number_content_types?_format=json`
export const getCommentChartUrl = `${baseUrl}/last_comment/chart?_format=json`
