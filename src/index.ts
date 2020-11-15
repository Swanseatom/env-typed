export interface EnvVarsTemplate {
    [x: string]: EnvVarType;
}

type EnvVarType = 'string' | 'number' | 'boolean' | 'json';

interface EnvVarsParsed {
    [x: string]: EnvVarParsedType;
}

type EnvVarParsedType = string | number | boolean | object | undefined;



export function parseEnvVariables(template: EnvVarsTemplate): EnvVarsParsed {
    const parsedVariables: EnvVarsParsed = {};
    Object.keys(template).forEach((key) => {
        const envVar = process.env[key];        
        if (envVar) {
            parsedVariables[key] = parseEnvVariable(envVar, template[key]);
        }
        if (!envVar && template[key] === 'boolean') {
            parsedVariables[key] = false;
        }
    });
    return parsedVariables;
}

const parseEnvVariable = (envVariable: string, type: EnvVarType): EnvVarParsedType => {
    switch (type) {
        case 'number':
            return parseNumber(envVariable);
        case 'json':
            return parseJson(envVariable);
        case 'boolean':
            return parseBool(envVariable);
        case 'string':
        default:
            return envVariable;
    }
}

const parseBool = (input: string): boolean | string => {
    if (!input || input === 'false' || Number(input) === 0) {
        return false;
    }
    if (input === 'true' || Number(input) === 1) {
        return true;
    }
    return input;
}

const parseNumber = (input: string): number | string => {
    if (!isNaN(Number(input))) {
        return Number(input);
    }
    return input;
}

const parseJson = (input: string): object | string => {
    try {
        return JSON.parse(input);
    } catch (error) {
        return input;
    }
}