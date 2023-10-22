// Babel
import { types } from "@babel/core";
import { GeneratorMap } from "../generate.types";

// Generation function
import { generate } from "@/core";
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
import { generateTaggedTemplateExpression } from "./generateTaggedTemplateExpression";
import { generateOptionalMemberExpression } from "./generateOptionalMemberExpression";
import { generateOptionalCallExpression } from "./generateOptionalCallExpression";

export const expressionGenerator: GeneratorMap<types.Expression> = {
    ArrayExpression: generateArrayExpression,
    AssignmentExpression: generateAssignmentExpression,
    BinaryExpression: generateBinaryExpression,
    LogicalExpression: generateBinaryExpression,
    CallExpression: generateCallExpression,
    ConditionalExpression: generateConditionalExpression,
    FunctionExpression: generateFunctionExpression,
    MemberExpression: generateMemberExpression,
    NewExpression: generateNewExpression,
    ObjectExpression: generateObjectExpression,
    // SequenceExpression: () => '',
    ParenthesizedExpression: ({ expression }) => `(${generate(expression)})`,
    ThisExpression: () => 'this',
    UnaryExpression: generateUnaryExpression,
    UpdateExpression: generateUpdateExpression,
    ArrowFunctionExpression: generateArrowFunction,
    // ClassExpression: () => '',
    // MetaProperty: () => '',
    // Super: () => '',
    TaggedTemplateExpression: generateTaggedTemplateExpression,
    // YieldExpression: () => '',
    AwaitExpression: generateAwaitExpression,
    // Import: () => '',
    OptionalMemberExpression: generateOptionalMemberExpression,
    OptionalCallExpression: generateOptionalCallExpression,
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

    // ArgumentPlaceholder: () => '',
};