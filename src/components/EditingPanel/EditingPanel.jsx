import styles from './EditingPanel.module.css'
import { But } from '../But/But'
import { BiBold } from 'react-icons/bi'
import { BiItalic } from 'react-icons/bi'
import { BiHighlight } from 'react-icons/bi'
import { ImUnderline } from 'react-icons/im'
export function EditingPanel({
  handleClickBold,
  handleClickItalic,
  handleClickUnderLine,
  handleClickHighlight,
}) {
  return (
    <div className={styles.container}>
      <But
        onClick={() => handleClickBold()}
        nameButton={<BiBold />}
        cssClass={'add-editing'}
      />
      <But
        onClick={() => handleClickItalic()}
        nameButton={<BiItalic />}
        cssClass={'add-editing'}
      />
      <But
        onClick={() => handleClickUnderLine()}
        nameButton={<ImUnderline />}
        cssClass={'add-editing'}
      />
      <But
        onClick={() => handleClickHighlight()}
        nameButton={<BiHighlight />}
        cssClass={'add-editing'}
      />
    </div>
  )
}
