import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
  const res: any[] = []
  for (let i = 0; i < data.length; i++) {
    const coord = coordinateData[data[i].name]
    if (coord) {
      res.push({
        value: coord.concat(data[i].value),
        name: data[i].name
      })
    }
  }
  return res
}
