import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleHeader from '../app-header/app-header.module.css';

function AppHeader() {
  return (
    <header className={styleHeader.header}>
      <section className={styleHeader.container}>
        <div className={styleHeader.beforeLogo}>
          <a href="#" className={`${styleHeader.button} ${'p-4'} ${styleHeader.link}`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </a>
          <a href="#" className={`${styleHeader.button} ${'p-4'} ${styleHeader.link}`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>
        </div>
        <a href="#" className={styleHeader.logo}>
          <Logo />
        </a>
        <div className={`${styleHeader.button} ${'p-4'}`}>
          <ProfileIcon type="secondary" />
          <a
            href="#"
            className={`${'text text_type_main-default text_color_inactive'} ${styleHeader.link}`}
          >
            Личный кабинет
          </a>
        </div>
      </section>
    </header>
  );
}

export default AppHeader;
