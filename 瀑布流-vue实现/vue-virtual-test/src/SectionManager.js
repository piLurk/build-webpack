
const SECTION_SIZE = 600
export default class SectionManager {
  constructor(sectionSize = SECTION_SIZE) {
    this._sectionSize = sectionSize

    // 存储所有cell信息
    this._cellMetadata = []
    // 储存二维section map
    this._sections = {}
  }
  registerCell({ cellMetadatum, index }) {
    this._cellMetadata[index] = cellMetadatum

    this.getSections(cellMetadatum).forEach( section => section.addCellIndex({ index }))
  }
  getSections({height, width, x, y}) {
    const sectionXStart = Math.floor(x / this._sectionSize)
    const sectionXStop = Math.floor((x + width - 1) / this._sectionSize)
    const sectionYStart = Math.floor(y / this._sectionSize)
    const sectionYStop = Math.floor(( y + height - 1) / this._sectionSize)
    
    const sections = []

    for (let sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
      for(let sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
        const key = `${sectionX}.${sectionY}`
        
        if(!this._sections[key]) {
          this._sections[key] = new Section({
            height: this._sectionSize,
            width: this._sectionSize,
            x: sectionX * this._sectionSize,
            y: sectionY * this._sectionSize
          })
        }
        sections.push(this._sections[key])
      }
    }
    return sections
  }
}