export const objectFilter = function <T> (filters: Partial<T>): (item: T) => boolean {
    return (item: T) => {
        let approach = true;

        Object.keys(filters).forEach((key: string) => {
            if (typeof item[key] === 'string') {
                if (!item[key].toString().match(new RegExp(filters[key.toString()], 'i'))) {
                    approach = false;
                    return;
                }
            } else if (item[key] !== filters[key]) {
                approach = false;
                return;
            }
        });

        return approach;
    };
};