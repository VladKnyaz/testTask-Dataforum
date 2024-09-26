import { FC } from 'react';
import style from "./chat.module.scss"
import infoSvg from "./images/info.svg"
import classnames from 'classnames';

const Chat: FC = () => {
    return <div className={style.chat}>
      <div className={style.header}>
        <div className={style.title}>live chat</div>
        <img className={style.info} src={infoSvg} alt='info'/>
      </div>
      <div className={style.body}>
        <div className={style.comments}>
          <div className={style.comment}>
            <p className={style.title}>Иван Зурабьев</p>  
            <p className={style.text}>Спасибо Анне Анатольевне за очень интересный 
            доклад!</p>  
          </div>
          <div className={style.comment}>
            <p className={style.title}>Екатерина Овсянина</p>  
            <p className={style.text}>Подскажите когда секция про Остеопороз у мужчин?</p>  
          </div>
          <div className={classnames(style.comment,{[style.myComment]: true})}>
            <p className={style.title}>Екатерина Овсянина</p>  
            <p className={style.text}>Вопрос спикеру: <br/>
              Факторы риска переломов бедра у мужчин?</p>  
          </div>
        </div>
      </div>
      
      <div className={style.send__form}>
        <button className={style.info}>
        </button>
        <input type="text" placeholder='Введите сообщение' />
        <button className={style.smile}>
        </button>
        <button className={style.button}>
        </button>
      </div>
    </div>;
};

export default Chat;