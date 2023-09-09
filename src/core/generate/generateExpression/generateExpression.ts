// Babel
import { types } from "@babel/core";
import { AliasMap } from "../generate.types";

import { generateAssignmentExpression } from "./generateAssignmentExpression";
import { generateArrowFunction } from "./generateArrowFunction";
import { generateCallExpression } from "./generateCallExpression";
import { generateMemberExpression } from "./generateMemberExpression";
import { generateObjectExpression } from "./generateObjectExpression";
import { generateBinaryExpression } from "./generateBinaryExpression";
import { generateAwaitExpression } from "./generateAwaitExpression";
import { generateFunctionExpression } from "./generateFunctionExpression";
import { generateNewExpression } from "./generateNewExpression";
import { generateArrayExpression } from "./generateArrayExpression";
import { generateConditionalExpression } from "./generateConditionalExpression";
import { generateUnaryExpression } from "./generateUnaryExpression";
import { generateUpdateExpression } from "./generateUpdateExpression";

export const expressionGenerator: AliasMap<types.Expression> = {
    ArrayExpression: generateArrayExpression,
    AssignmentExpression: generateAssignmentExpression,
    BinaryExpression: generateBinaryExpression, // TODO: Rework these
    LogicalExpression: generateBinaryExpression, // TODO: Rework these
    CallExpression: generateCallExpression,
    ConditionalExpression: generateConditionalExpression,
    FunctionExpression: generateFunctionExpression,
    Identifier: (expression) => expression.name, // TODO: Should identifier be here ?
    MemberExpression: (expression) => {
        if (types.isIdentifier(expression.object) 
            && types.isIdentifier(expression.property) 
            && expression.property.name === 'index') {
            return `${expression.object.name}[${expression.property.name}]`;
        }
        return generateMemberExpression(expression);
    },
    NewExpression: generateNewExpression,
    ObjectExpression: generateObjectExpression,
    // SequenceExpression: () => '',
    // ParenthesizedExpression: () => '',
    // ThisExpression: () => '',
    UnaryExpression: generateUnaryExpression,
    UpdateExpression: generateUpdateExpression,
    ArrowFunctionExpression: generateArrowFunction,
    // ClassExpression: () => '',
    // MetaProperty: () => '',
    // Super: () => '',
    // TaggedTemplateExpression: () => '',
    // TemplateLiteral: () => '',
    // YieldExpression: () => '',
    AwaitExpression: generateAwaitExpression,
    // Import: () => '',
    OptionalMemberExpression: () => '',
    OptionalCallExpression: () => '',
    // TypeCastExpression: () => '',
    // BindExpression: () => '',
    // DoExpression: () => '',
    // RecordExpression: () => '',
    // TupleExpression: () => '',
    // ModuleExpression: () => '',
    // TopicReference: () => '',
    // PipelineTopicExpression: () => '',
    // PipelineBareFunction: () => '',
    // PipelinePrimaryTopicReference: () => '',
    // TSInstantiationExpression: () => '',
    // TSAsExpression: () => '',
    // TSSatisfiesExpression: () => '',
    // TSTypeAssertion: () => '',
    // TSNonNullExpression: () => '',

    // PrivateName: () => '',
    // ArgumentPlaceholder: () => '',
};