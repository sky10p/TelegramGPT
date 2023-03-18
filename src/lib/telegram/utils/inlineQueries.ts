export const buildInlineQueryResponse = (
  action: string,
  query: string,
  response: string
) => {
  return `${action}: ${query}
    
    ${response}`;
};
