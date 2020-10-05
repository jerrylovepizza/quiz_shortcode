
export const mqzgetIndex = function(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

export const range = n => Array.from({length: n}, (value, key) => key);