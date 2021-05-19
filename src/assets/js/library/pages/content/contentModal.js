const theme1 = {
    maxWidth: '444px',
};
const theme2 = {
    maxWidth: '1000px',
};

export let theme = (type) => {
    return type === '' ? theme1 : theme2;
}
