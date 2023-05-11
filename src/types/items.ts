export interface ItemForSeller {
  id: number
  title: string
  price: number
  createdAt: Date
  purchases: number
}

export interface ItemPurchaseForSeller {
  purchaseId: number
  buyer: string
  date: Date
}

export interface NewItemProps {
  price: number
  title: string
  redirectTo: string
}

export interface ItemForBuyer {
  price: number
  seller: string
  title: string
  purchases: number
  redirectTo: string
}
