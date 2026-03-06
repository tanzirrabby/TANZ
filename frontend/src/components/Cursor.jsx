import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  let rx = 0, ry = 0;

  useEffect(() => {
    const move = e => {
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
    };
    const hover = () => document.body.classList.add('cursor-hover');
    const unhover = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role=button], input, textarea, select, [tabindex]:not([tabindex="-1"])').forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const anim = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(anim);
    };
    anim();

    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}