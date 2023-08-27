export const getGroupClassName = index => {
  const isFirstOrFourthOrSeventh =
    index % 8 === 1 || index % 8 === 4 || index % 8 === 7
  return index % 2 === 0
    ? isFirstOrFourthOrSeventh
      ? 'projectcompletion__confir-mem-group with-margin'
      : 'projectcompletion__confir-mem-group no-margin'
    : isFirstOrFourthOrSeventh
    ? 'projectcompletion__confir-mem-group2 with-margin'
    : 'projectcompletion__confir-mem-group2 no-margin'
}

export const getRowBreak = index => index % 4 === 3
