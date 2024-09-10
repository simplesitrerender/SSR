function as_tag(first:any, two:any) {
    for (let first of two) {
        return first;
    }
}

export { as_tag }

