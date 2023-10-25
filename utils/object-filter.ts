export const objectFilter = function <T> (filters: Partial<T>): (item: T) => boolean {
    return (item: T) => {
        let approach: boolean = true;

        Object.keys(filters).forEach((key: string) => {
            if (typeof item[key as keyof T] === 'string') {
                if (!item[key as keyof T]!.toString().match(new RegExp(filters[key.toString() as keyof Partial<T>] as string, 'i'))) {
                    approach = false;
                    return;
                }
            } else if (item[key as keyof T] !== filters[key as keyof T]) {
                approach = false;
                return;
            }
        });

        return approach;
    };
};