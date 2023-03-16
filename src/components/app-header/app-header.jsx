import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {
  return (
    <header className={style.header}>
      <nav className={style.container}>
        <div className={style.leftBlock}>
          <div className={style.button}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={style.button}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </div>
        </div>
        <div className={style.logoBlock}>
          <Logo />
        </div>
        <div className={style.button}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
