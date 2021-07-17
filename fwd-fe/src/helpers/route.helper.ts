export function extractPathName(pathName: string) {
  const result = pathName.split('/');
  if (result.length && result[0] === '') {
    result.splice(0, 1);
  }
  return result;
}
