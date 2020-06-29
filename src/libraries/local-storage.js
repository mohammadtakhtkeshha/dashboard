export function store(key,object) {
    localStorage.setItem(key,object);
}

export function retrieve(key) {
    localStorage.getItem(key)
}

export function remove(key) {
    localStorage.removeItem(key)
}

export default {
    store,
    retrieve,
    remove
};



