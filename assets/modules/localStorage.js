export function saveToLocalStorage(array, key){
    return localStorage.setItem(key, JSON.stringify(array));
}