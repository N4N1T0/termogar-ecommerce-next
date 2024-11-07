import { DataIterationProps } from '@/types'

function DataIteration({
  datas = [],
  startLength,
  endLength,
  children
}: DataIterationProps) {
  return (
    <>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value, index) => children({ datas: value, index: index }))}
    </>
  )
}

export default DataIteration
