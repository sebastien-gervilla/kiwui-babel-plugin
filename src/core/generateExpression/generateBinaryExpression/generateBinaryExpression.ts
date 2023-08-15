import { types } from "@babel/core";
import generateExpression from "../generateExpression";

const {
    isExpression
} = types


export const generateBinaryExpression = (expression: types.BinaryExpression | types.LogicalExpression): string => {
    let left = '';
    if (isExpression(expression.left)) {
        left = generateExpression(expression.left);
    } else {
        console.log("isLogicalExpression")
        console.log(expression.left)
    }

    const right = generateExpression(expression.right);
    return `${left} ${expression.operator} ${right}`;// Ignore PrivateName
}