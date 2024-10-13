export const getWhislistFromLocalStorage = () => {
    const whislistJSON = localStorage.getItem('whislists');
    return whislistJSON ? JSON.parse(whislistJSON) : [];
}

export const addWhislistToLocalStorage = (product) => {
    const whislists = getWhislistFromLocalStorage();
    if (!whislists.some(p => p._id === product._id)) {
        whislists.push(product);
        localStorage.setItem('whislists', JSON.stringify(whislists));
    }
}

export const removeWhislistFromLocalStorage = (productId) => {
    const whislists = getWhislistFromLocalStorage();
    const updatedWhislist = whislists.filter(product => product._id !== productId);
    localStorage.setItem('whislists', JSON.stringify(updatedWhislist));
}
