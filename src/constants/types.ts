import { ObjectId } from 'mongoose'

export interface MetaData {
  total: number
  page: number
  pageSize: number
  totalPages: number
  timestamp: string
}

export interface SuccessResponse {
  data: any[]
  meta?: MetaData
}

export interface ErrorResponse {
  error: {
    message: string
  }
}

export interface ITeam {
  owners?: string[]
  comas?: string[]
  teamLeaders?: string[]
  gameAdmins?: string[]
  gameMasters?: string[]
}

export interface IServerModel {
  userId: ObjectId
  status: boolean
  name: string
  level: ObjectId
  openingDate: Date
  autoHunt: boolean
  autoBoss?: boolean
  battlepass?: boolean
  dropClient: number
  legalSale?: boolean
  dolunayKdp?: boolean
  simya?: boolean
  kuleFarm?: boolean
  team?: ITeam[]
  efsunlar?: ObjectId[]
  bosses?: ObjectId[]
  discord?: string
  website?: string
  singleStoreyDungeon?: boolean
  ownSalesSystem?: boolean
}
