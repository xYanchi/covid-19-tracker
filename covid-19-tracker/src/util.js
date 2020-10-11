export const sortData = (data) => {
    const sortedData = [...data];
    //Sort by biggest cases to lowest cases
    return sortedData.sort((a, b) => b.cases - a.cases);
}