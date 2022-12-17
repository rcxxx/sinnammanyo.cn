import React, {Children, ReactNode} from 'react';
import styles from "./styles.module.css"

interface Props{
    children: ReactNode;
    section: string;
}

function BookParagraph({children, section}:Props): JSX.Element{
return(
    <div className={styles.paragraph}>
        <div className={styles.paragraphTitle}>
            <h2>{section}</h2>
        </div>
        <div className={styles.paragrapBody}>{children}</div>
    </div>
);
}

export default BookParagraph;