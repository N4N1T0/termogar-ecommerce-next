export const renderPulseDivs = (
  count: number,
  width: string,
  height: string,
  key: string
) =>
  Array.from({ length: count })
    .fill(key)
    .map((_, index) => (
      <div
        key={`${width}-${height}-${key}-${index}`}
        className={`animate-pulse bg-gray-200 ${width} ${height}`}
      />
    ))
