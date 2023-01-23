export function cssVariables(node: any, variables: any) {
  setCssVariables(node, variables);

  return {
    update(variables: any) {
      setCssVariables(node, variables);
    },
  };
}
function setCssVariables(node, variables) {
  for (const name in variables) {
    node.style.setProperty(`--${name}`, variables[name]);
  }
}
