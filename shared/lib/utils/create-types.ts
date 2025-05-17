type LiteralType<T> = {
    [K in keyof T]: T[K] extends object ? LiteralType<T[K]> : T[K];
};

export const createLiteralTypes = <T extends object>(obj: T): LiteralType<T> => {
    return obj as LiteralType<T>;
};
