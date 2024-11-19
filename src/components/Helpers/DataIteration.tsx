import { DataIterationProps } from '@/types'

function DataIteration<T>({
  datas = [],
  startLength,
  endLength,
  children
}: DataIterationProps<T>) {
  return (
    <>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value, index) => children({ datas: value, index }))}
    </>
  )
}

export default DataIteration
