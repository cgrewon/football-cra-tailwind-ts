import IBaseProps from './IBaseProps'
import { ITeam } from './ITeam'

export interface ITeamBoxProps extends IBaseProps {
  team?: ITeam
  isDefault?: boolean
  isResultTicket?: boolean
  isCorrectBox?: boolean
  onClick?: () => void
}
