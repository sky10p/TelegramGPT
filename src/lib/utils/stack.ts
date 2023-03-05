export interface IStack<T> {
    push: (item: T) => void;
    getElements: () => T[];
    size: () => number;
}

export const createStack = <T>(capacity: number) : IStack<T>=>{
    let storage: T[] = [];

    const size = () => storage.length;

    const push = (item: T) => {
        if(size() === capacity) {
            storage.shift();
        }

        storage.push(item);
    }

    const getElements = () => {
        return storage;
    }

    return {
        push, size, getElements
    }
}