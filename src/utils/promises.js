export function promisesOnSet(promises) {
    promises.forEach(element => element.promise.then(element.then));
    return true;
};