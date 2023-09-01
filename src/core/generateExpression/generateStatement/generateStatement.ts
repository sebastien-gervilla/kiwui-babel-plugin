import { types } from "@babel/core";
import generateExpression from "../generateExpression";


export const generateStatement = (statement: types.Statement): string => {
    return generateExpression(statement); 
}