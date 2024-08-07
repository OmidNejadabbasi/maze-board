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

export function sleep(ms: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

export function randRange(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}
