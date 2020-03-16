export default function(babel) {
  const { types: t } = babel;

  // check if the ExpressionStatement is a jestDemo.mock
  const findMockConfig = path => {
    try {
      if (path.node.expression.callee.object.name === "jestDemo") {
        const mockConfig = {
          path: path.node.expression.arguments[0].value,
          name: "count",
          value: path.node.expression.arguments[1].value
        };
        return mockConfig;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // create a variableDeclaration to replace the actuall import
  const createConstMock = (name, value) =>
    t.variableDeclaration("const", [t.variableDeclarator(t.identifier(name), t.numericLiteral(value))]);

  // find the import variable name if current path matches with the path in mockConfig
  const findImportVariableName = (path, mockConfig) => {
    try {
      if (path.node.source.value === mockConfig.path) {
        return path.node.specifiers[0].local.name;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error, path);
      return false;
    }
  };

  const ImportVisitor = {
    ImportDeclaration(path) {
      const mockVariableName = findImportVariableName(path, this.mockConfig);
      if (mockVariableName) {
        let mockedValue = createConstMock(mockVariableName, this.mockConfig.value);
        path.replaceWith(mockedValue);
      }
    }
  };

  return {
    visitor: {
      ExpressionStatement(path) {
        const mockConfig = findMockConfig(path);
        if (mockConfig) {
          path.remove();
          path.parentPath.traverse(ImportVisitor, { mockConfig });
        }
      }
    }
  };
}
