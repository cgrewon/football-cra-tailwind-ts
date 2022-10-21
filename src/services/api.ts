import { ILeagueRes, ILeague, ICreateLeague, ICreateTicket, ITicket, DeleteResult } from '../interfaces'
import axios from 'axios'

const APIHOST = process.env.REACT_APP_API_HOST

const Api = {
  getLeagues: async (skip = 0, limit = 20): Promise<ILeagueRes> => {
    const res = await axios.get<ILeagueRes>(`${APIHOST}/league?skip=${skip}&limit=${limit}`)
    return res.data
  },
  getOneLeague: async (leagueId: number): Promise<ILeague> => {
    const res = await axios.get<ILeague>(`${APIHOST}/league/${leagueId}`)
    return res.data
  },

  addLeague: async (data: ICreateLeague): Promise<ILeague> => {
    const res = await axios.post<ILeague>(`${APIHOST}/league`, data)
    return res.data
  },

  updateLeague: async (id: number, data: ICreateLeague): Promise<ILeague> => {
    const res = await axios.patch<ILeague>(`${APIHOST}/league/${id}`, data)
    return res.data
  },

  addTicket: async (data: ICreateTicket): Promise<ITicket> => {
    const res = await axios.post<ITicket>(`${APIHOST}/ticket`, data)
    return res.data
  },
  updateTicket: async (id: number, data: ICreateTicket): Promise<ITicket> => {
    const res = await axios.patch<ITicket>(`${APIHOST}/ticket/${id}`, data)
    return res.data
  },

  deleteLeague: async (id: number): Promise<DeleteResult> => {
    const res = await axios.delete<DeleteResult>(`${APIHOST}/league/${id}`)

    return res.data
  },

  deleteTicket: async (id: number): Promise<DeleteResult> => {
    const res = await axios.delete<DeleteResult>(`${APIHOST}/ticket/${id}`)

    return res.data
  },
}

export default Api
