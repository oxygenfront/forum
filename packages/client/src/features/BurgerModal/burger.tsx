// import React, {FC, useState} from "react";
// import styles from "@/widgets/Header/header.module.sass";
// import {Link} from "react-router-dom";
// import classnames from "classnames";
// import {PATH} from "@/shared/constants";
//
// export const Burger: FC = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const toggleMenu = () => {
//         setIsMenuOpen((prev) => !prev);
//     };
//     const closeMenu = () => {
//         setIsMenuOpen(false);
//     };
//     return (
//         {isMenuOpen && (
//             <div className={styles.modalOverlay} onClick={closeMenu}>
//                 <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                     <button className={styles.closeButton} onClick={closeMenu}>
//                         ×
//                     </button>
//                     <nav className={styles.modalNav}>
//                         <Link to="/" className={styles.navLink} onClick={closeMenu}>
//                             Форум
//                         </Link>
//                         <Link to="#news" className={styles.navLink} onClick={closeMenu}>
//                             Новости
//                         </Link>
//                         <Link to="#vip" className={classnames(styles.navLink, styles.vip)} onClick={closeMenu}>
//                             VIP
//                         </Link>
//                         <Link to={PATH.WARRANTOR} className={styles.navLink} onClick={closeMenu}>
//                             Гарант
//                         </Link>
//                     </nav>
//                 </div>
//             </div>
//         )}
//     );
// };
