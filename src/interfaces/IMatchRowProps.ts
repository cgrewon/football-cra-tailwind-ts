import IBaseProps from './IBaseProps'
import { IMatchRow } from './IMatchRow'

export interface IMatchRowProps extends IBaseProps {
  match?: IMatchRow
  rowIndex?: number
  isResultTicket?: boolean
  resultTeamIndex: number|null|undefined;

  onTeamClick?: (matchId: number, teamIndex: number, willSelect: boolean) => void
}
