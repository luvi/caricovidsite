export const casesReducer = (previousValue, currentValue) => {

    return { cases: previousValue.cases + currentValue.cases };
}

export const activeReducer = (previousValue, currentValue) => {

    return { active: previousValue.active + currentValue.active };
}

export const deathsReducer = (previousValue, currentValue) => {

    return { deaths: previousValue.deaths + currentValue.deaths };
}

export const criticalReducer = (previousValue, currentValue) => {

    return { critical: previousValue.critical + currentValue.critical };
}