import IBaseProps from './IBaseProps'
import { IMatchRow } from './IMatchRow'

export interface IMatchInputRowProps extends IBaseProps {
  onAdd: (match: IMatchRow) => void
  isEdit?: boolean
  match?: IMatchRow
}
