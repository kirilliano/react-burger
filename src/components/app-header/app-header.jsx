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
          <div className={`${styleHeader.button} ${'p-4'}`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={`${styleHeader.button} ${'p-4'}`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </div>
        </div>
        <div className={styleHeader.logo}>
          <Logo />
        </div>
        <div className={`${styleHeader.button} ${'p-4'}`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </div>
      </section>
    </header>
  );
}

export default AppHeader;
