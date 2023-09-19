export default interface Trade {
    id: number
    isBestMatch: boolean
    isBuyerMaker: boolean
    price: string
    qty: string
    quoteQty: string
    time: number
    [key: string]: any
  }