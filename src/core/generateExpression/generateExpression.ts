import { types } from "@babel/core";
import { generateJSXElement } from "..";

const {
    isJSXEmptyExpression,
    isArrowFunctionExpression,
    isExpressionStatement,
    isIdentifier,
    isStringLiteral,
    isBlockStatement,
    isCallExpression,
    isArgumentPlaceholder,
    isMemberExpression,
    isSpreadElement,
    isJSXNamespacedName,
    isObjectExpression,
    isExpression,
    isPrivateName,
    isAssignmentExpression,
    isBinaryExpression,
    isNumericLiteral,
    isArrayExpression,
    isLogicalExpression,
    isBooleanLiteral,
    isObjectProperty,
    isConditionalExpression,
    isIfStatement,
    isWhileStatement,
    isDoWhileStatement,
    isForOfStatement,
    isVariableDeclarator,
    isVariableDeclaration,
    isObjectPattern,
    isArrayPattern,
    isRestElement,
    isForStatement,
    isUpdateExpression,
    isJSXElement,
    isNullLiteral
} = types;


const generateExpression = (expression: types.Expression | types.JSXEmptyExpression | types.BlockStatement | types.Statement | types.Node): string => {
    if (isJSXEmptyExpression(expression)) {
        // Handle JSXEmptyExpression (e.g., <Component />)
        return '';
    }

    if (isJSXElement(expression)){
        return generateJSXElement(expression)
    }

    // console.log("===============================================");
    // console.log("generated : ", expression);
    // console.log("===============================================");

    if (isPrivateName(expression)) {
        // Traitez le PrivateName comme vous le souhaitez, par exemple, ignorez-le ou renvoyez une chaîne vide
        console.log("isPrivateName")
        return '';
    }

    if (isNullLiteral(expression)){
        return 'null';
    }


    if (isExpressionStatement(expression)) {
        // Gérer les expressions dans les déclarations
        return generateExpression(expression.expression);
    }

    

    if (isAssignmentExpression(expression)) {
        let left = '';
        if (isExpression(expression.left)) {
            left = generateExpression(expression.left);
        } else {
            if (isVariableDeclaration(expression.left)){
                left = generateVariableDeclaration(expression.left)
            }


            console.log("isAssignmentExpression")
            console.log(expression.left)
            // Traitez les cas où expression.left n'est pas une expression valide
        }
    
        const right = generateExpression(expression.right);
        return `${left} = ${right}`;
    }



    if (isArrowFunctionExpression(expression)) {
        const params = expression.params.map(param => {
            if (isIdentifier(param)) {
                return param.name;
            }
            return '';
        }).filter(Boolean).join(', ');

        const body = isBlockStatement(expression.body)
            ? generateBlockStatement(expression.body) 
            : expression.body
                ? generateExpression(expression.body)
                : '{ }'; // Ajoutez un BlockStatement vide

        return params ? `(${params}) => ${body}` : `() => ${body}`;
    }



    if (isArgumentPlaceholder(expression)) {
        console.log("isArgumentPlaceholder")
        return '';  // Ignore ArgumentPlaceholder
    }

    if (isBlockStatement(expression)) {
        const body = expression.body.map(stmt => generateStatement(stmt)).join('\n');
        return `{\n${body}\n}`;
    }

    if (isArrayExpression(expression)) {
        const elements = expression.elements
            .filter(element => element !== null) // Ignorer les éléments null
            .map(element => generateExpression(element as types.Expression))
            .join(', ');
        return `[${elements}]`;
    }

    if (isBooleanLiteral(expression)) {
        return expression.value ? 'true' : 'false';
    }

    if (isConditionalExpression(expression)) {
        const test = generateExpression(expression.test);
        const consequent = generateExpression(expression.consequent);
        const alternate = generateExpression(expression.alternate);
        return `${test} ? ${consequent} : ${alternate}`;
    }

    if (isVariableDeclaration(expression)) {
        return generateVariableDeclaration(expression)
    }

    if (isCallExpression(expression)) {
        if (isIdentifier(expression.callee) || isMemberExpression(expression.callee)) {
            const callee = generateExpression(expression.callee);
            const args = expression.arguments
                .filter(arg => !isJSXNamespacedName(arg)) // Exclure les JSXNamespacedName et SpreadElement
                .map(arg => {
                    if (isArgumentPlaceholder(arg)) {
                        console.log("isCallExpression ----> isArgumentPlaceholder")
                        return '';
                    } else if (isExpression(arg)) {
                        return generateExpression(arg);
                    } else if (isSpreadElement(arg)) {
                        return `...${generateExpression(arg.argument)}`;
                    } else {
                        console.log("isCallExpression ----> else")
                        return '';
                    }
                })
                .filter(Boolean) // Filtrer les éléments vides
                .join(', ');
            return `${callee}(${args})`;
        }
    }

    if (isMemberExpression(expression)) {
        if (isIdentifier(expression.object) && isIdentifier(expression.property) && expression.property.name === 'index') {
            return `${expression.object.name}[${expression.property.name}]`;
        }
        return generateMemberExpression(expression);
    }

    if (isIdentifier(expression)){
        // Gérer les identificateurs
        return `${expression.name}`;
    }

    if (isStringLiteral(expression)){
        // Gérer les littéraux de chaîne
        return `\"${expression.value}\"`;
    }

    if (isNumericLiteral(expression)) {
        return expression.value.toString();
    }

    if (isSpreadElement(expression)) {
        if (isIdentifier(expression.argument)) {
            return `...${expression.argument}`;
        }
        return '';
    }

    if (isBinaryExpression(expression)) {
        let left = '';
        if (isExpression(expression.left)) {
            left = generateExpression(expression.left);
        } else {
            console.log("isBinaryExpression")
            console.log(expression.left)
            // Traitez les cas où expression.left n'est pas une expression valide
        }
    
        const right = generateExpression(expression.right);
        return `${left} ${expression.operator} ${right}`;
    }

    if (isLogicalExpression(expression)) {
        let left = '';
        if (isExpression(expression.left)) {
            left = generateExpression(expression.left);
        } else {
            console.log("isLogicalExpression")
            console.log(expression.left)
            // Traitez les cas où expression.left n'est pas une expression valide
        }
    
        const right = generateExpression(expression.right);
        return `${left} ${expression.operator} ${right}`;
    }

    if (isUpdateExpression(expression)) {
        const argument = generateExpression(expression.argument);
        const operator = expression.operator;
        if (expression.prefix) {
            return `${operator}${argument}`;
        } else {
            return `${argument}${operator}`;
        }
    }

    if (isForOfStatement(expression)) {
        let left = '';
        if (isExpression(expression.left)) {
            left = generateExpression(expression.left);
        } else {
            if (isVariableDeclaration(expression.left)){
                left = generateVariableDeclaration(expression.left)
            }
        
            console.log("isForOfStatement")
            console.log(expression.left)
            // Traitez les cas où expression.left n'est pas une expression valide
        }
        const right = generateExpression(expression.right);
        const body = generateStatement(expression.body);
        return `for (${left} of ${right}) ${body}`;
    }

 

    if (isIfStatement(expression)) {
        const test = generateExpression(expression.test);
        const consequent = generateStatement(expression.consequent);
        const alternate = expression.alternate ? generateStatement(expression.alternate) : '';
        return `if (${test}) ${consequent}${alternate ? ` else ${alternate}` : ''}`;
    }

    if (isForStatement(expression)) {
        const init = expression.init ? generateExpression(expression.init) : '';
        const test = expression.test ? generateExpression(expression.test) : '';
        const update = expression.update ? generateExpression(expression.update) : '';
        const body = generateStatement(expression.body);
        return `for (${init}; ${test}; ${update}) ${body}`;
    }

    if (isWhileStatement(expression)) {
        const test = generateExpression(expression.test);
        const body = generateStatement(expression.body);
        return `while (${test}) ${body}`;
    }

    if (isDoWhileStatement(expression)) {
        const body = generateStatement(expression.body);
        const test = generateExpression(expression.test);
        return `do ${body} while (${test})`;
    }

    if (isObjectExpression(expression)) {
        const properties = expression.properties.map(prop => {
            if (isObjectProperty(prop)) {
                if (isIdentifier(prop.key) || isStringLiteral(prop.key)) {
                    const key = isIdentifier(prop.key) ? prop.key.name : prop.key.value;
    
                    let value = '';
                    if (isExpression(prop.value)) {
                        value = generateExpression(prop.value);
                    } else {
                        // Traitez les cas où prop.value n'est pas une expression valide
                    }
                    return `${key}: ${value}`;
                }
            }
            return '';
        }).filter(Boolean).join(', ');
        return `{ ${properties} }`;
    }

    console.log(expression)
    // Handle other JSX expressions
    return '';
}


const generateBlockStatement = (block: types.BlockStatement, wrapWithBraces: boolean = true): string => {
    const statements = block.body.map(stmt => generateStatement(stmt)).join('\n');
    return wrapWithBraces ? `{\n${statements}\n}` : statements;
}

const generateStatement = (statement: types.Statement): string => {
    return generateExpression(statement); // Utilisez simplement generateExpression pour les déclarations
}

const generateMemberExpression = (expression: types.MemberExpression): string => {
    const object = generateExpression(expression.object);
    
    if (isIdentifier(expression.property)) {
        return `${object}.${expression.property.name}`;
    } else if (isStringLiteral(expression.property)) {
        return `${object}["${expression.property.value}"]`;
    } else if (!isPrivateName(expression.property)) {
        return `${object}[${generateExpression(expression.property)}]`;
    }
    
    return object; // Ignore PrivateName
}

const generateVariableDeclaration = (expression: types.VariableDeclaration): string => {
    if (isVariableDeclaration(expression)) {
        const declarations = expression.declarations
            .map(declaration => {
                if (isVariableDeclarator(declaration)) {
                    const declarationType = expression.kind || 'const'; // Default to 'const' if no kind is provided
                    if (isObjectPattern(declaration.id)) {
                        const properties = generateObjectPatternProperties(declaration.id);
                        const initValue = declaration.init && isExpression(declaration.init) ? generateExpression(declaration.init) : '';
                        return `${declarationType} { ${properties} } = ${initValue}`;
                    } else if (isArrayPattern(declaration.id)) {
                        const elements = generateArrayPatternElements(declaration.id);
                        const initValue = declaration.init && isExpression(declaration.init) ? generateExpression(declaration.init) : '';
                        return `${declarationType} [${elements}] = ${initValue}`;
                    } else if (isIdentifier(declaration.id)) {
                        const initValue = declaration.init && isExpression(declaration.init) ? generateExpression(declaration.init) : '';
                        return `${declarationType} ${declaration.id.name} = ${initValue}`;
                    }
                }
                return '';
            })
            .filter(Boolean)
            .join('\n');
        return declarations;
    }
    return '';
}

const generateObjectPatternProperties = (pattern: types.ObjectPattern): string => {
    return pattern.properties
        .map(prop => {
            if (isSpreadElement(prop)) {
                // if (isIdentifier(prop.argument)) {
                //     return `...${prop.argument.name}`;
                // } else if (isArrayExpression(prop.argument )) {
                //     const elements = prop.argument.elements
                //         .map(element => {
                //             if (isIdentifier(element)) {
                //                 return element.name;
                //             }
                //             return '';
                //         })
                //         .filter(Boolean)
                //         .join(', ');
                //     return `...[${elements}]`;
                // }
                return '';
            } else if (isObjectProperty(prop)) {
                if (isIdentifier(prop.key) || isStringLiteral(prop.key)) {
                    const key = isIdentifier(prop.key) ? prop.key.name : prop.key.value;
                    const value = generateExpression(prop.value as types.Expression);
                    return `${key}: ${value}`;
                }
            } else if (isRestElement(prop)) {
                if (isIdentifier(prop.argument)) {
                    return `...${prop.argument.name}`;
                }
                return '';
            }
            return '';
        })
        .filter(Boolean)
        .join(', ');
}


const generateArrayPatternElements = (pattern: types.ArrayPattern): string => {
    return pattern.elements
        .map(element => {
            if (element && isIdentifier(element)) {
                return element.name;
            }
            return '';
        })
        .filter(Boolean)
        .join(', ');
}

export default generateExpression;