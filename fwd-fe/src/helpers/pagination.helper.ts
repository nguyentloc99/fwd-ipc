export function getPaginationInfo(
  page: number,
  pageSize: number,
  totalItem: number,
  exactFromTo: boolean = false,
) {
  let from = 0;
  let to = 0;
  let total = 0;
  if (page > 0 && pageSize > 0) {
    if (exactFromTo) {
      from = (page - 1) * pageSize + 1;
      to = page * pageSize;
    } else {
      from =
        (page - 1) * pageSize + 1 > totalItem
          ? totalItem
          : (page - 1) * pageSize + 1;
      to = page * pageSize > totalItem ? totalItem : page * pageSize;
    }
  }
  total = totalItem;
  return { from, to, total };
}
