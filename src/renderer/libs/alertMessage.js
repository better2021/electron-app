/**
 * 弹出提示窗
 * @params {message} 提示信息
 * @params {time} 延时时间
 */

export default function Message(message, time) {
  const div = document.createElement('div');
  const span = `<span style="display: inline-block;padding: 6px 12px;border-radius: 5px;font-size: 14px;color: #ffffff;
  background: rgba(0,0,0,0.5);">${message}</span>`;
  const style = {
    display: 'flex',
    position: 'fixed',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: `${100}vw`,
    height: `${100}vh`,
    zIndex: 999,
  };

  Object.keys(style).forEach((k) => {
    div.style[k] = style[k];
  });

  div.innerHTML = span;
  document.body.appendChild(div);
  setTimeout(() => document.body.removeChild(div), time);
}
