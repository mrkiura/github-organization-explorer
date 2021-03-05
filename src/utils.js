export const getClassNamesFor = (name, sortConfig) => {
    if (!sortConfig) {
        return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
};

export const parseLink = (s) => {
    const output = {};
    const regex = /<([^>]+)>; rel="([^"]+)"/g;

    let m;
    while ((m = regex.exec(s))) {
        const [_, v, k] = m;
        output[k] = v;
    }
    return output;
};
