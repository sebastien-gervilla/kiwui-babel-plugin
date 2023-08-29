import { types } from "@babel/core";

import { generateJSXElement } from "..";
import { generateArrowFunction } from "./generateArrowFunction";
import { generateAssignementExpression } from "./generateAssignementExpression";
import { generateVariableDeclaration } from "./generateVariableDeclaration";
import { generateCallExpression } from "./generateCallExpression";
import { generateMemberExpression } from "./generateMemberExpression";
import { generateDoWhileStatement, generateForInStatement, generateForOfStatement, generateForStatement, generateIfStatement, generateStatement, generateThrowStatement, generateTryStatement, generateWhileStatement } from "./generateStatement";
import { generateObjectExpression } from "./generateObjectExpression";
import { generateBinaryExpression } from "./generateBinaryExpression";
import { generateAwaitExpression } from "./generateAwaitExpression";
import { generateFunctionDeclaration } from "./generateFunctionDeclaration";
import { generateFunctionExpression } from "./generateFunctionExpression";
import { generateBlockStatement } from "./generateBlockStatement";
import { generateNewExpression } from "./generateNewExpression";
import { generateArrayExpression } from "./generateArrayExpression";
import { generateConditionalExpression } from "./generateConditionalExpression";
import { generateUnaryExpression } from "./generateUnaryExpression";
import { generateUpdateExpression } from "./generateUpdateExpression";



type ExpressionType = types.Expression | types.JSXEmptyExpression | types.BlockStatement | types.Statement | types.Node;
type ExpressionGeneratorFunction<T extends ExpressionType> = (expression: T, parentPrecedence?: number) => string;

type ExpressionGenerator<T extends types.Expression> = (expression: T, parentPrecedence?: number) => string;
type ExpressionGenerators = Record<string, ExpressionGenerator<any>>;

const expressionGenerators: ExpressionGenerators = {
    JSXElement: (element : types.JSXElement) => generateJSXElement(element),
    AssignmentExpression: (expression : types.AssignmentExpression) => generateAssignementExpression(expression),
    JSXEmptyExpression: () => '',
    PrivateName : () => '',
    ExpressionStatement : (expression : types.ExpressionStatement) => generateExpression(expression.expression),
    ArrowFunctionExpression : (expression : types.ArrowFunctionExpression) => generateArrowFunction(expression),
    ArgumentPlaceholder : () => '',
    BlockStatement : (expression : types.BlockStatement) => generateBlockStatement(expression),
    BooleanLiteral : (expression : types.BooleanLiteral) => expression.value ? 'true' : 'false',
    VariableDeclaration : (expression : types.VariableDeclaration) => generateVariableDeclaration(expression),
    CallExpression : (expression : types.CallExpression) => generateCallExpression(expression),
    Identifier : (expression : types.Identifier) => expression.name,
    StringLiteral : (expression) => `\"${expression.value}\"`,
    NumericLiteral : (expression) => expression.value.toString(),
    BinaryExpression : (expression : types.BinaryExpression, parentPrecedence) => 
        generateBinaryExpression(expression, parentPrecedence),
    LogicalExpression : (expression : types.LogicalExpression, parentPrecedence) => 
        generateBinaryExpression(expression, parentPrecedence),
    TryStatement : (expression : types.TryStatement) => generateTryStatement(expression),
    ObjectExpression : (expression : types.ObjectExpression) => generateObjectExpression(expression),
    ForOfStatement : (expression : types.ForOfStatement) => generateForOfStatement(expression),
    IfStatement : (expression : types.IfStatement) => generateIfStatement(expression),
    ForStatement : (expression : types.ForStatement) => generateForStatement(expression),
    WhileStatement : (expression : types.WhileStatement) => generateWhileStatement(expression),
    DoWhileStatement : (expression : types.DoWhileStatement) => generateDoWhileStatement(expression),
    BreakStatement : () => "break;",
    ContinueStatement : () => "continue;",
    AwaitExpression : (expression : types.AwaitExpression) => generateAwaitExpression(expression),
    ThrowStatement : (expression : types.ThrowStatement) => generateThrowStatement(expression),
    FunctionDeclaration : (expression : types.FunctionDeclaration) => generateFunctionDeclaration(expression),
    FunctionExpression : (expression : types.FunctionExpression) => generateFunctionExpression(expression),
    ForInStatement : (expression : types.ForInStatement) => generateForInStatement(expression),
    NullLiteral : () => 'null',
    NewExpression : (expression : types.NewExpression) => generateNewExpression(expression),
    ArrayExpression : (expression : types.ArrayExpression) => generateArrayExpression(expression),
    ConditionalExpression : (expression : types.ConditionalExpression) => generateConditionalExpression(expression),
    UnaryExpression : (expression : types.UnaryExpression) => generateUnaryExpression(expression),
    MemberExpression : (expression : types.MemberExpression) => {
        if (types.isIdentifier(expression.object) 
            && types.isIdentifier(expression.property) 
            && expression.property.name === 'index') {
            return `${expression.object.name}[${expression.property.name}]`;
        }
        return generateMemberExpression(expression);
    },
    SpreadElement : (expression : types.SpreadElement) => {
        if (types.isIdentifier(expression.argument)) {
            return `...${expression.argument}`;
        }
        return '';
    },
    UpdateExpression : (expression : types.UpdateExpression) => generateUpdateExpression(expression)


};


const generateExpression: ExpressionGeneratorFunction<ExpressionType> = (expression, parentPrecedence = 0) => {    
    
    const generator = expressionGenerators[expression.type]
    if (generator){
        return generator(expression,parentPrecedence)
    }
    // Handle other JSX expressions
    throw new Error("Expression not supported");
}


export default generateExpression;