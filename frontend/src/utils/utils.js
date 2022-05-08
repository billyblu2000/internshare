export function nameToShort(name){
    var splitted = name.trim().split(/\s+/);
    if (splitted.length === 1){
        return splitted[0].slice(0, 1).toUpperCase();
    }
    else{
        return splitted[0].slice(0, 1).toUpperCase() + splitted[1].slice(0, 1).toUpperCase();
    }
}